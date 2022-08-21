<script lang="ts">
	import Icon from '$juicebox/components/Icon.svelte';
	import { constants, utils } from 'ethers';
	import { onMount } from 'svelte';
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import Footer from '$components/Footer.svelte';
	import Tile from '$components/Tile.svelte';
	const { AddressZero } = constants;

	let input: string | undefined;
	let grid = true;
	let randomTiles: any[] = [];
	let address = '';
	let showInvalidAddress = false;

	onMount(() => {
		const randomAddresses = generateRandomAddresses(51);
		randomTiles = randomAddresses.map((address) => ({ address, tile: generateTile(address) }));
	});

	$: {
		if (utils.isAddress(input || '')) {
			address = input || '';
			showInvalidAddress = false;
		} else if (input !== '' && input !== undefined) {
			address = '';
			showInvalidAddress = true;
		} else {
			address = '';
			showInvalidAddress = false;
		}
	}
</script>

<main>
	<section>
		<h1>Mint a tile</h1>
		<p>
			Enter any '0x' address to find its matching tile, or browse the randomly generated tiles
			below. Experiment with generating 'order' tiles by entering patterns in the address parts.
		</p>
		<input placeholder={AddressZero} bind:value={input} />
	</section>
	<section class:grid>
		{#if address}
			<Tile {address} />			
		{:else if showInvalidAddress}
			<p>Not a valid Ethereum address. Input length is {input.length - 2}/40.</p>
		{:else}
			{#each randomTiles as item}
				<Tile address={item.address} />
			{/each}
		{/if}
	</section>
	<section>
		{#if address}
			<p>Select the generated tile to continue.</p>			
		{/if}
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

	<div class="socialIcons" target="_blank">
		<a href="https://twitter.com/Tile_DAO">
			<Icon name="twitter" />
		</a>
		<a href="https://discord.gg/U3fMydKj4J" target="_blank">
			<Icon name="discord" />
		</a>
		<a href="https://github.com/tankbottoms/tiles-on-chain" target="_blank">
			<Icon name="github" style="width: 1rem" />
		</a>
	</div>
</main>
<Footer />

<style>
	main {
		position: relative;
	}
	section {
		margin: 0 auto;
		max-width: 560px;
		margin-top: 2.5rem;
	}

	section.grid {
		margin-top: 3.5rem;
		max-width: 1200px;
		display: grid;
		row-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
	}

	h1 {
		text-align: center;
	}

	input {
		text-align: center;
		display: block;
		border: 1px solid rgb(221, 221, 221);
		border-radius: 4px;
		padding: 5px;
		width: 100%;
		box-sizing: border-box;
	}

	a {
		cursor: pointer;
	}

	p {
		text-align: center;
	}

	.socialIcons {
		position: fixed;
		bottom: 0px;
		left: 0px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.menu {
		position: fixed;
		bottom: 0px;
		right: 0px;
		padding: 10px;
		font-weight: bold;
		font-size: 1rem;
	}

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
</style>
