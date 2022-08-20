<script lang="ts">
	import { generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { readNetwork } from '$stores/web3';
	import { browser } from '$app/env';
	import Tile from '$components/Tile.svelte';

	const randomAddresses = generateRandomAddresses(25);

	let address = randomAddresses[0];
	let animate = false;
	let mouseLastMoved = Date.now();

	let currentTile = 1;
	let timer;

	function setAddressCarousel() {
		timer = setInterval(() => {
			address = randomAddresses[currentTile % 10];
			currentTile++;
		}, 1500);
	}

	function handleMove() {
		if (animate) {
			setAddressCarousel();
		}
		animate = false;
		mouseLastMoved = Date.now();
	}

	function checkAnimationState() {
		if (mouseLastMoved + 4000 < Date.now()) {
			animate = true;
			clearTimeout(timer);
		}
	}

	onMount(() => {
		setAddressCarousel();
		setInterval(() => checkAnimationState(), 1000);
	});

	let innerWidth = browser ? window.innerWidth : 0;
</script>

<svelte:window bind:innerWidth on:mousemove={handleMove} />

<main class:mobile={innerWidth < 650}>
	<Tile {address} {animate} />
	<section>
		<h1>
			<a class="heading" href="/history?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">
				Infinite (∞) Tiles v2
			</a>
		</h1>		
		<p>Generated from any Ethereum address</p>
		<p><a href="https://etherscan.io/address/0xa0dadfa9279c1379cfcabd8e21af78b9064cceb0#code">0xa0dadfA9279C1379CfcAbd8e21Af78b9064cCeb0</a></p>
		<p>
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/components/TileContentProvider.sol"
				target="_blank">Fully on-chain Solidity generated artwork</a
			>
		</p>
		<p>Each is unique & objectively rare</p>
		<a href="/wtf?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Wtf</a>
		<a href="/dao?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Treasury</a>
		<a href="/faq?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Faq</a>
		<div class="group">
			<div>
				<a href="/mint?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Mint a Tile(s)</a>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		background: white;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		height: calc(100vh - 85px);
		align-items: center;
		justify-items: center;
		max-width: 1000px;
		margin: 0 auto;
		text-align: center;
		h1,
		.heading {
			font-size: 20px;
			// border: 0;
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

		p {
			font-size: 16px;
			margin: 30px 0;
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
		&.mobile {
			display: flex;
			flex-direction: column;
			max-width: 100vw;
			h1,
			.heading {
				font-size: 15px;
			}
			p {
				font-size: 10px;
				margin: 16px 0;
			}
			a {
				font-size: 10px;
			}
		}
	}
</style>
