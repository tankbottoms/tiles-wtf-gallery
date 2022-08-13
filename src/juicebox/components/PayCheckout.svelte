<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { BigNumber } from 'ethers';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import { weightedAmount } from '$juicebox/utils/v2/math';
	import {
		getUnsafeV2FundingCycleProperties,
		V2FundingCycleRiskCount
	} from '$juicebox/utils/v2/fundingCycle';
	import { FUNDING_CYCLE_WARNING_TEXT } from '$juicebox/constants/fundingWarningText';
	import Input from './Input.svelte';
	import InfoBox from './InfoBox.svelte';
	import Toggle from './Toggle.svelte';
	import Trans from './Trans.svelte';
	import UploadField from './UploadField.svelte';
	import Button from './Button.svelte';
	import Checkbox from './Checkbox.svelte';
	import { bind, openModal } from './Modal.svelte';
	import PendingTransaction from './PendingTransaction.svelte';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { connectedAccount, web3Connect } from '$stores/web3';
	import { randomBytes } from 'ethers/lib/utils.js';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import Textarea from './Textarea.svelte';
	import Expandable from './Expandable.svelte';

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
			if (!$connectedAccount) return await web3Connect();

			console.log({ $connectedAccount });
			const txnResponse = await writeContract(
				V2ContractName?.JBETHPaymentTerminal,
				'pay',
				[
					$projectContext.projectId,
					weiAmount,
					$projectContext.tokenAddress || ETH_TOKEN_ADDRESS,
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
		// TODO: there's something weird here with the reserved rate
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
	});

	$: projectName = $projectContext.projectMetadata.name;
</script>

<main>
	<h3><Trans>Pay {projectName}</Trans></h3>
	{#if riskCount}
		<InfoBox>
			Paying {projectName} is not an investment — it's a way to support the project. {projectName} determines
			any value or utility of the tokens you receive. By continuing you acknowledge that you have read
			and understood the
			<a href="https://info.juicebox.money/tos" target="_blank">Juicebox's Terms of Service.</a>
		</InfoBox>
	{/if}
	<br />
	{#if metadata.payDisclosure}
		<h4>Notice:</h4>
		<p>{metadata.payDisclosure}</p>
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
	<Expandable title="Customize payment">
		<div class="">
			<Textarea
				id="memo"
				label="Memo"
				rows="1"
				maxlength={256}
				placeholder="(Optional) Add a memo to this payment on-chain"
				bind:value={memo}
			/>
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
			<Toggle bind:checked /> (<small><Trans>Mint tokens to a custom address.</Trans></small>)
		</div>
		{#if checked}
			<Input
				bind:value={customBeneficiary}
				placeholder={'juicebox.eth / 0x0000000000000000000000000000000000000000'}
				type="address"
			/>
		{/if}
	</Expandable>

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
</main>
<div class="right buttons">
	<Button on:click={close} type="secondary" size="md">Close</Button>
	<Button on:click={payProject} type="primary" size="md">Pay</Button>
</div>

<style>
	h3,
	h4 {
		color: var(--text-header);
	}
	main {
		padding: 1rem;
		max-width: 750px;
		font-size: 0.8rem;
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

	.buttons {
		margin-bottom: 10px;
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

	@media (max-width: 768px) {
		.buttons {
			margin-bottom: 4rem;
		}
	}
</style>
