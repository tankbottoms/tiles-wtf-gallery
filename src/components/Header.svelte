<script lang="ts">
	import { onMount } from 'svelte';

	let count = 0;
	let price = 0.04;

	let connectedAccount: string;
	let provider: any;
	let connect: () => void;
	let disconnect: () => void;

	onMount(async () => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
		// Async import module due to window being undefined
		const web3 = await import('$stores/web3');
		const connectedAccountStore = web3.connectedAccount;
		connect = web3.walletConnect;
		disconnect = web3.disconnectWallet;
		provider = web3.provider;

		connectedAccountStore.subscribe(async () => {
			connectedAccount = connectedAccountStore.get();
			if (connectedAccount) {
				const ens = $provider && (await $provider.lookupAddress(connectedAccount));
				if (ens) {
					connectedAccount = ens;
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