<script lang="ts">
	import { formatHistoricalDate } from '$juicebox/utils/formatDate';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import type { V2FundingCycle } from '$juicebox/models/v2/fundingCycle';
	import { MAX_DISTRIBUTION_LIMIT } from '$juicebox/utils/v2/math';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import Usd from '../USD.svelte';
	import Ethereum from '../Ethereum.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { getContext, onMount } from 'svelte';
	import { V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	onMount(async () => {
		$projectContext.distributionLimit;
		$projectContext.usedDistributionLimit;
	});

	export let fundingCycle: V2FundingCycle;
	export let numFundingCycles: number;
	export let index: number;

	$: distributionLimit = $projectContext.distributionLimit;
	$: usedDistributionLimit = $projectContext.usedDistributionLimit;
	$: distributionLimitIsInfinite = distributionLimit?.eq(MAX_DISTRIBUTION_LIMIT);
	$: distributionLimitIsZero = !distributionLimit || distributionLimit?.eq(0);
	$: isLastFundingCycle = index < numFundingCycles - 1;
	$: distributionLimitCurrency = $projectContext.distributionLimitCurrency;
</script>

<div class="wrapper">
	<InfoSpaceBetween on:click>
		<div slot="left">
			<div class="number">
				#{index + 1}
			</div>
			<div class="withdrawn">
				{#if !(distributionLimitIsInfinite || distributionLimitIsZero)}
					{#if distributionLimitCurrency.eq(V2_CURRENCY_USD)}
						<Usd />
					{:else}
						<Ethereum />
					{/if}
					{formatWad(usedDistributionLimit, { precision: 2 })}/{formatWad(distributionLimit, {
						precision: 2
					})} withdrawn
				{:else}
					{' '}{formatWad(usedDistributionLimit, { precision: 2 })} withdrawn
				{/if}
			</div>
		</div>
		<div slot="right">
			{formatHistoricalDate(fundingCycle.start.add(fundingCycle.duration).mul(1000).toNumber())} ago
		</div>
	</InfoSpaceBetween>
</div>

<style>
	div[slot='left'] {
		display: flex;
		align-items: center;
	}

	.number {
		font-size: 1rem;
		margin-right: 10px;
		color: var(--text-header);
	}

	.withdrawn {
		font-size: 0.8rem;
		font-weight: 300;
		color: var(--text-primary);
	}

	.wrapper {
		border-bottom: 1px solid var(--stroke-tertiary);
		cursor: pointer;
		padding: 20px;
	}
</style>
