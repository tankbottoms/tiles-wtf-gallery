<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type Store from '$utils/Store';
	import Icon from '../Icon.svelte';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { getProjectEvents } from '$juicebox/data/event';
	import Dropdown from '../Dropdown.svelte';
	import type { WhereConfig } from '$juicebox/utils/graph';
	import { openModal } from '../Modal.svelte';
	import DownloadActivityModal from './DownloadActivityModal.svelte';
	import ProjectEvent from '../ProjectEvent';
	import type { ProjectEvent as ProjectEventType } from '$juicebox/models/subgraph-entities/vX/project-event';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	enum ActivityFilter {
		all = 'All events',
		payEvent = 'Paid',
		redeemEvent = 'Redeemed',
		distributePayoutsEvent = 'Distributed Funds',
		distributeReservedTokensEvent = 'Distributed Tokens',
		deployedERC20Event = 'ERC20 Deployed',
		projectCreateEvent = 'Project Created',
		deployETHERC20ProjectPayerEvent = 'ETH-ERC20 Address Created'
	}

	export let loading: boolean = false;
	export let loadingMetadata = false;
	export let current: ActivityFilter = ActivityFilter['All events'];

	let events: ProjectEventType[] = [];

	const options = Object.keys(ActivityFilter).map((key) => ({
		label: ActivityFilter[key],
		value: key
	}));

	$: if (!loadingMetadata) {
		loadEvents(current, 0, 80).then((e) => (events = e));
	}

	async function loadEvents(current: string, from: number, to: number) {
		loading = true;
		let where: WhereConfig<'projectEvent'>[] = [
			{ key: 'cv', value: '2' },
			{ key: 'projectId', value: $project.projectId.toNumber() }
		];

		if (current && ActivityFilter[current] !== 'All events') {
			where.push({
				key: current as any,
				operator: 'not',
				value: null
			});
		}
		const events = await getProjectEvents(where, from, to);
		loading = false;
		return events;
	}

	async function loadMore() {
		const _events = await loadEvents(current, events.length, events.length + 50);
		events = [...events, ..._events];
	}

	function openDownloadModal() {
		openModal(DownloadActivityModal);
	}

	$: $project.events = events;
</script>

<section>
	<header>
		<InfoSpaceBetween>
			<h4 slot="left">Activity</h4>
			<div slot="right">
				{#if !loading && !loadingMetadata}
					<p on:click={openDownloadModal}><Icon name="download" /></p>
				{/if}
				<Dropdown {options} bind:value={current} size="sm" />
			</div>
		</InfoSpaceBetween>
	</header>
	{#each events as event}
		<ProjectEvent {event} />
	{:else}
		{#if !loading && !loadingMetadata}
			<p class="noActivity">No activity yet</p>
		{/if}
	{/each}
	{#if loading || loadingMetadata}
		<div class="loading">
			<Icon name="loading" spin />
		</div>
	{:else if events.length}
		<div
			style="text-align: center; color: rgba(225, 224, 232, 0.847); cursor: pointer;"
			on:click={loadMore}
		>
			Load more
		</div>
	{/if}
</section>

<style>
	section {
		flex: 0 0 50%;
		width: 100%;
		padding-left: 20px;
		padding-right: 20px;
		margin: 0 auto;
		margin-top: 40px;
	}

	header {
		margin-bottom: 20px;
	}

	h4 {
		font-weight: 600;
		color: var(--text-header);
	}

	.noActivity {
		border-top: 1px solid var(--stroke-tertiary);
		padding-top: 20px;
		font-weight: 300;
	}

	div[slot='right'] {
		width: 230px;
		font-weight: 300;
		display: flex;
		align-items: flex-end;
	}

	div[slot='right'] p {
		margin: 0;
		margin-right: 16px;
		font-size: 16px;
		color: var(--text-action-primary);
	}

	div[slot='right'] p:hover {
		cursor: pointer;
	}

	.loading {
		color: var(--text-header);
		margin-top: 50px;
		text-align: center;
		transform: scale(1.5);
		width: 100%;
	}

	@media (max-width: 768px) {
		section {
			flex: 0 0 100%;
		}
	}
</style>
