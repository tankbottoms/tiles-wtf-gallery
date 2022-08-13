<script lang="ts">
	import { BigNumber } from '@ethersproject/bignumber';
	// TODO move
	import CollapsibleSection from '$juicebox/components/CollapsibleSection.svelte';
	import Icon from './Icon.svelte';
	import Money from './Money.svelte';
	import PopInfo from './PopInfo.svelte';
	import Popover from './Popover.svelte';
	import Trans from './Trans.svelte';

	import { detailedTimeUntil } from '$juicebox/utils/formatTime';
	import { MAX_DISTRIBUTION_LIMIT } from '$juicebox/utils/v2/math';
	import { getBallotStrategyByAddress } from '$juicebox/constants/v2/ballotStrategies/getBallotStrategiesByAddress';
	import { getFundingCycleDetails, V2FundingCycleRiskCount } from '$juicebox/utils/v2/fundingCycle';
	import type { V2FundingCycle, V2FundingCycleMetadata } from '$juicebox/models/v2/fundingCycle';

	const isFundingCycleRecurring = true;

	export let isPopup = false;
	export let tokenSymbol: string;
	export let expanded: boolean = false;
	export let fundingCycle: V2FundingCycle;
	export let fundingCycleMetadata: V2FundingCycleMetadata;
	export let distributionLimit: BigNumber;
	export let currentDistributionLimitCurrencyType: BigNumber;

	function getDistributionValue(distributionLimit: BigNumber) {
		distributionLimit = distributionLimit || BigNumber.from(0);
		if (!distributionLimit.gt(0)) {
			return 'Zero';
		} else if (distributionLimit.eq(MAX_DISTRIBUTION_LIMIT)) {
			return 'Infinite';
		}
		return null;
	}

	$: currency = BigNumber.from(currentDistributionLimitCurrencyType || 0)?.toNumber();
	$: currentBallotStrategy = getBallotStrategyByAddress(fundingCycle.ballot);
	$: cycleKeyValues = getFundingCycleDetails(fundingCycle, fundingCycleMetadata, tokenSymbol);
	$: distributionLimitValue = getDistributionValue(distributionLimit || BigNumber.from(0));
	$: fundingCycleRiskCount = V2FundingCycleRiskCount(fundingCycle, fundingCycleMetadata);

	let rightHeaderText: string | null = null;
	$: {
		if (fundingCycle.duration.gt(0)) {
			const endTimeSeconds = fundingCycle.start.add(fundingCycle.duration);
			const formattedTimeLeft = detailedTimeUntil(endTimeSeconds);

			rightHeaderText = isPopup
				? ''
				: isFundingCycleRecurring
				? `${formattedTimeLeft} until #${fundingCycle.number.add(1).toString()}`
				: `{formattedTimeLeft} left`;
		}
	}
</script>

<CollapsibleSection alignCaret="center" {expanded}>
	<div slot="header">
		<h4 class="collapse-header">
			Cycle #{fundingCycle.number.toString()}
			<span class="risks">
				{#if fundingCycleRiskCount > 0}
					<Popover
						message="Some funding cycle properties may indicate risk for
    project contributors."
					>
						<Icon name="exclamationCircle" style="transform: translateY(3px);color: var(--text-warn)" />
					</Popover>
				{/if}
			</span>
		</h4>
		{#if rightHeaderText}
			{rightHeaderText}
		{/if}
		{#if isPopup}
			&nbsp;&nbsp;
		{/if}
	</div>
	<div class="current-cycle">
		<div class="row">
			<div class="gap">
				<b><Trans>Distribution limit</Trans>:</b>
				{#if distributionLimitValue}
					<span>{distributionLimitValue}</span>
				{:else}
					<Money
						amount={distributionLimit || BigNumber.from(0)}
						currency={BigNumber.from(currency || 0)}
					/>
				{/if}
			</div>
			{#each cycleKeyValues as { label, value, info, issue, issueText }}
				{#if info}
					<div class="title gap">
						<PopInfo message={info}><p><b>{label}</b></p></PopInfo>:<span class:risk={issue}
							>{value}</span
						>
						{#if issue}
							<span class="risk">
								<Popover message={issueText}>
									<Icon name="exclamationCircle" />
								</Popover>
							</span>
						{/if}
					</div>
				{:else}
					<p class="gap">
						<b>{label}:</b>
						<span class:risk={issue}>{value}</span>
						{#if issue}
							<span class="risk">
								<Popover message={issueText}>
									<Icon name="exclamationCircle" />
								</Popover>
							</span>
						{/if}
					</p>
				{/if}
			{/each}
		</div>

		<small class="recon-info">Address: {currentBallotStrategy.address}</small>
		<small class="recon-info">{currentBallotStrategy.description}</small>
	</div>
</CollapsibleSection>

<style>
	div[slot='header'] {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.collapse-header {
		margin: 0 10px;
		color: var(--text-header);
	}

	.risks {
		display: inline-flex;
		color: var(--text-primary);
		align-items: center;
		gap: 0.25rem;
	}

	.current-cycle {
		margin: 20px 0;
	}

	.current-cycle .gap {
		margin: 5px 0px;
		font-weight: 500;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
	}

	.current-cycle span {
		font-weight: 300;
	}

	.title {
		display: flex;
		align-items: baseline;
	}

	span.risk {
		font-weight: 500;
		color: var(--text-warn);
	}

	.recon-info {
		font-weight: 300;
	}

	.row {
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	span {
		margin-left: 10px;
		color: var(--text-primary);
	}

	p {
		margin: 0;
		font-weight: 400;
		color: var(--text-secondary);
	}
	@media (max-width: 500px) {
		div[slot='header'] {
			color: var(--text-secondary);
			flex-direction: column;
			margin-left: 10px;
		}

		.collapse-header {
			margin: 0;
		}
	}
</style>
