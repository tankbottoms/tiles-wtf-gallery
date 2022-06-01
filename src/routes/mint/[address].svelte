<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { utils } from 'ethers';
	import { generateTile } from '$utils/tilesStandalone';
	import { connectedAccount, provider } from '$stores/web3';

	let price = 0.04;
	let tile: string;
	let showInvalidAddress = false;
	let showInsufficientBalance = false;

	async function mint() {
		console.log('🛠  Implement mint');
		// Todo check the balance of the wallet
		const balance = await $provider.getBalance($connectedAccount);
		const amount = utils.formatEther(balance);
		if (Number(amount) < price) {
			showInsufficientBalance = true;
		}
	}

	function download() {
		const blob = new Blob([tile], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'tile.svg';
		link.click();
		window.URL.revokeObjectURL(url);
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
		{#if showInsufficientBalance}
			<p>Insufficient balance</p>
		{/if}
	{/if}
</section>
<button class="download" on:click={download}> Download SVG </button>

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

	.download {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}
</style>
