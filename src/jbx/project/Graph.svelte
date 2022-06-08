<script lang="ts">
	import Chart from './Chart.svelte';
	import Dropdown from '$jbx/components/Dropdown.svelte';

	export let width: number;

	let tab = 0;
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
