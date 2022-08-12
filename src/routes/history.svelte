<script lang="ts">
	import { readNetwork } from '$stores/web3';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTilesHistory } from '$utils/web3/contractReader';
	import { onMount } from 'svelte';

	let grid = false;
	let tiles: any[] = [];

	onMount(async () => {
		readNetwork.subscribe(async (net) => {
			try {
				const history = await getTilesHistory();
				tiles = history.map((address) => ({ address, tile: generateTile(address) }));
			} catch (e) {
				console.error(e.message);
			}
		});
	});
</script>

<section>
	<h1>Mint history</h1>
</section>

<section class:grid>
	{#each tiles as item}
		<div class="tileContainer">
			{@html item.tile}
			<span>{item.address}</span>
		</div>
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

	h1 {
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

	.tileContainer span {
		opacity: 0.25;
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
