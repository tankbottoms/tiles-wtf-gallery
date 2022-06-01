<script lang="ts">
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import { formatHistoricalDate } from '$utils/formatDate';
	import { getTruncatedAddress } from '$components/Address.svelte';
	import EtherscanLink from '$components/EtherscanLink.svelte';
	import Trans from '$components/Trans.svelte';
	import { querySubgraph } from '$utils/graph';
	import { onMount } from 'svelte';
	import type { DistributeReservedTokensEvent } from '$models/subgraph-entities/v2/distribute-reserved-tokens-event';
	import { formatWad } from '$utils/formatNumber';

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
						{getTruncatedAddress(e.beneficiary)}
					</p>
				{/if}
			{/each}
			{#if event.beneficiaryTokenCount}
				{getTruncatedAddress(event.beneficiary)}
			{/if}
		</div>
	</div>
	<div slot="right">
		<p class="timestamp">
			{event.timestamp && formatHistoricalDate(event.timestamp * 1000)}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		<p class="timestamp">called by {getTruncatedAddress(event.caller)}</p>
		{#each events as e}
			<p>
				{formatWad(e.tokenCount)}
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
