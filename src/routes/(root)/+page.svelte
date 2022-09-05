<script lang="ts">
	import { APP_CONFIG } from '$constants/app';
	import { generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { readNetwork } from '$stores/web3';
	import { browser } from '$app/environment';
	import Tile from '$components/Tile.svelte';
	import Icon from '$juicebox/components/Icon.svelte';
import { splitPercentFrom } from '$juicebox/utils/v2/math';

	const randomAddresses = generateRandomAddresses(25);

	let address = randomAddresses[0];
	let animate = false;
	let mouseLastMoved = Date.now();

	let currentTile = 1;
	let timer;

	let commitHash = '';

	async function getCommitHash() {
		const response = await fetch('/commit-hash.txt');
		if (response.ok) {
			const text = await response.text();
			commitHash = text;
		} else {
			commitHash = '';
		}
	}

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
		getCommitHash();
	});

	let innerWidth = browser ? window.innerWidth : 0;
</script>

<svelte:window bind:innerWidth on:mousemove={handleMove} />

<main class:mobile={innerWidth < 650}>
	<Tile {address} {animate} bigger />
	<section>
		<h1>
			<a class="heading" href="/history?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">
				Infinite (∞) Tiles v2
			</a>
		</h1>
		<p>Generated from any Ethereum address</p>
		<p>
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/components/TileContentProvider.sol"
				target="_blank">Fully on-chain Solidity generated artwork</a
			>
		</p>
		<p>Each is unique & objectively rare</p>

		<a href="/wtf?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Wtf</a>
		<a href="/dao?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Juicebox</a>
		<a href="/faq?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Faq</a>
		<a href="/seizures?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Seizures</a>
		<div class="group">
			<div>
				<a href="/mint?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Mint a Tile</a>
			</div>
		</div>
		{#if commitHash}
			<div class="small">
				<a href="https://github.com/tankbottoms/tiles-wtf-gallery/commit/{commitHash.split(/\s+/)[0]}">commit:{commitHash.split(/\s+/)[0].slice(0, 15)}</a>
			</div>
		{/if}
	</section>
	<div class="socialIcons" target="_blank">
		<a href="https://twitter.com/Tile_DAO">
			<Icon name="twitter" />
		</a>
		<a href="https://discord.gg/U3fMydKj4J" target="_blank">
			<Icon name="discord" />
		</a>
		<a href="https://github.com/tankbottoms/tiles-on-chain" target="_blank">
			<Icon name="github" style="width: 1rem" />
		</a>
	</div>
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

		.socialIcons {
			position: fixed;
			bottom: 0px;
			left: 0px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
		}
		.menu {
			position: fixed;
			bottom: 0px;
			right: 0px;
			padding: 10px;
			font-weight: bold;
			font-size: 1rem;
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
	.small {
		font-size: 0.6rem;
	}
</style>
