<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import Icon from '$jbx/components/Icon.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import ProjectEvent from '$jbx/components/ProjectEvent';
	import { getProjectEvents } from '$jbx/data/event';
	import Dropdown from '$jbx/components/Dropdown.svelte';
	import type { WhereConfig } from '$jbx/utils/graph';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	enum ActivityFilter {
		all = 'All events',
		payEvent = 'Paid',
		redeemEvent = 'Redeemed',
		distributePayoutsEvent = 'Distributed Funds',
		distributeReservedTokensEvent = 'Distributed Tokens',
		deployedERC20Event = 'ERC20 Deployed',
		projectCreateEvent = 'Project Created'
	}

	export let loading: boolean = false;
	export let current: ActivityFilter = ActivityFilter['All events'];

	let events = [];

	const options = Object.keys(ActivityFilter).map((key) => ({
		label: ActivityFilter[key],
		value: key
	}));

	async function loadEvents(current: string) {
		loading = true;
		let where: WhereConfig<'projectEvent'>[] = [
			{ key: 'projectId', value: $project.projectId.toNumber() },
			// TODO fix type error
			{ key: 'cv', value: '2' }
		];

		if (current && current !== 'all') {
			where.push({
				key: current,
				// TODO fix type error
				operator: 'not',
				value: null
			});
		}
		// TODO fix type error
		events = await getProjectEvents(where, 0, 50);
		loading = false;
	}

	$: {
		loadEvents(current);
	}
</script>

<section>
	<header>
		<InfoSpaceBetween>
			<h4 slot="left">Activity</h4>
			<div slot="right">
				<p><Icon name="download" /></p>
				<Dropdown {options} bind:value={current} size="sm" />
			</div>
		</InfoSpaceBetween>
	</header>
	{#if loading}
		<div class="loading">
			<Icon name="loading" spin />
		</div>
	{/if}
	{#each events as event}
		<ProjectEvent {event} />
	{/each}
	{#if !events.length}
		<p class="noActivity">No activity yet</p>
	{/if}
</section>

<style>
	section {
		flex: 0 0 50%;
		width: 100%;
		padding-left: 20px;
		padding-right: 20px;
		margin: 0 auto;
		margin-top: 10px;
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
		align-items: end;
	}

	div[slot='right'] p {
		margin: 0;
		margin-right: 10px;
		transform: scale(1.2);
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
