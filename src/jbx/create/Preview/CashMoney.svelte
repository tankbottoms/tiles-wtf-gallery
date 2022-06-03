<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import PopInfo from '$jbx/components/PopInfo.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';

	import { DistributionLimitType } from '$jbx/constants';
	import Money from '$jbx/components/Money.svelte';
	import { getDistributionLimitType } from '$jbx/utils/v2/distributions';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: currentDistributionLimitType = getDistributionLimitType($project.distributionLimit);
	$: currency = $project.distributionLimitCurrency;
</script>

<!-- TODO: rename this component, quite undescriptive given other sibling is "Funding" -->
<InfoSpaceBetween>
	<div slot="left">
		<PopInfo message="The balance of this project in the Juicebox contract."
			><p>In juicebox</p></PopInfo
		>
	</div>
	<p slot="right" class="money"><Money {currency} /></p>
</InfoSpaceBetween>
<InfoSpaceBetween>
	<div slot="left">
		<PopInfo
			message="The amount that has been distributed from the Juicebox balance in this funding cycle, out of the current distribution limit. No more than the distribution limit can be distributed in a single funding cycle—any remaining ETH in Juicebox is overflow, until the next cycle begins."
		>
			<p>Distributed</p></PopInfo
		>
	</div>
	<div slot="right">
		{#if currentDistributionLimitType === DistributionLimitType.None}
			<PopInfo
				placement="left"
				message="The target for this funding cycle is 0, meaning all funds in Juicebox are currently considered overflow. Overflow can be redeemed by token holders, but not distributed."
				><p>100% Overflow</p></PopInfo
			>
		{:else if currentDistributionLimitType === DistributionLimitType.Infinite}
			<Money {currency} />/ NO LIMIT
		{:else}
			<Money {currency} />/ <Money {currency} amount={$project.distributionLimit} />
		{/if}
	</div>
</InfoSpaceBetween>
{#if currentDistributionLimitType === DistributionLimitType.Specific}
	<progress max="100" value="" />
{/if}
<InfoSpaceBetween>
	<div slot="left">
		<PopInfo message="The balance of the project owner's wallet.">
			<p>In wallet</p>
		</PopInfo>
	</div>
</InfoSpaceBetween>

<style>
	p {
		font-size: 0.8rem;
		text-transform: uppercase;
		font-weight: 500;
		margin: 5px 0px;
		display: inline-block;
	}
	div[slot='left'],
	div[slot='right'],
	p {
		color: var(--text-tertiary);
	}
	.money {
		color: var(--text-brand-primary);
	}

	progress {
		width: 100%;
		height: 8px;
		background: var(--background-l0);
		margin: 10px 0px;
	}

	progress::-webkit-progress-bar {
		background-color: var(--background-l1);
		border-radius: 7px;
	}
	progress::-webkit-progress-value {
		background-color: var(--text-brand-primary);
		border-radius: 7px;
	}
</style>
