<script lang="ts">
	import { onMount } from 'svelte';

	let count = 0;
	let price = 0.04;

    function connect() {
        console.log('🛠 TODO connect')
    }

	onMount(() => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
	});
</script>

<header>
	<img src="/favicon.svg" alt="Logo" />
	{count} minted // current price: {price} ETH
    <button on:click={connect}>connect</button>
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

    button {
        margin-left: auto;
        border: none;
        background: none;
        cursor: pointer;
        border-bottom: 3px solid gold;
        padding: 0px 0px 8px;
    }

    button:hover {
        border-bottom: 3px solid black;
    }
</style>
