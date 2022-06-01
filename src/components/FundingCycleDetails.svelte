<script lang="ts">
	import { BigNumber } from 'ethers';
	// TODO move
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import Icon from '$components/Icon.svelte';
	import Money from '$components/Money.svelte';
	import PopInfo from '$components/PopInfo.svelte';
	import Popover from '$components/Popover.svelte';
	import Trans from '$components/Trans.svelte';

	import { detailedTimeUntil } from '$utils/formatTime';
	import { MAX_DISTRIBUTION_LIMIT } from '$utils/v2/math';
	import { getBallotStrategyByAddress } from '$constants/v2/ballotStrategies/getBallotStrategiesByAddress';
	import { getFundingCycleDetails, V2FundingCycleRiskCount } from '$utils/v2/fundingCycle';
	import type { V2FundingCycle, V2FundingCycleMetadata } from '$models/v2/fundingCycle';
	import type { Currency } from '$constants';

	const isFundingCycleRecurring = true;

	export let isPopup = false;
	export let tokenSymbol: string;
	export let expanded: boolean = true;
	export let fundingCycle: V2FundingCycle;
	export let fundingCycleMetadata: V2FundingCycleMetadata;
	export let distributionLimit: BigNumber;
	export let currentDistributionLimitCurrencyType: Currency;

	function getDistributionValue(distributionLimit: BigNumber) {
		distributionLimit = distributionLimit || BigNumber.from(0);
		if (!distributionLimit.gt(0)) {
			return 'Zero';
		} else if (distributionLimit.eq(MAX_DISTRIBUTION_LIMIT)) {
			return 'Infinite';
		}
		return null;
	}

	$: currency = BigNumber.from(currentDistributionLimitCurrencyType)?.toNumber();
	$: currentBallotStrategy = getBallotStrategyByAddress(fundingCycle.ballot);
	$: cycleKeyValues = getFundingCycleDetails(fundingCycle, fundingCycleMetadata, tokenSymbol);
	$: distributionLimitValue = getDistributionValue(distributionLimit || BigNumber.from(0));
	$: fundingCycleRiskCount = V2FundingCycleRiskCount(fundingCycle, fundingCycleMetadata);

	let rightHeaderText: string | null = null;
	$: {
		if (fundingCycle.duration.gt(0)) {
			const endTimeSeconds = fundingCycle.start.add(fundingCycle.duration);
			const formattedTimeLeft = detailedTimeUntil(endTimeSeconds);

			rightHeaderText = isFundingCycleRecurring
				? `${formattedTimeLeft} until #${fundingCycle.number.add(1).toString()}`
				: `{formattedTimeLeft} left`;
		}
	}
</script>

<CollapsibleSection alignCaret="center" {expanded}>
	<div slot="header">
		<h4 class="collapse-header">
			{#if fundingCycle.duration.gt(0)}
				Cycle #{fundingCycle.number.toString()}
			{:else}
				Details
			{/if}
			{#if fundingCycleRiskCount > 0}
				<Popover
					message="Some funding cycle properties may indicate risk for
    project contributors."><Icon name="exclamationCircle" /></Popover
				>{fundingCycleRiskCount}
			{/if}
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
					<Money amount={BigNumber.from(distributionLimit)} {currency} />
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
</style>
