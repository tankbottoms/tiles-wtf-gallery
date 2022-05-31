<script lang="ts">
	import { onMount } from 'svelte';

	let count = 0;
	let price = 0.04;

	let connectedAccount: string;
	let connect: () => void;
	let disconnect: () => void;

	onMount(async () => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
		// Async import module due to window being undefined
		const web3 = await import('$stores/web3');
		connect = web3.walletConnect;
		disconnect = web3.disconnectWallet;
		const connectedAccountStore = web3.connectedAccount;

		connectedAccountStore.subscribe(() => {
			connectedAccount = connectedAccountStore.get();
		});
	});
</script>

<header>
	<div class="left">
		<img src="/favicon.svg" alt="Logo" />
		{count} minted // current price: {price} ETH
	</div>

	<div class="right">
		{#if connectedAccount}
			<p>{connectedAccount}</p>
			<button class="disconnect" on:click={disconnect}>X</button>
		{:else}
			<button on:click={connect}>connect</button>
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
