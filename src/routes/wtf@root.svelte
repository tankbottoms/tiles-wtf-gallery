<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import SplitPane from '$components/SplitPane.svelte';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import { onMount } from 'svelte';

	let tile = '';
	let address = '';
	let animate = false;
	let mouseLastMoved = Date.now();
	let tileComponent: HTMLElement;

	let currentTile = 1;
	let timer: NodeJS.Timeout;

	const initialSigners = [
		'0x5d95baEBB8412AD827287240A5c281E3bB30d27E',
		'0x63a2368f4b509438ca90186cb1c15156713d5834',
		'0x823b92d6a4b2aed4b15675c7917c9f922ea8adad',
		'0xe7879a2d05dba966fcca34ee9c3f99eee7edefd1',
		'0x4823e65c10daa3ef320e5e262cfa8d0a059e02a6',
		'0x5566b7cb1cccb3e147084cf971d6dda770a3c90f'
	];

	function setAddressCarousel() {
		timer = setInterval(() => {
			address = initialSigners[currentTile % initialSigners.length];
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
		address = initialSigners[0];
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

<SplitPane>
	<section slot="left">
		<img
			class="peri-profile"
			width="360"
			src="https://cloudflare-ipfs.com/ipfs/QmaM1m53J2qwEa5Gu3XNW8xryPbkNpMp42Wc984WtZj9iU"
			alt="@peri profile with Tile background with nipple"
		/>
		<caption
			><a href="https://twitter.com/peripheralist">@peripheralist</a>, Presumably on a warm relaxing
			day, contemplating life, the universe, ∞ and everything.</caption
		>
		<br />
		<br />
		<main class:hide={innerWidth < 650}>
			<div
				class="tiles-container"
				on:click={() => goto(`mint/${address}`)}
				style="transform: scale({Math.min(1, (innerWidth - 50) / 560)});"
			>
				<div id="tiles">
					{#if animate}
						<div class="tile" bind:this={tileComponent}>
							{@html tile}
						</div>
					{:else}
						<div class="tile">
							{@html tile}
						</div>
					{/if}
					<div>
						{address}
					</div>
				</div>
				<p id="address" />
			</div>
		</main>
	</section>
	<section slot="right">
		<h1>Wtf?</h1>
		<p>
			<a href="https://github.com/tankbottoms/tiles-on-chain">Infinite Tiles v2</a> is a
			reversed-engineered implementation of @peripheralist’s
			<a href="https://github.com/TileDAO">Tiles</a>, without any api-service support. The SVG tile,
			metadata including attributes, are generated and served from the Ethereum blockchain from
			Solidity.
		</p>
		<p>
			The minting and <a href="/dao">Tiles Juicebox Treasury</a> experience here were implemented
			with Svelte in Typescript. The
			<a href="https://github.com/tankbottoms/tiles-on-chain">tiles-v2-nft</a>
			and
			<a href="https://github.com/tankbottoms/tiles-wtf-gallery">tiles-v2-gallery</a> Github repos
			together seek to further decentralize the
			<a
				href="https://snapshot.org/#/jbdao.eth/proposal/0x122ec83036d4ed2379c98ed6c566666256169aac1ee4316f60da24bd768c7ff6"
				target="_blank">Juicebox v2 protocol</a
			>.
		</p>
		<p>
			This project is an homage to the venerable @peripheralist: the genius artist, designer,
			developer, grapher, person. <i>"all hail @peripheralist,"</i> <br />
		</p>
		<br />
		<hr />
		<br />
		<h1>Unincorporated Nonprofit</h1>
		<p>
			In the United States, Unincorporated Nonprofit Associations are governed by a hodgepodge of
			common law principles and statutes governing some of their legal aspects. The Uniform
			Unincorporated Nonprofit Association Act (UUNAA) addresses the most significant legal problems
			that arose under the common law's treatment of such associations.<sup
				><a
					href="https://www.uniformlaws.org/HigherLogic/System/DownloadDocumentFile.ashx?DocumentFileKey=a963568e-df25-c741-8ebc-e5d671789fac&forceDialog=0"
					target="_blank">1</a
				></sup
			>
		</p>
		<p>
			Therefore Infinite Tiles v2 will operates as a DAO, on the Juicebox protocol wrapped as an
			Unincorporated Nonprofit. This will enable the DAO a number of meatspace benefits including
			banking services, ownership of property, and engagement of services with other entities. The <a
				href="/gp">Guiding Principals</a
			> sets forth the initial governance and membership structure, for the Tile community to mold as
			they see fit.
		</p>
		<p>
			As there are enough unique Tiles for each Ethereum address; it may be possible that the UNA
			recieves funding perpetually. Conveniently, the entity structure, UUNAA, supports perpetual
			durations.
		</p>

		<br />
		<hr />
		<br />
		<h1>Gnosis</h1>
		<p>
			<a
				href="https://etherscan.io/address/0x4493287882f75dFFcdB40FD41d38d6308Fb8c181"
				target="_blank">0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</a
			>
		</p>
		<p>
			The initial Gnosis signers, listed to the left with their corresponding Tile, will act as
			stewards to the Tiles v2 Juicebox Project, through its NFT, and in turn its treasury.
			Additionally, the Gnosis is able to mint new Tiles as well as add additional minters to the
			Tiles v2 contract.
		</p>
		<br />
		<main class:hide={innerWidth > 650}>
			<div class="tiles-container" on:click={() => goto(`mint/${address}?animate`)}>
				<div id="tiles">
					<div class="tile">
						{@html tile}
					</div>
					<div>
						{address}
					</div>
				</div>
				<p id="address" />
			</div>
		</main>
	</section>
</SplitPane>

<style lang="scss">
	section {
		.peri-profile {
			max-width: 100%;
			display: block;
			margin: 0 auto;
		}
		caption {
			display: block;
			text-align: center;
		}
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hide {
		display: none;
	}

	/* If innerwidth less than 650, stack the flex */
	@media (max-width: 650px) {
		section:first-of-type {
			margin-bottom: 0px;
			padding-bottom: 0px;
		}

		section:last-of-type {
			margin-top: 0px;
			padding-top: 0px;
		}
	}
</style>
