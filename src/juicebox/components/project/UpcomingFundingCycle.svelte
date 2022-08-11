<script lang="ts" context="module">
	import { V2FundingCycleRiskCount } from '$juicebox/utils/v2/fundingCycle';

	async function getQueuedFundingCycle(projectId: BigNumber) {
		const { fundingCycle, metadata: fundingCycleMetadata } = await readContract(
			V2ContractName.JBController,
			'queuedFundingCycleOf',
			projectId ? [projectId] : null
		);

		return {
			fundingCycle,
			fundingCycleMetadata
		};
	}

	export async function getUpcomingFundingCycleRiskCount(projectId: BigNumber) {
		const { fundingCycle } = await getQueuedFundingCycle(projectId);
		return V2FundingCycleRiskCount(fundingCycle);
	}
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getContext, onMount } from 'svelte';
	import Icon from '../Icon.svelte';
	import HeavyBorderBox from '../HeavyBorderBox.svelte';
	import FundingCycleDetails from '../FundingCycleDetails.svelte';
	import PayoutSplits from '../PayoutSplits.svelte';
	import ReservedTokenSplits from '../ReservedTokenSplits.svelte';
	import type { BigNumber } from 'ethers';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { readContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import type { V2FundingCycle, V2FundingCycleMetadata } from '$juicebox/models/v2/fundingCycle';
	import {
		ETH_PAYOUT_SPLIT_GROUP,
		RESERVED_TOKEN_SPLIT_GROUP
	} from '$juicebox/constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	let queuedFundingCycle: V2FundingCycle;
	let queuedFundingCycleMetadata: V2FundingCycleMetadata;
	let queuedPayoutSplits;
	let queuedReservedTokensSplits;
	let queuedDistributionLimit: BigNumber;
	let queuedDistributionLimitCurrency: BigNumber;

	async function getUpcomingFundingCycle() {
		const { fundingCycle, fundingCycleMetadata } = await getQueuedFundingCycle(
			$projectContext.projectId
		);
		queuedFundingCycle = fundingCycle;
		queuedFundingCycleMetadata = fundingCycleMetadata;

		queuedPayoutSplits = await readContract(V2ContractName.JBSplitsStore, 'splitsOf', [
			$projectContext.projectId,
			queuedFundingCycle?.configuration?.toString(),
			ETH_PAYOUT_SPLIT_GROUP
		]);

		queuedReservedTokensSplits = await readContract(V2ContractName.JBSplitsStore, 'splitsOf', [
			$projectContext.projectId,
			queuedFundingCycle?.configuration?.toString(),
			RESERVED_TOKEN_SPLIT_GROUP
		]);
		[queuedDistributionLimit, queuedDistributionLimitCurrency] = await readContract(
			V2ContractName.JBController,
			'distributionLimitOf',
			[
				$projectContext.projectId,
				queuedFundingCycle?.configuration.toString(),
				$projectContext.primaryTerminal,
				ETH_TOKEN_ADDRESS
			]
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
				projectOwnerAddress={$projectContext.projectOwnerAddress}
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
