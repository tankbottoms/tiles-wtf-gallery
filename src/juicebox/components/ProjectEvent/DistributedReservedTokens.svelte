<script lang="ts">
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import { formatHistoricalDate, timestampToUTC } from '$juicebox/utils/formatDate';
	import EtherscanLink from '../EtherscanLink.svelte';
	import Trans from '../Trans.svelte';
	import { querySubgraph } from '$juicebox/utils/graph';
	import { onMount } from 'svelte';
	import type { DistributeReservedTokensEvent } from '$juicebox/models/subgraph-entities/v2/distribute-reserved-tokens-event';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import Popover from '../Popover.svelte';

	export let event: Partial<DistributeReservedTokensEvent>;

	let events = [];

	async function loadData() {
		events = await querySubgraph({
			entity: 'distributeToReservedTokenSplitEvent',
			keys: ['id', 'timestamp', 'txHash', 'beneficiary', 'tokenCount', 'projectId'],
			orderDirection: 'desc',
			orderBy: 'tokenCount',
			where: event?.id
				? {
						key: 'distributeReservedTokensEvent',
						value: event.id
				  }
				: undefined
		});
	}

	onMount(async () => {
		await loadData();
	});
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small><Trans>Distribute reserved tokens</Trans></small></p>
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
			{#if event.beneficiaryTokenCount}
				<EnsOrAddress address={event.beneficiary} />
			{/if}
		</div>
	</div>
	<div slot="right">
		{#if event.timestamp}
			<Popover>
				<span slot="content" class="utc">{timestampToUTC(event.timestamp * 1000)}</span>
				{formatHistoricalDate(event.timestamp * 1000)}
			</Popover>
		{/if}
		<p>
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		<p class="timestamp">called by <EnsOrAddress address={event.caller} /></p>
		{#each events as e}
			<p>
				{formatWad(e.tokenCount, { precision: 2 })}
			</p>
		{/each}
		{#if event.beneficiaryTokenCount}
			<p>
				{formatWad(event.beneficiaryTokenCount)}
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
