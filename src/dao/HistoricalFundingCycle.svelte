<script lang="ts">
	import { BigNumber } from '@ethersproject/bignumber';
	import Icon from '$components/Icon.svelte';
	import { formatHistoricalDate } from '$utils/formatDate';
	import { formatWad } from '$utils/formatNumber';
	import FundingCycleDetails from '$components/FundingCycleDetails.svelte';
	import type { V2FundingCycle } from '$models/v2/fundingCycle';
	import { V2CurrencyName } from '$utils/v2/currency';
	import { formatDiscountRate, MAX_DISTRIBUTION_LIMIT } from '$utils/v2/math';
	import type { V2CurrencyOption } from '$models/v2/currencyOption';
	import Modal from '$components/Modal.svelte';
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import { project } from '$data/mockDataV2';
	import Money from '$components/Money.svelte';
	import { Currency } from '$constants';
	import Usd from '$components/USD.svelte';
	import Ethereum from '$components/Ethereum.svelte';
	// TODO move project context from create
	// import { V2ProjectContext } from 'contexts/v2/projectContext'

	// TODO contract reader
	// import useProjectDistributionLimit from 'hooks/v2/contractReader/ProjectDistributionLimit'
	// import useUsedDistributionLimit from 'hooks/v2/contractReader/UsedDistributionLimit'
	// import { V2UserContext } from 'contexts/v2/userContext'

	export let fundingCycle: V2FundingCycle;
	export let numFundingCycles: number;
	export let index: number;
	// export let onClick: () => void;

	// const { projectId, primaryTerminal } = useContext(V2ProjectContext);

	// const { data: distributionLimitData } = useProjectDistributionLimit({
	// 	projectId,
	// 	configuration: fundingCycle?.configuration?.toString(),
	// 	terminal: primaryTerminal
	// });

	// const { data: usedDistributionLimit } = useUsedDistributionLimit({
	// 	projectId,
	// 	terminal: primaryTerminal,
	// 	fundingCycleNumber: fundingCycle?.number
	// });

	// const [distributionLimit, distributionLimitCurrency] = distributionLimitData ?? [];

	// const distributionLimitIsInfinite = distributionLimit?.eq(MAX_DISTRIBUTION_LIMIT);
	// const distributionLimitIsZero = !distributionLimit || distributionLimit?.eq(0);

	// const isLastFundingCycle = index < numFundingCycles - 1;

	// MOCK DATA
	const usedDistributionLimit = BigNumber.from(0);
	const distributionLimit = BigNumber.from('0x1b1ae4d6e2ef500000');
	const distributionLimitCurrency = Currency.USD;
	const distributionLimitIsInfinite = false;
	const distributionLimitIsZero = false;
	fundingCycle = project.fundingCycle;
</script>

<div class="wrapper">
	<InfoSpaceBetween on:click>
		<div slot="left">
			<div class="number">
				#{index}
			</div>
			<div class="withdrawn">
				{#if !(distributionLimitIsInfinite || distributionLimitIsZero)}
					{#if distributionLimitCurrency === Currency.USD}
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
			{formatHistoricalDate(fundingCycle.start.add(fundingCycle.duration).mul(1000).toNumber())}
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

	.wrapper:hover {
		transform: scale(1.05);
	}
</style>
