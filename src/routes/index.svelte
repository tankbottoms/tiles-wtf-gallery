<script lang="ts">
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { readNetwork } from '$stores/web3';
	import { browser } from '$app/env';
	import { getTileAnimationStyleString } from '$tiles/utils';

	let tile = '';
	let address = '';
	let animate = false;
	let mouseLastMoved = Date.now();
	let tileComponent: HTMLElement;

	let currentTile = 1;
	let timer;
	const randomAddresses = generateRandomAddresses(25);

	function setAddressCarousel() {
		timer = setInterval(() => {
			address = randomAddresses[currentTile % 10];
			tile = generateTile(address);
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

	function animateTile() {
		const styles = getTileAnimationStyleString(tileComponent);
		document.head.appendChild(document.createElement('style')).innerHTML = styles;
	}

	onMount(() => {
		address = randomAddresses[0];
		tile = generateTile(address);
		setAddressCarousel();
		// Check if it's been 4s since the last move
		setInterval(() => checkAnimationState(), 1000);
	});

	let innerWidth = browser ? window.innerWidth : 0;

	$: {
		if (tileComponent) {
			animateTile();
		}
	}
</script>

<svelte:window bind:innerWidth on:mousemove={handleMove} />

<main class:mobile={innerWidth < 650}>
	<div
		class="tiles-container"
		on:click={() => goto(`mint/${address}`)}
		style="transform: scale({Math.min(1, (innerWidth - 50) / 360)});"
	>
		<div id="tiles">
			{#if animate}
				<div class="tile" bind:this={tileComponent}>
					{@html tile}
				</div>
			{:else}
				<div class="title">
					{@html tile}
				</div>
			{/if}
			<div>
				{address}
			</div>
		</div>
		<p id="address" />
	</div>
	<section>
		<h1>
			<a class="heading" href="/history?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">
				infinite (∞) tiles v2
			</a>
		</h1>
		<p>generated from any ethereum address</p>
		<p>
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/components/TileContentProvider.sol"
				target="_blank">fully on-chain artwork in solidity</a
			>
		</p>
		<p>each is unique & objectively rare</p>
		<a href="/wtf?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">wtf</a>
		<a href="/dao?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">treasury</a>
		<a href="/faq?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">faq</a>
		<div class="group">
			<div>
				<a href="/mint?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">mint a tile(s)</a>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
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
		h1,
		.heading {
			font-size: 20px;
			border: 0;
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

		.tile {
			display: block;
			min-width: 100px;
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
