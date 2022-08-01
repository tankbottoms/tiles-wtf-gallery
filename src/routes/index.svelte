<script>
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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

<main style="background: black">
	<div class="tiles-container" on:click={() => goto(`mint/${address}`)}>
		<div id="tiles">
			{@html tile}
			{address}
		</div>
		<p id="address" />
	</div>
	<section>
		<h1>Tiles v1.2 (on-chain)</h1>
		<p>Infinite artwork</p>
		<p>Generated from any ETH address</p>
		<p>Each is unique & subjectively rare</p>		
		<a href="/wtf">wtf</a>
		<a href="https://juicebox.money/v2/p/41" target="_blank">Juicebox treasury</a>
		<a href="/faq">faq</a>
		<div class="group">
			<div>
				<a href="/mint">Mint a tile</a>
			</div>
		</div>
	</section>
</main>

<footer>				
	<a href="https://info.juicebox.money/tos" target="_blank" class="center">Terms of service</a>				
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
		max-width: 1000px;
  		border-bottom: 3px solid gold;
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

	/* Attempt to fix size of tile */
	/* #tiles {
        width: 70vh;
        height: 70vh;
        max-width: 100vw;
        max-height: 100vw;
        min-width: 360px;
        min-height: 360px;
    } */
	/* 
	:global(#tiles svg) {
        width: 100%;
        height: 100%;
	} */
</style>
