<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { utils } from 'ethers';
	import { generateTile } from '$utils/tilesStandalone';

    let price = 0.04;
	let tile: string;
	let showInvalidAddress = false;

    function mint() {
        console.log("🛠  Implement mint")
    }

	onMount(() => {
		// Check if legitimate address
		if (!utils.isAddress($page.params.address)) {
			showInvalidAddress = true;
		} else {
			tile = generateTile($page.params.address);
			showInvalidAddress = false;
		}
	});
</script>

<section>
	{#if showInvalidAddress}
		<h1>Not a valid address</h1>
	{:else if tile}
		{@html tile}
		<p>{$page.params.address}</p>
		<!-- TODO check if available -->
		<p>Available</p>
        <button on:click={mint}>MINT ({price} ETH)</button>
	{/if}
</section>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
		border-bottom: 3px solid gold;
		padding: 0px;
        margin-top: 20px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 100px);
		line-height: 1.3;
	}
</style>
