<script lang="ts">
	import CurrencyInput from '../CurrencyInput.svelte';
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import Input from '../Input.svelte';
	import Trans from '../Trans.svelte';
	import { bind, openModal } from '../Modal.svelte';
	import CreatePayableAddress from './CreatePayableAddress.svelte';
	import { fromWad, parseWad } from '$juicebox/utils/formatNumber';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { connectedAccount } from '$stores/web3';
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import PendingTransaction from '../PendingTransaction.svelte';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { BigNumber } from 'ethers';
	import DrawerTabs from '../DrawerTabs.svelte';
	import HeavyBorderBox from '../HeavyBorderBox.svelte';
	import { uploadProjectMetadata } from '$juicebox/utils/ipfs';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$juicebox/constants/v2/metadataDomain';
	import EnsOrAddress from '$juicebox/components/EnsOrAddress.svelte';

	export let balance = 0;
	export let token = '';
	export let close = () => {};
	close;

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let transferTokenAmount = 0;
	let transferTokenTo: Address;

	let currentTab = 0;
	let tabs =
		$project.projectOwnerAddress.toLowerCase() === $connectedAccount.toLowerCase()
			? ['General']
			: ['General'];

	// NOTE this will be a big number due to CurrencyInput
	let addToBalanceAmount = BigNumber.from(0);

	async function transfer() {
		const { projectId } = $project;
		const amount = parseWad(transferTokenAmount);
		const txnResponse = await writeContract(V2ContractName.JBTokenStore, 'transferFrom', [
			$connectedAccount,
			projectId,
			transferTokenTo,
			amount.toHexString()
		]);
		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'transferFrom'
			})
		);
		const txnResult = await txnResponse.wait();
		console.log(txnResult);
	}

	async function addToBalance() {
		const DEFAULT_MEMO = '';
		const { projectId } = $project;
		console.log(addToBalanceAmount);

		const DEFAULT_METADATA = [0x1];

		const txnResponse = await writeContract(
			V2ContractName?.JBETHPaymentTerminal,
			'addToBalanceOf',
			[
				projectId,
				addToBalanceAmount.toHexString(),
				ETH_TOKEN_ADDRESS,
				DEFAULT_MEMO,
				DEFAULT_METADATA
			],
			{
				value: addToBalanceAmount.toHexString()
			}
		);

		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'addToBalanceOf'
			})
		);
		const txnResult = await txnResponse.wait();
		console.log(txnResult);
	}

	function setMax() {
		transferTokenAmount = Number(fromWad(balance));
	}

	function transferOwnership() {
		// TODO:
	}
	function postGitHubIssueForArchive({ archived, projectId, metadata, handle }) {
		console.log('TODO: create issue on github repo');
		// axios.post(
		// 	'https://api.github.com/repos/jbx-protocol/juice-interface/issues',
		// 	{
		// 		title: `[${archived ? 'ARCHIVE' : 'UNARCHIVE'}] Project: "${metadata?.name}"`,
		// 		body: `<b>Chain:</b> ${$readNetwork.alias} \n <b>Project ID:</b> ${projectId}${
		// 			handle ? `\n <b>Handle:</b> ${handle}` : ''
		// 		}`
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${process.env.VITE_GITHUB_ACCESS_TOKEN}`
		// 		}
		// 	}
		// );
	}
	let archiving = false;
	async function archiveProject() {
		let archived = true;

		if (
			!$connectedAccount ||
			$connectedAccount.toLowerCase() !== $project.projectOwnerAddress?.toLowerCase()
		) {
			return alert(`Connected wallet not authorized`);
		}
		archiving = true;

		const uploadedMetadata = await uploadProjectMetadata({
			...$project.projectMetadata,
			archived
		});
		if (!uploadedMetadata.IpfsHash) {
			return alert(`Failed to update project metadata`);
		}
		console.log({ uploadedMetadata });
		// Create github issue when archive is requested
		// https://docs.github.com/en/rest/reference/issues#create-an-issue
		// Do this first, in case the user closes the page before the on-chain tx completes
		postGitHubIssueForArchive({
			archived,
			projectId: $project.projectId,
			metadata: $project.projectMetadata,
			handle: $project.handle
		});

		const txnResponse = await writeContract(V2ContractName.JBProjects, 'setMetadataOf', [
			$project.projectId,
			[uploadedMetadata.IpfsHash, JUICEBOX_MONEY_METADATA_DOMAIN]
		]);
		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'setMetadataOf'
			})
		);
		await txnResponse.wait();
		archiving = false;
		location.reload();
	}
	function addRole() {
		// TODO:
	}
	function createLandingPage() {
		// TODO:
	}

	$: alreadyDeployedProjectPayer = $project.events?.find(
		(event) => event?.deployETHERC20ProjectPayerEvent?.caller === $connectedAccount
	);
</script>

<section>
	<h3><Trans>Tools</Trans></h3>
	<DrawerTabs {tabs} bind:currentTab />

	{#if currentTab === 0}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Create payable address</Trans></h4>
				<p>
					<Trans>Create an Ethereum address that can be used to pay your project directly.</Trans>
				</p>

				<div class="button">
					<Button
						type="primary"
						size="md"
						on:click={() => openModal(CreatePayableAddress)}
						disabled={Boolean(alreadyDeployedProjectPayer) || !$connectedAccount}
					>
						Deploy project payer contract
					</Button>
				</div>
				{#if alreadyDeployedProjectPayer?.deployETHERC20ProjectPayerEvent?.address}
					<span>
						Project Payer: <EnsOrAddress
							address={alreadyDeployedProjectPayer?.deployETHERC20ProjectPayerEvent?.address}
						/>
					</span>
				{/if}
			</div>
		</HeavyBorderBox>

		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Transfer unclaimed {token}</Trans></h4>
				<p><Trans>Your unclaimed token balance: {balance}</Trans></p>

				<label for="amount">Amount</label>
				<div class="input">
					<Input type="number" bind:value={transferTokenAmount} max={Number(fromWad(balance))}>
						<div slot="addon" role="button" on:click={setMax}>MAX</div>
					</Input>
				</div>

				<label for="to">Recipient address</label>
				<div class="input">
					<Input
						id="to"
						bind:value={transferTokenTo}
						type="address"
						placeholder="juicebox.eth / 0x0000000000000000000000000000000000000000"
					/>
				</div>

				<div class="button">
					<Button type="primary" size="md" on:click={transfer}>Transfer {token}</Button>
				</div>
			</div>
		</HeavyBorderBox>

		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Add to balance</Trans></h4>
				<p><Trans>Add funds tho this project's balance without minting tokens.</Trans></p>

				<label for="payAmount">Pay amount</label>
				<div class="input">
					<CurrencyInput
						on:setValue={(value) => {
							addToBalanceAmount = value.detail.value;
						}}
						disabled
					/>
				</div>
				<div class="button">
					<Button type="primary" size="md" on:click={addToBalance}>Add to balance</Button>
				</div>
			</div>
		</HeavyBorderBox>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 40px 26px;
		max-width: 650px;
	}

	p {
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 0;
	}

	h3 {
		font-size: 28px;
		color: var(--text-header);
	}

	h4 {
		font-size: 16px;
		font-weight: 400;
		color: var(--text-header);
		margin-bottom: 0;
	}

	.box {
		display: flex;
		flex-direction: column;
		gap: 16px;

		.input {
			background-color: var(--background-l0);
			width: 100%;
		}

		.button {
			display: flex;
			justify-content: flex-end;
		}

		div[slot='addon'] {
			padding: 0px 5px;
			cursor: pointer;
			color: var(--text-action-primary);
			text-align: center;
			background: var(--background-action-secondary);
			border-radius: var(--radius-sm);
		}
	}
</style>
