<script>
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { readNetwork } from '$stores/web3';

	let tile = '';
	let address = '';

	onMount(() => {
		const randomAddresses = generateRandomAddresses(25);
		address = randomAddresses[0];
		tile = generateTile(address);

		let current = 1;
		setInterval(() => {
			address = randomAddresses[current % 10];
			tile = generateTile(address);
			current++;
		}, 1500);
	});
</script>

<main>
	<div class="tiles-container" on:click={() => goto(`mint/${address}`)}>
		<div id="tiles">
			{@html tile}
			{address}
		</div>
		<p id="address" />
	</div>
	<section>
		<h1>infinite tiles v2</h1>
		<p>generated from any eth address</p>
		<p>
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/components/TileContentProvider.sol"
				target="_blank">fully on-chain artwork in solidity</a
			>
		</p>
		<p>each is unique & objectively rare</p>
		<a href="/wtf">wtf</a>
		<a href="/dao?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">treasury</a>
		<a href="/faq">faq</a>
		<div class="group">
			<div>
				<a href="/mint">mint a tile</a>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="center">
		<div class="link">
			<a href="/tos">terms of sale</a>
		</div>
	</div>
</footer>

<style>
	main {
		background: white;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		height: 100vh;
		align-items: center;
		justify-items: center;
		max-width: 1000px;
		margin: 0 auto;
		text-align: center;
	}
	h1 {
		font-size: 20px;
	}

	a {
		font-size: 14px;
		color: black;
		text-decoration: none;
		position: relative;
		border-bottom: 3px solid gold;
		margin: 0px 10px;
	}

	a:hover {
		border-bottom: 3px solid black;
	}

	.center {
		margin: auto;
		font-size: 14px;
		color: black;
		text-decoration: none;
		align-items: center;
		justify-items: center;
		text-align: center;
		margin: 0px 5px;
	}

	p {
		font-size: 16px;
		margin: 30px;
	}

	.group {
		margin-top: 30px;
		height: 60px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20px;
		font-weight: 600;
	}
</style>
