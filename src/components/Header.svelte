<script lang="ts">
	import { onMount } from 'svelte';

	let count = 0;
	let price = 0.04;

	onMount(() => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
	});
</script>

<header>
	<img src="/favicon.svg" alt="Logo" />
	{count} minted // current price: {price} ETH
</header>

<style>
	header {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	img {
		width: 25px;
	}
</style>
