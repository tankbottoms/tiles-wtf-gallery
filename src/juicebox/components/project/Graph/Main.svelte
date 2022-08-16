<script lang="ts">
	import { onMount } from 'svelte';
	import type { BigNumber } from 'ethers';
	import Dropdown from '../../Dropdown.svelte';
	import Chart from './Chart.svelte';
	import { daysToMillis } from './utils';
	import { loadBlockRefs } from './loadBlockRefs';
	import { loadProjectEvents } from './loadProjectEvents';
	import { loadTapEvents } from './loadTapEvents';
	import type { Duration, EventRef, ShowGraph } from './types';
	import Loading from '../../Loading.svelte';
	import { chainId } from '$stores/web3';

	export let width: number;
	export let createdAt: number | undefined;
	export let projectId: BigNumber | undefined;

	let duration: Duration;
	let errorMessage = '';
	let showGraph: ShowGraph = 'volume';
	let events: EventRef[] = [];
	let loading = events.length ? false : true;

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
		} else if (createdAtMs > now - daysToMillis(30)) {
			duration = 30;
		} else if (createdAtMs > now - daysToMillis(90)) {
			duration = 90;
		} else {
			duration = 365;
		}

		return duration;
	};

	function formatEvents(events: any[]): [string, number][] {
		return events.map((event: any) => {
			let date = epochToEpochMs(event.timestamp);
			let dateString = new Date(date).toLocaleDateString() as string;
			dateString = dateString.substring(0, dateString.length - 5);
			const value = event.value;
			return [dateString, value] as [string, number];
		});
	}

	let pendingRequest = 0;

	$: cacheExpiry = daysToMillis(2 / 24); // 2 hour
	const cacheKey = () => `EVENTS_${$chainId}_${projectId.toString()}_${showGraph}_${duration}`;

	async function setEvents() {
		try {
			const key = cacheKey();
			const _chainId = $chainId;
			const _showGraph = showGraph;
			const _duration = duration;
			const _projectId = projectId.toString();

			if (!events.length) loading = true;
			const requistId = ++pendingRequest;
			const blockRefs = await loadBlockRefs({ duration, now });
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
			if (
				requistId === pendingRequest &&
				_chainId === $chainId &&
				_showGraph === showGraph &&
				_duration === duration &&
				_projectId === projectId.toString()
			) {
				events = sortedEvents;
				loading = false;
			}
			const cachedEvents = JSON.parse(localStorage.getItem('CACHED_EVENTS') || '{}');
			cachedEvents[key] = {
				events,
				cachedAt: Date.now()
			};
			localStorage.setItem('CACHED_EVENTS', JSON.stringify(cachedEvents));
		} catch (error) {
			console.log(error);
			if (loading || !events.length) {
				loading = false;
				errorMessage = 'cannot load data at the moment';
			} else {
				console.error(errorMessage);
			}
		}
	}

	function switchTab(tab: ShowGraph) {
		showGraph = tab;
		setEvents();
	}

	function updateEvents() {
		const key = cacheKey();
		const cachedEvents = JSON.parse(localStorage.getItem('CACHED_EVENTS') || '{}');
		if (cachedEvents[key]) {
			events = cachedEvents[key].events || [];
			const cachedAt = cachedEvents[key].cachedAt as number;
			if (!events.length || Date.now() - cachedAt > cacheExpiry) {
				loading = true;
				setEvents();
			} else {
				loading = false;
			}
		} else {
			loading = true;
			setEvents();
		}
	}

	onMount(() => {
		duration = getDuration({ createdAt, now });
		updateEvents();
	});

	function handleDurationChange(event: CustomEvent<{ value: Duration }>) {
		duration = event.detail.value;
		updateEvents();
	}

	let lastShowGraph: ShowGraph = showGraph;
	$: if (lastShowGraph !== showGraph) {
		lastShowGraph = showGraph;
		updateEvents();
	}
</script>

<header>
	<div class="tabs">
		<div on:click={() => switchTab('volume')}>
			<div class="tab" class:active={showGraph === 'volume'}>Volume</div>
		</div>
		<div on:click={() => switchTab('balance')}>
			<div class="tab" class:active={showGraph === 'balance'}>In Juicebox</div>
		</div>
	</div>
	<div class="dropdown">
		<Dropdown
			size="xs"
			options={[
				{
					label: '24 HOURS',
					value: 1
				},
				{
					label: '7 DAYS',
					value: 7
				},
				{
					label: '30 DAYS',
					value: 30
				},
				{
					label: '90 DAYS',
					value: 90
				},
				{
					label: '1 YEAR',
					value: 365
				}
			]}
			on:select={handleDurationChange}
			initial={90}
			value={duration}
		/>
	</div>
</header>

<div>
	{#if loading}
		<Loading height={170} />
	{:else if errorMessage}
		<div class="error">{errorMessage}</div>
	{:else if showGraph === 'volume'}
		<Chart {width} data={events} {duration} />
	{:else if showGraph === 'balance'}
		<Chart {width} data={events} {duration} />
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

	.error {
		color: var(--text-primary);
		margin-bottom: 20px;
	}
</style>
