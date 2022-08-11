<script lang="ts">
	import type { BigNumber } from 'ethers';
	import { fracDiv } from '$juicebox/utils/formatNumber';
	import Range from './Range.svelte';

	export let targetAmount: BigNumber;
	export let balanceInTargetCurrency: BigNumber | undefined;
	export let overflowAmountInTargetCurrency: BigNumber | undefined;

	const percentPaid =
		balanceInTargetCurrency && targetAmount
			? fracDiv(balanceInTargetCurrency.toString(), targetAmount.toString()) * 100
			: 0;

	const percentOverflow = fracDiv(
		(overflowAmountInTargetCurrency?.sub(targetAmount ?? 0) ?? 0).toString(),
		(targetAmount ?? 0).toString()
	);

	const hasTargetAmount = targetAmount.gt(0);
	const hasOverflow = overflowAmountInTargetCurrency?.gt(0) ?? false;
</script>

<div id="fundingProgressBar">
	{#if !hasTargetAmount || !hasOverflow}
		<div class="progressWithoutOverflow">
			<Range showValueBox={false} disabled values={[Math.max(percentPaid, 1)]} />
		</div>
	{:else}
		<div class="progressWithOverflow">
			<div style={`width: ${(1 - percentOverflow) * 100}%`}>
				<Range showValueBox={false} disabled values={[100]} />
			</div>
			<div id="TargetIndicatorLine" />
			<div style={`width: ${percentOverflow * 100}%`}>
				<Range showValueBox={false} disabled values={[100]} />
			</div>
		</div>
	{/if}
</div>

<style>
	#TargetIndicatorLine {
		margin-left: 5px;
		margin-right: 5px;
		margin-top: 3px;
		background: var(--text-primary);
		border-radius: 2px;
		min-width: 4px;
		height: 15px;
	}

	:global(#fundingProgressBar .rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub) {
		display: none;
	}

	:global(#fundingProgressBar .rangeSlider) {
		margin: 0;

		--range-slider: var(--background-disabled);
		--range-inactive: var(--background-brand-primary);
	}

	:global(#fundingProgressBar .rangeSlider.disabled) {
		opacity: 1;
	}

	.progressWithOverflow {
		display: flex;
		align-items: center;
		height: 16px;
		width: 100%;
	}

	.progressWithOverflow,
	.progressWithoutOverflow {
		padding-bottom: 1em;
		padding-top: 0.5em;
	}
</style>
