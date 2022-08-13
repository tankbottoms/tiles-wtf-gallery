<script lang="ts">
	import Loading from '$juicebox/components/Loading.svelte';
	import { readNetwork } from '$stores/web3';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTilesHistory } from '$utils/tiles';
	import moment from 'moment';
	import { onMount } from 'svelte';

	let grid = true;
	let tiles: {
		address: string;
		tile: string;
		timestamp: number;
		blockNumber: number;
	}[] = [];
	let loading = false;

	onMount(async () => {
		readNetwork.subscribe(async (net) => {
			try {
				loading = true;
				const history = await getTilesHistory();
				tiles = history.map(({ address, ...rest }) => ({
					address,
					tile: generateTile(address),
					...rest
				}));
				loading = false;
			} catch (e: any) {
				console.error(e.message);
			}
		});
	});
</script>

<section>
	<h3>mint history</h3>
</section>

<section class:grid>
	{#each tiles as item}
		<div class="tileContainer">
			<div class="image">
				{@html item.tile}
			</div>

			<div class="address">{item.address}</div>
			{#if item.timestamp}
				{#await moment(item.timestamp * 1000) then date}
					<div class="timestamp">{date.format('LLL')}</div>
				{/await}
			{/if}
		</div>
	{:else}
		{#if loading}
			<Loading />
		{:else}
			no data available
		{/if}
	{/each}
</section>

<div class="menu">
	<div
		class="menuItem"
		on:click={() => {
			window.scrollTo(0, 0);
		}}
		style={'margin-bottom: 10px'}
	>
		^
	</div>
	<div
		class="menuItem"
		class:menuActive={grid}
		on:click={() => {
			grid = true;
		}}
	>
		+
	</div>
	<div
		class="menuItem"
		class:menuActive={!grid}
		on:click={() => {
			grid = false;
		}}
	>
		-
	</div>
</div>

<style lang="scss">
	section {
		margin: 0 auto;
		max-width: 360px;
		margin-top: 2.5rem;
	}

	h3 {
		text-align: center;
	}

	section.grid {
		margin-top: 3.5rem;
		max-width: 1200px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
	}
	.tileContainer {
		color: #222;
		margin-bottom: 80px;
		text-align: center;
	}

	.menu {
		position: fixed;
		bottom: 0px;
		right: 0px;
		padding: 10px;
		font-weight: bold;
		font-size: 1rem;
		.menuActive {
			cursor: default;
			opacity: 0.4;
		}

		.menuItem {
			cursor: pointer;
			background: rgb(34, 34, 34);
			color: white;
			padding: 5px;
		}
	}
</style>
