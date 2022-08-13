<script lang="ts">
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import Input from '../Input.svelte';
	import { bind, openModal } from '../Modal.svelte';
	import PendingTransaction from '../PendingTransaction.svelte';
	import Popover from '../Popover.svelte';
	import Toggle from '../Toggle.svelte';
	import Trans from '../Trans.svelte';
	import CollapsibleSection from '../CollapsibleSection.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { connectedAccount, readNetwork } from '$stores/web3';
	import type Store from '$utils/Store';
	import { contracts, writeContract } from '$juicebox/utils/web3/contractReader';
	import { constants } from 'ethers';
	import { isAddress } from 'ethers/lib/utils.js';
	import { getContext } from 'svelte';

	export let close: () => void;
	export const onSuccess: () => void = () => {};

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let isDeploying = false;
	let tokenMintingEnabled = false;
	let customTokenChecked = false;

	let customMemo = '';
	let customTokenBeneficiary = '';

	const DEFAULT_MEMO = '';
	const DEFAULT_METADATA = [0x1];

	// TODO: check for payable address prior and display it with button to edit

	async function deploy() {
		isDeploying = true;

		const { projectId } = $project;
		const args = [
			projectId,
			customTokenChecked && tokenMintingEnabled && customTokenBeneficiary
				? isAddress(customTokenBeneficiary)
					? customTokenBeneficiary
					: constants.AddressZero
				: constants.AddressZero, // defaultBeneficiary is none because we want tokens to go to msg.sender
			false, // preferClaimed, // _defaultPreferClaimedTokens,
			customMemo || DEFAULT_MEMO, // _defaultMemo,
			DEFAULT_METADATA, //_defaultMetadata,
			!tokenMintingEnabled, // !tokenMintingEnabled, // defaultPreferAddToBalance,
			contracts[$readNetwork.alias].JBDirectory.address, // _directory,
			$connectedAccount //, _owner
		];

		console.log('Deploying payer with args:', args);

		try {
			const txnResponse = await writeContract(
				V2ContractName?.JBETHERC20ProjectPayerDeployer,
				'deployProjectPayer',
				args
			);

			openModal(
				bind(PendingTransaction, {
					txnResponse
				})
			);

			await txnResponse.wait();
		} catch (error) {
			isDeploying = false;
		}
	}
</script>

<div class="content">
	<h2>Create payable address</h2>
	<p><Trans>Create an Ethereum address that can be used to pay your project directly.</Trans></p>
	<p>
		<Trans
			>Tokens minted from payments to this address will belong to the payer by default. However, if
			someone pays the project through a custodial service platform such as Coinbase,</Trans
		><b><Trans>tokens can't be issued to their personal wallets and will be lost.</Trans></b>
	</p>

	<CollapsibleSection expanded={false}>
		<h4 slot="header">Advanced options (optional)</h4>

		<div class="collapse">
			<label for="memo">
				Custom memo
				<Popover
					placement="right"
					message="The onchain memo for each transaction made through the address. It will appear in the project's payment feed when someone pays this address."
				>
					<Icon name="questionCircle" />
				</Popover>
			</label>
			<Input id="memo" placeholder="Payment made through payable address" bind:value={customMemo} />

			<div class="toggleOption">
				<label for="customMemo">
					Token minting enabled
					<Popover
						placement="right"
						message="Determines whether tokens will be minted from payments to this address."
					>
						<Icon name="questionCircle" />
					</Popover>
				</label>
				<Toggle id="customMemo" bind:checked={tokenMintingEnabled} />
			</div>
			{#if tokenMintingEnabled}
				<div class="toggleOption">
					<label for="customMemo">
						Custom token beneficiary
						<Popover
							placement="right"
							message="By default, newly minted tokens will go to the wallet who sends funds to the address. You can enable this to set the token beneficiary to a custom address."
						>
							<Icon name="questionCircle" />
						</Popover>
					</label>
					<Toggle id="customToken" bind:checked={customTokenChecked} />
				</div>
			{/if}
			{#if customTokenChecked && tokenMintingEnabled}
				<Input
					bind:value={customTokenBeneficiary}
					placeholder="juicebox.eth / 0x0000000000000000000000000000000000000000"
					type="address"
				/>
			{/if}
		</div>
	</CollapsibleSection>
</div>

<div class="buttons">
	<Button type="secondary" size="md" on:click={close}>Close</Button>
	<Button type="primary" size="md" disabled={isDeploying} on:click={deploy}
		>Deploy project payer contract
		{#if isDeploying}
			<Icon name="loading" spin />
		{/if}
	</Button>
</div>

<style>
	p {
		font-weight: 300;
	}

	h2,
	h4 {
		color: var(--text-header);
	}

	h4 {
		margin: 0;
		margin-left: 10px;
	}

	label {
		align-items: baseline;
		display: flex;
		font-weight: 300;
		gap: 5px;
		margin-bottom: 5px;
	}

	.content {
		max-width: 480px;
	}

	.collapse {
		margin: 10px 32px;
	}

	.buttons {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}

	.toggleOption {
		display: flex;
		gap: 20px;
		margin-top: 20px;
	}
</style>
