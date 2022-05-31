<script lang="ts">
	import { constants } from 'ethers';
	import { onMount } from 'svelte';
	import { generateTile, generateRandomAddresses } from '../tiles-standalone';

	const { AddressZero } = constants;

	let randomTiles: any[] = [];

	onMount(() => {
		const randomAddresses = generateRandomAddresses(50);
		randomTiles = randomAddresses.map((address) => ({ address, tile: generateTile(address) }));
	});
</script>

<section>
	<h1>Mint a Tile</h1>
	<p>Enter an 0x address to find its matching Tile, or browse the randomly generated list below.</p>
	<input placeholder={AddressZero} />
</section>
<section>
	{#each randomTiles as item}
		<div class="tileContainer">
			{@html item.tile}
			<span>{item.address}</span>
		</div>
	{/each}
</section>

<style>
	section {
		margin: 0 auto;
		max-width: 360px;
		margin-top: 2.5rem;
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

	.tileContainer {
		color: #222;
		margin-bottom: 80px;
		text-align: center;
	}

	.tileContainer span {
		opacity: 0.25;
	}
</style>
