<script lang="ts">
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import ETHAmount from '../ETHAmount.svelte';
	import { formatHistoricalDate, timestampToUTC } from '$juicebox/utils/formatDate';
	import EtherscanLink from '../EtherscanLink.svelte';
	import Trans from '../Trans.svelte';
	import type { DistributePayoutsEvent } from '$juicebox/models/subgraph-entities/v2/distribute-payouts-event';
	import { querySubgraph } from '$juicebox/utils/graph';
	import { onMount } from 'svelte';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import Popover from '../Popover.svelte';

	export let event: Partial<DistributePayoutsEvent>;

	let events = [];

	// TODO: come back here after feedback from Peel.
	async function loadData() {
		events = await querySubgraph({
			entity: 'distributeToPayoutSplitEvent',
			keys: ['id', 'timestamp', 'txHash', 'amount', 'beneficiary', 'splitProjectId'],
			orderDirection: 'desc',
			orderBy: 'amount',
			where: event?.id
				? {
						key: 'distributePayoutsEvent',
						value: event.id
				  }
				: undefined
		});
	}

	onMount(() => {
		loadData();
	});
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small><Trans>Distribute funds</Trans></small></p>
		<div class="beneficiaries">
			{#each events as e}
				{#if e.splitProjectId}
					<p>Project {e.splitProjectId}</p>
				{:else}
					<p>
						<EnsOrAddress address={e.beneficiary} />
					</p>
				{/if}
			{/each}
			{#if event.distributedAmount}
				<EnsOrAddress address={event.beneficiary} />
			{/if}
		</div>
	</div>
	<div slot="right">
		<p class="timestamp">
			{#if event.timestamp}
				<Popover>
					<span slot="content" class="utc">{timestampToUTC(event.timestamp * 1000)}</span>
					{formatHistoricalDate(event.timestamp * 1000)}
				</Popover>
			{/if}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		<p class="timestamp">called by <EnsOrAddress address={event.caller} /></p>
		<!-- TODO: give a little more space -->
		{#each events as e}
			<p>
				<ETHAmount amount={e.amount} precision={4} />
			</p>
		{/each}
		{#if event.distributedAmount}
			<p>
				<ETHAmount amount={event.distributedAmount} precision={4} />
			</p>
		{/if}
	</div>
</InfoSpaceBetween>

<style>
	div[slot='right'] {
		align-items: end;
		display: flex;
		flex-direction: column;
	}

	.beneficiaries {
		/* This is to account for the extra Distributed by line */
		margin-top: 11px;
	}
</style>
