<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { BigNumber } from 'ethers';
	import type { V2ProjectContextType } from '$models/project-type';
	import type Store from '$utils/Store';
	import { formatWad } from '$utils/formatNumber';
	import { weightedAmount } from '$utils/v2/math';
	import {
		getUnsafeV2FundingCycleProperties,
		V2FundingCycleRiskCount
	} from '$utils/v2/fundingCycle';
	import { FUNDING_CYCLE_WARNING_TEXT } from '$constants/fundingWarningText';
	import Input from '$components/Input.svelte';
	import InfoBox from '$components/InfoBox.svelte';
	import Toggle from '$components/Toggle.svelte';
	import Trans from '$components/Trans.svelte';
	import UploadField from '$components/UploadField.svelte';
	import Button from '$components/Button.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import { bind, openModal } from '$components/Modal.svelte';
	import PendingTransaction from '$components/PendingTransaction.svelte';
	import { contracts, writeContract } from '$utils/web3/contractReader';
	import { readNetwork } from '$constants/networks';
	import { ETH_TOKEN_ADDRESS } from '$constants/v2/juiceboxTokens';
	import { connectedAccount, walletConnect } from '$stores/web3';
	import { randomBytes } from 'ethers/lib/utils';
	import { V2ContractName } from '$models/v2/contracts';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let close: () => {};
	export let weiAmount: BigNumber;

	const project = $projectContext;
	const metadata = $projectContext.projectMetadata;
	const fundingCycle = $projectContext.fundingCycle;
	const fundingCycleMetadata = $projectContext.fundingCycleMetadata;

	$: amountString = formatWad(weiAmount);
	// TODO we need to prepend memo with something to align with the snapshot
	// re decentralisation
	let memo: string;
	let checked = false;
	let erc20 = false;
	let receivedTickets: string;
	let ownerTickets: string;
	let customBeneficiary: string;
	let riskCount: number;
	let warnings = [];

	function autosize() {
		const textarea = document.querySelector('textarea');
		setTimeout(function () {
			textarea.style.cssText = 'height:auto; padding:0';
			textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
		}, 0);
	}

	async function payProject() {
		try {
			if (!$connectedAccount) return await walletConnect();

			console.log({ $connectedAccount });
			const txnResponse = await writeContract(
				V2ContractName?.JBETHPaymentTerminal,
				'pay',
				[
					$projectContext.projectId,
					weiAmount,
					ETH_TOKEN_ADDRESS,
					$connectedAccount,
					0,
					erc20,
					memo || '',
					randomBytes(1) //delegateMetadata
				],
				{
					value: weiAmount
				}
			);
			openModal(
				bind(PendingTransaction, {
					txnResponse
				})
			);
		} catch (error) {
			console.error(error);
		}
	}

	onMount(() => {
		// TODO there's something weird here with the reserved rate
		// PLS HELP, I CANNOT FIGURE OUT WHAT IS GOING ON
		receivedTickets = weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata.reservedRate.toNumber(),
			weiAmount,
			'payer'
		);
		ownerTickets = weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata.reservedRate.toNumber(),
			weiAmount,
			'reserved'
		);
		// Get the risk properties for the InfoBox
		const risk = getUnsafeV2FundingCycleProperties(fundingCycle);
		riskCount = V2FundingCycleRiskCount(fundingCycle);
		warnings = Object.keys(risk)
			.filter((k) => risk[k])
			.map((k) => FUNDING_CYCLE_WARNING_TEXT()[k]);
		// Autosize the textarea for memo
		const textarea = document.querySelector('textarea');
		textarea.addEventListener('keydown', autosize);
	});
</script>

<main>
	<h3><Trans>Pay {project.tokenSymbol || ''}</Trans></h3>
	<p>
		<Trans
			>Paying <b>{project.tokenSymbol || ''}</b> is not an investment — it's a way to support the
			project. Any value or utility of the tokens you receive is determined by {metadata.name}.</Trans
		>
	</p>

	{#if metadata.payDisclosure}
		<h4>Notice from {project.tokenSymbol}:</h4>
		<p>{metadata.payDisclosure}</p>
	{/if}
	{#if riskCount}
		<InfoBox>
			<b><Trans>Potential risks</Trans></b>
			<p class="secondary">
				<Trans
					>Some properties of the project's current funding cycle may indicate risk for
					contributors.</Trans
				>
			</p>
			<ul>
				{#each warnings as warning}
					<li>{warning}</li>
				{/each}
			</ul>
		</InfoBox>
	{/if}
	<table>
		<tbody
			><tr
				><th colspan="1"><span>Pay amount</span></th><td colspan="1"><span>{amountString}</span></td
				></tr
			><tr
				><th colspan="1"><span>Tokens for you</span></th><td colspan="1"
					><span
						><div>{formatWad(receivedTickets, { precision: 0 })}</div>
						<div /></span
					></td
				></tr
			><tr
				><th colspan="1"><span>{project.tokenSymbol || 'Tokens'} reserved</span></th><td colspan="1"
					><span>{formatWad(ownerTickets, { precision: 0 })}</span></td
				></tr
			></tbody
		>
	</table>
	<div class="item">
		<label for="memo">Memo</label>
		<textarea
			bind:value={memo}
			rows="1"
			disabled={memo?.length >= 256}
			placeholder="(Optioal) Add a memo to this payment on-chain"
		/>
		<p class="right">{(memo || '').length} / 256</p>
	</div>
	<UploadField
		onChange={(url) => {
			if (url) {
				memo = `${url}   ${memo || ''}`;
				autosize();
			}
		}}
	/>
	<div class="row">
		<label for="tokenBeneficiary">Custom token beneficiary</label>
		<Toggle bind:checked />
	</div>
	<small><Trans>Mint tokens to a custom address.</Trans></small>
	{#if checked}
		<Input
			bind:value={customBeneficiary}
			placeholder={'juicebox.eth / 0x0000000000000000000000000000000000000000'}
		/>
	{/if}

	<div class="item">
		<p><b>Receive ERC-20</b></p>
		<div class="row">
			<div class="checkbox-wrapper">
				<Checkbox bind:checked={erc20} />
			</div>
			<p>
				<Trans>
					Check this to mint this project's ERC-20 tokens to your wallet. Leave unchecked to have
					your token balance tracked by Juicebox, saving gas on this transaction. You can always
					claim your ERC-20 tokens later.
				</Trans>
			</p>
		</div>
	</div>

	<div class="right">
		<Button on:click={close} type="secondary" size="md">Close</Button>
		<Button on:click={payProject} type="primary" size="md">Pay</Button>
	</div>
</main>

<style>
	h3,
	h4 {
		color: var(--text-header);
	}
	main {
		padding: 1rem;
		max-width: 750px;
	}
	table {
		width: 100%;
		margin: 20px 0px;
	}
	tbody,
	tr {
		border: 1px solid var(--stroke-primary);
	}
	th {
		font-weight: 600;
		text-align: left;
		color: var(--text-secondary);
		border-right: 1px solid var(--stroke-primary);
	}
	td {
		font-weight: 300;
		text-align: right;
	}

	th,
	td {
		padding: 12px 18px;
	}

	p {
		font-weight: 300;
		margin: 0;
	}

	label {
		margin: 10px 0px;
		margin-right: 10px;
	}

	small {
		font-weight: 300;
		font-size: 0.8rem;
	}
	textarea {
		border: 1px solid var(--stroke-primary);
		width: 100%;
		height: auto;
		background: transparent;
		min-height: 28px;
	}
	ul {
		margin-top: 20px;
	}
	.row {
		align-items: center;
		margin-top: 1rem;
		display: flex;
	}
	.row p {
		margin-right: 10px;
	}
	.item {
		margin: 20px 0px;
	}
	.right {
		float: right;
	}

	.secondary {
		color: var(--text-secondary);
	}
</style>
