<script lang="ts">
	import type { BigNumberish } from 'ethers';
	import { formattedNum } from '$juicebox/utils/formatNumber';
	import Button from './Button.svelte';
	import Toggle from './Toggle.svelte';
	import Range from './Range.svelte';
	import InfoSpaceBetween from './InfoSpaceBetween.svelte';
	import DisplaySplit from './Split.svelte';
	import { bind } from './Modal.svelte';
	import type { Split } from '$juicebox/models/v2/splits';
	import { getTotalSplitsPercentage } from '$juicebox/utils/v2/distributions';
	import PopInfo from './PopInfo.svelte';
	import AddTokenReceiverModal from './AddTokenReceiverModal.svelte';

	export let reservedRate: number = 0;
	export let checked: boolean = reservedRate > 0;
	export let issuanceRate: number = 0;
	export let openModal: (arg1: any) => void;
	export let splits: Split[] = [];
	let totalSplitsPercentage = getTotalSplitsPercentage(splits);

	let rangeValue: number[] = [reservedRate];
	// let splits = reservedTokensSplits.get();

	// TODO: these split functions are copied from FundingDrawer.svelte, think of nice abstraction
	function addSplit(split: Split) {
		splits = [...splits, split];
	}

	function editSplit(split: Split) {
		splits = splits.map((m, i) => {
			// TODO maybe make a derived hash of the split
			if (split.beneficiary === m.beneficiary || split.projectId === m.projectId) {
				return { ...m, ...split };
			} else {
				return m;
			}
		});
	}

	function removeSplit(split: Split) {
		splits = splits.filter(
			(s) => s.beneficiary !== split.beneficiary || s.projectId !== split.projectId
		);
	}

	// Reserved tokens received by project per ETH
	let initialReservedTokensPerEth: BigNumberish;
	// Tokens received by contributor's per ETH
	let initialIssuanceRate: BigNumberish;
	$: {
		totalSplitsPercentage = getTotalSplitsPercentage(splits || []);
		reservedRate = rangeValue[0];
		initialReservedTokensPerEth = issuanceRate * ((reservedRate ?? 0) / 100);
		initialIssuanceRate = issuanceRate - initialReservedTokensPerEth;
	}
</script>

<header>
	<Toggle id="reserved" bind:checked>
		<h3 class="toggle-title">
			Reserved tokens
			{#if !reservedRate}
				<span>(0%)</span>
			{/if}
		</h3>
	</Toggle>
</header>
{#if checked}
	<Range bind:values={rangeValue} />
{/if}
<br />
<p>Reserve a percentage of freshly minted tokens for your project to use.</p>
<div class="info">
	<div class="info-item">
		<span
			>Contributor rate<PopInfo
				message="Tokens <b>contributors will receive</b> when they contribute 1 ETH."
				placement="top"
			/>:</span
		>
		<span>{formattedNum(initialIssuanceRate)} tokens / 1 ETH</span>
	</div>
	<div class="info-item">
		<span
			>Reserved rate<PopInfo
				message="Tokens <b>reserved for the project</b> when 1 ETH is contributed."
				placement="top"
			/>:</span
		>
		<span>{formattedNum(initialReservedTokensPerEth)} tokens / 1 ETH</span>
	</div>
</div>
{#if reservedRate > 0}
	<h4>Reserved token allocation (optional)</h4>
	{#each splits as split, editingIndex}
		<DisplaySplit
			{split}
			onRemove={removeSplit}
			onClick={(split) => {
				openModal(
					bind(AddTokenReceiverModal, {
						reservedRate,
						editingIndex,
						onFinish: editSplit,
						split,
						splits
					})
				);
			}}
		/>
	{/each}
	<InfoSpaceBetween>
		<p slot="left" class:issue={totalSplitsPercentage > 100}>Total: {totalSplitsPercentage}%</p>
		<p slot="right">{100 - totalSplitsPercentage}% to project owner</p>
	</InfoSpaceBetween>
	{#if totalSplitsPercentage > 100}
		<p class="issue">The total of your splits is more than 100%.</p>
	{/if}
	<Button
		type="tertiary"
		size="md"
		on:click={() =>
			openModal(bind(AddTokenReceiverModal, { reservedRate, onFinish: addSplit, splits }))}
	>
		Add token receiver</Button
	>
	<p>
		Allocate a portion of your project's reserved tokens to other Ethereum wallets or Juicebox
		projects.
	</p>
{/if}

<style lang="scss" scoped>
	.info {
		background-color: var(--background-l1);
		padding: 20px 20px;
		font-weight: 300;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin-bottom: 10px;
		.info-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			span {
				display: flex;
				align-items: center;
			}
		}
	}
	p {
		color: var(--text-secondary);
	}

	.issue {
		color: var(--text-failure);
	}
</style>
