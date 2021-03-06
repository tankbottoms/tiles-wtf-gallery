<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext, onMount } from 'svelte';
	import { project } from '$jbx/data/mockDataV2';
	import Icon from '$jbx/components/Icon.svelte';
	import HeavyBorderBox from '$jbx/components/HeavyBorderBox.svelte';
	import FundingCycleDetails from '$jbx/components/FundingCycleDetails.svelte';
	import PayoutSplits from '$jbx/components/PayoutSplits.svelte';
	import ReservedTokenSplits from '$jbx/components/ReservedTokenSplits.svelte';
	import type { BigNumber } from 'ethers';
	import type Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { readContract } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import type { V2FundingCycle, V2FundingCycleMetadata } from '$jbx/models/v2/fundingCycle';
	import { ETH_PAYOUT_SPLIT_GROUP, RESERVED_TOKEN_SPLIT_GROUP } from '$jbx/constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$jbx/constants/v2/juiceboxTokens';
	import type { Currency, DistributionLimitType } from '$jbx/constants';

	export let tokenSymbol = '';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	let queuedFundingCycle: V2FundingCycle;
	let queuedFundingCycleMetadata: V2FundingCycleMetadata;
	let queuedPayoutSplits;
	let queuedReservedTokensSplits;
	let queuedDistributionLimit: BigNumber;
	let queuedDistributionLimitCurrency: Currency;

	async function getUpcomingFundingCycle() {
		[queuedFundingCycle, queuedFundingCycleMetadata] = await readContract(
			V2ContractName.JBController,
			'queuedFundingCycleOf',
			$projectContext.projectId ? [$projectContext.projectId] : null
		);

		queuedPayoutSplits = await readContract(
			V2ContractName.JBSplitsStore,
			'splitsOf',
			$projectContext.projectId && queuedFundingCycle?.configuration?.toString()
				? [
						$projectContext.projectId,
						queuedFundingCycle?.configuration?.toString(),
						ETH_PAYOUT_SPLIT_GROUP
				  ]
				: null
		);

		queuedReservedTokensSplits = await readContract(
			V2ContractName.JBSplitsStore,
			'splitsOf',
			$projectContext.projectId && queuedFundingCycle?.configuration?.toString()
				? [
						$projectContext.projectId,
						queuedFundingCycle?.configuration?.toString(),
						RESERVED_TOKEN_SPLIT_GROUP
				  ]
				: null
		);
		[queuedDistributionLimit, queuedDistributionLimitCurrency] = await readContract(
			V2ContractName.JBController,
			'distributionLimitOf',
			$projectContext.projectId &&
				queuedFundingCycle?.configuration.toString() &&
				$projectContext.primaryTerminal
				? [
						$projectContext.projectId,
						queuedFundingCycle?.configuration.toString(),
						$projectContext.primaryTerminal,
						ETH_TOKEN_ADDRESS
				  ]
				: null
		);
	}
	let loading = true;

	onMount(async () => {
		await getUpcomingFundingCycle();
		loading = false;
	});
</script>

{#if loading}
	<HeavyBorderBox>
		<p>
			<Icon name="loading" spin />
		</p>
	</HeavyBorderBox>
{:else}
	<div in:fade>
		<HeavyBorderBox>
			<FundingCycleDetails
				tokenSymbol={$projectContext.tokenSymbol || 'tokens'}
				fundingCycle={queuedFundingCycle}
				fundingCycleMetadata={queuedFundingCycleMetadata}
				distributionLimit={queuedDistributionLimit}
				currentDistributionLimitCurrencyType={queuedDistributionLimitCurrency}
			/>
		</HeavyBorderBox>
		<HeavyBorderBox>
			<PayoutSplits
				currency={queuedDistributionLimitCurrency}
				distributionLimit={queuedDistributionLimit}
				payoutSplits={queuedPayoutSplits}
				hideHeader={true}
			/>
		</HeavyBorderBox>
		<HeavyBorderBox>
			<ReservedTokenSplits
				reservedTokens={$projectContext.reservedTokenBalance}
				tokenAddress={$projectContext.tokenAddress}
				projectOwnerAddress={$projectContext.projectOwnerAddress}
				tokenSymbol={$projectContext.tokenSymbol}
				fundingCycleMetadata={queuedFundingCycleMetadata}
				reservedTokensSplits={queuedReservedTokensSplits}
				hideHeader={true}
			/>
		</HeavyBorderBox>
	</div>
{/if}

<style>
	p {
		color: var(--text-header);
		font-size: 2rem;
		text-align: center;
	}
</style>
