<script>
	import { generateTile, generateRandomAddresses } from '../tiles-standalone';
	import { onMount } from 'svelte';

    let tile = "";
    let address = "";
	onMount(() => {
        const randomAddresses = generateRandomAddresses(10);
        address = randomAddresses[0]
        tile = generateTile(address);

        let current = 1;
        setInterval(() => {
            address = randomAddresses[current % 10];
            tile = generateTile(address)
            current++;
        }, 1500)
    });
</script>

<div class="tiles-container">
	<div id="tiles">
        {@html tile}
        {address}
    </div>
	<p id="address" />
</div>

<main>
	<h1>Tiles</h1>
	<p>Infinite artwork</p>
	<p>Generated from any ETH address</p>
	<p>Each is unique and subjectively rare</p>
	<p>Value is for you to decide</p>
	<div class="group">
		<div>
			<a href="#/">Manifesto</a>
		</div>
		<div>
			<a href="#/">DAO</a>
		</div>
		<div>
			<a href="#/">FAQ</a>
		</div>
	</div>
	<a href="#/">Mint a tile</a>
	<a href="#/">Dreamland</a>
</main>

<style>
	:global(body) {
		background: #34495e;
        font-family: monospace;
		color: whitesmoke;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		height: 100vh;
		align-items: center;
		justify-items: center;
		max-width: 1000px;
		margin: 0 auto;
		text-align: center;
	}

	a {
		font-size: 14px;
		color: whitesmoke;
		text-decoration: none;
		position: relative;
		border-bottom: 3px solid gold;
		font-weight: 600;
	}

	a:hover {
		border-bottom: 3px solid black;
	}

	.group {
		height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.group a {
		font-weight: 300;
	}
</style>
