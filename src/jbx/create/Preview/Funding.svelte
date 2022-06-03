<script lang="ts">
	import { getContext } from 'svelte';
	import HeavyBorderBox from '$jbx/components/HeavyBorderBox.svelte';
	import PayoutSplits from '$jbx/components/PayoutSplits.svelte';
	import PopInfo from '$jbx/components/PopInfo.svelte';
	import FundingCycleDetails from '$jbx/components/FundingCycleDetails.svelte';
	import ReservedTokenSplits from '$jbx/components/ReservedTokenSplits.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import type Store from '$jbx/utils/Store';
	import { BigNumber } from 'ethers';
	import { connectedAccount } from '$stores/web3';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: untapped = ($project.distributionLimit ?? BigNumber.from(0)).sub(
		$project.usedDistributionLimit || BigNumber.from(0)
	);

	$: reservedTokens = $project.balanceInDistributionLimitCurrency?.gt(untapped)
		? untapped
		: $project.balanceInDistributionLimitCurrency || BigNumber.from(0);
</script>

<div class="title yellow">
	<PopInfo
		message="Tokens are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet."
	>
		<h4>Tokens</h4>
	</PopInfo>
</div>
<p>Total supply: <span>0 tokens</span></p>

<div class="title yellow">
	<PopInfo
		message="A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle."
		><h4>Funding cycle</h4></PopInfo
	>
</div>
<p class="sub-header">CURRENT</p>
<HeavyBorderBox>
	<FundingCycleDetails
		tokenSymbol={$project.tokenSymbol || 'token'}
		expanded={true}
		fundingCycle={$project.fundingCycle}
		fundingCycleMetadata={$project.fundingCycleMetadata}
		distributionLimit={$project.distributionLimit}
		currentDistributionLimitCurrencyType={$project.distributionLimitCurrency}
	/>
</HeavyBorderBox>
<HeavyBorderBox>
	<PayoutSplits
		isPreview
		currency={$project.distributionLimitCurrency}
		payoutSplits={$project.payoutSplits}
		distributionLimit={$project.distributionLimit}
	/>
</HeavyBorderBox>
<HeavyBorderBox>
	<ReservedTokenSplits
		isPreview
		{reservedTokens}
		projectOwnerAddress={$project.projectOwnerAddress ||
			$connectedAccount ||
			'0x0000000000000000000000000000000000000000'}
		fundingCycleMetadata={$project.fundingCycleMetadata}
		reservedTokensSplits={$project.reservedTokensSplits}
	/>
</HeavyBorderBox>

<style>
	h4 {
		margin-right: 5px;
		margin-bottom: 5px;
		color: var(--text-header);
	}

	p {
		margin: 0;
		color: var(--text-secondary);
	}

	span {
		margin-left: 10px;
		color: var(--text-primary);
	}
	.title {
		display: flex;
		align-items: baseline;
	}

	.title h4 {
		color: var(--text-header);
		font-weight: 600;
		margin: 0;
	}

	.title:last-of-type {
		margin-top: 20px;
	}
	.yellow {
		color: var(--text-header);
	}
	.sub-header {
		text-transform: capitalize;
		font-weight: 600;
		font-size: 12px;
		color: var(--text-secondary);
		margin: 10px 0;
	}
</style>
