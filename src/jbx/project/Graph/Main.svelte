<script lang="ts">
	import { onMount } from 'svelte';
	import Dropdown from '$jbx/components/Dropdown.svelte';
	import Chart from './Chart.svelte';
	import { loadBlockRefs } from './loadBlockRefs';
	import { daysToMillis } from './utils';
	import type { Duration } from './types';

	export let width: number;
	export let createdAt: number | undefined;
	export let projectId: number | undefined;

	let events = [];
	let tab = 0;
	let duration: Duration;

	console.log(createdAt)

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

	onMount(() => {
		duration = getDuration({ createdAt, now });

		loadBlockRefs({ duration, now }).then((blockRefs) => {
			console.log(blockRefs);
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
	{#if tab === 0}
		<Chart
			{width}
			data={Array(100)
				.fill(0)
				.map((_, i) => {
					const date = new Date(i * 86400000);
					return [`${date.getMonth() + 1}/${date.getDate()}`, Math.random() * i * 0.2 + i * 0.8];
				})}
		/>
	{:else if tab === 1}
		<Chart
			{width}
			data={Array(100)
				.fill(0)
				.map((_, i) => {
					const date = new Date(i * 86400000);
					return [`${date.getMonth() + 1}/${date.getDate()}`, Math.random() * i * 0.2 + i * 0.8];
				})}
		/>
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
