<script lang="ts">
	import { onMount } from 'svelte';
	import { web3Connect, web3Disconnect, provider, connectedAccount } from '$stores/web3';

	let count = 0;
	let price = 0.04;

	onMount(async () => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
		// Async import module due to window being undefined

		connectedAccount.subscribe(async ($connectedAccount) => {
			if ($connectedAccount) {
				const ens = $provider && (await $provider.lookupAddress($connectedAccount));
				if (ens) {
					$connectedAccount = ens;
				}
			}
		});
	});
</script>

<header>
	<div class="left">
		<a href="/">
			<img src="/favicon.svg" alt="Logo" />
		</a>
		{count} minted // current price: {price} ETH
	</div>

	<div class="right">
		{#if $connectedAccount}
			<p>{$connectedAccount}</p>
			<button class="disconnect" on:click={web3Disconnect}>X</button>
		{:else}
			<button on:click={web3Connect}>connect</button>
		{/if}
	</div>
</header>

<style>
	header,
	.right,
	.left {
		display: flex;
	}

	header {
		justify-content: space-between;
	}

	.right,
	.left {
		align-items: center;
		gap: 10px;
	}

	.right {
		justify-content: flex-end;
	}

	img {
		width: 25px;
	}

	button,
	p {
		margin-left: auto;
	}

	button {
		border: none;
		background: none;
		cursor: pointer;
		border-bottom: 3px solid gold;
		padding: 0px 0px 8px;
	}

	button:hover {
		border-bottom: 3px solid black;
	}

	.disconnect {
		padding: 0;
	}
</style>
