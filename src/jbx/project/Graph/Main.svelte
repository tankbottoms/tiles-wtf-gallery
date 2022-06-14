<script lang="ts">
	import { onMount } from 'svelte';
	import type { BigNumber } from 'ethers';
	import Dropdown from '$jbx/components/Dropdown.svelte';
	import Chart from './Chart.svelte';
	import { daysToMillis } from './utils';
	import { loadBlockRefs } from './loadBlockRefs';
	import { loadProjectEvents } from './loadProjectEvents';
	import { loadTapEvents } from './loadTapEvents';
	import type { Duration, ShowGraph } from './types';

	export let width: number;
	export let createdAt: number | undefined;
	export let projectId: BigNumber | undefined;

	console.log(projectId);

	let duration: Duration;
	let events = [];
	let showGraph: ShowGraph = 'volume';
	let tab = 0;

	// @ts-ignore
	const now = new Date() - 5 * 60 * 1000;

	const epochToEpochMs = (epoch: number) => epoch * 1000;

	export const getDuration = ({
		createdAt,
		now
	}: {
		createdAt: number | undefined;
		now: number;
	}): Duration => {
		let duration: Duration;
		if (!createdAt) return;
		const createdAtMs = epochToEpochMs(createdAt);
		if (createdAtMs > now - daysToMillis(1)) {
			duration = 1;
		} else if (createdAtMs > now - daysToMillis(7)) {
			duration = 7;
		} else {
			duration = 30;
		}

		return duration;
	};

	function formatEvents(events: any[]): [string, number][] {
		return events.map((event: any) => {
			let date = epochToEpochMs(event.timestamp);
			// TODO: what is up with these type issues?! AGH, locale returns a string?!
			date = new Date(date).toLocaleDateString() as string;
			// Remove the last 5 characters which correspond to year /202x
			date = date.substring(0, date.length - 5);
			const value = event.value;
			return [date, value] as [string, number];
		});
	}

	onMount(() => {
		duration = getDuration({ createdAt, now });

		loadBlockRefs({ duration, now }).then(async (blockRefs) => {
			// TODO load the project events
			const projectEvents = await loadProjectEvents({
				blockRefs,
				showGraph,
				projectId,
				cv: '2'
			});

			if (showGraph === 'balance') {
				const tapEvents = await loadTapEvents({ projectId, duration, now });
				projectEvents.concat(tapEvents);
			}

			let sortedEvents = projectEvents.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
			sortedEvents = sortedEvents.map((e, i) => {
				if (e.tapped) {
					return { ...e, previousBalance: sortedEvents[i - 1]?.value };
				}
				return e;
			});
			events = formatEvents(sortedEvents);
		});
	});
</script>

<header>
	<div class="tabs">
		<div on:click={() => (tab = 0)}>
			<div class="tab" class:active={tab === 0}>Volume</div>
		</div>
		<div on:click={() => (tab = 1)}>
			<div class="tab" class:active={tab === 1}>In Juicebox</div>
		</div>
	</div>
	<div class="dropdown">
		<Dropdown
			size="xs"
			options={[
				{
					label: '24 HOURS',
					value: '24H'
				},
				{
					label: '7 DAYS',
					value: '7D'
				},
				{
					label: '30 DAYS',
					value: '30D'
				},
				{
					label: '90 DAYS',
					value: '90D'
				},
				{
					label: '1 YEAR',
					value: '1Y'
				}
			]}
			value="30D"
		/>
	</div>
</header>

<div>
	{#if tab === 0 && events.length > 0}
		<Chart {width} data={events} />
	{:else if tab === 1 && events.length > 0}
		<Chart {width} data={events} />
	{/if}
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.tabs {
		display: flex;
		gap: 24px;
	}
	.tab {
		font-weight: 400;
		text-transform: uppercase;
		font-size: 0.8rem;
		color: var(--text-tertiary);
		cursor: pointer;
	}

	.tab.active {
		font-weight: 700;
		color: var(--text-secondary);
	}

	.dropdown {
		width: 100px;
	}
</style>
