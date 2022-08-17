<script lang="ts">
	import { goto } from '$app/navigation';

	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import { onMount } from 'svelte';

	let tile = '';
	let address = '';
	let animate = false;
	let mouseLastMoved = Date.now();
	let tileComponent: HTMLElement;

	let currentTile = 1;
	let timer;

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
			address = initialSigners[currentTile % 6];
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
		tile = generateTile(initialSigners[0]);
		// setAddressCarousel();
		// Check if it's been 4s since the last move
		// setInterval(() => checkAnimationState(), 1000);

		let current = 1;
		setInterval(() => {
			address = initialSigners[current % 6];
			tile = generateTile(address);
			current++;
		}, 1000);
	});

	let innerWidth = 0;

	$: {
		if (tileComponent) {
			animateTile();
		}
	}
</script>

<svelte:window bind:innerWidth on:mousemove={handleMove} />

<div class="wrapper">
	<section>
		<img
			class="peri-profile"
			width="360"
			src="https://cloudflare-ipfs.com/ipfs/QmaM1m53J2qwEa5Gu3XNW8xryPbkNpMp42Wc984WtZj9iU"
			alt="@peri profile with Tile background with nipple"
		/>
		<caption
			><a href="https://twitter.com/peripheralist">@peripheralist</a>, presumably on a warm relaxing
			day, contemplating life, the universe, ∞ and everything</caption
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
	<section>
		<h1>wtf?</h1>
		<p>
			<a href="https://github.com/tankbottoms/tiles-on-chain">infinite tiles v2</a> is a
			reversed-engineered implementation of @peripheralist’s
			<a href="https://github.com/TileDAO">Tiles</a>, without any api-service. the entire svg tile
			is created and served from the ethereum blockchain in solidity.
		</p>
		<p>
			the minting and <a href="/dao">tiles juicebox treasury</a> experience here were implemented
			with svelte in typescript. the
			<a href="https://github.com/tankbottoms/tiles-on-chain">tiles-v2-nft</a>
			and
			<a href="https://github.com/tankbottoms/tiles-wtf-gallery">tiles-v2-gallery</a> github repos
			together seek to further decentralize the
			<a
				href="https://snapshot.org/#/jbdao.eth/proposal/0x122ec83036d4ed2379c98ed6c566666256169aac1ee4316f60da24bd768c7ff6"
				target="_blank">juicebox protocol</a
			>.
		</p>
		<p>
			this project is an homage to the venerable @peripheralist: the genius artist, designer,
			developer, grapher, person. <i>"all hail @peripheralist,"</i> <br />
		</p>
		<br />
		<hr />
		<br />
		<h1>unincorporated nonprofit</h1>
		<p>
			in the United States, unincorporated nonprofit associations are governed by a hodgepodge of
			common law principles and statutes governing some of their legal aspects. the Uniform
			Unincorporated Nonprofit Association Act (UUNAA) addresses the most significant legal problems
			that arose under the common law's treatment of such associations.<sup
				><a
					href="https://www.uniformlaws.org/HigherLogic/System/DownloadDocumentFile.ashx?DocumentFileKey=a963568e-df25-c741-8ebc-e5d671789fac&forceDialog=0"
					target="_blank">1</a
				></sup
			>
		</p>
		<p>
			therefore infinite tiles v2 will operates as a dao, on the juicebox protocol wrapped as an
			unincorporated nonprofit. this will enable the community a number of meatspace benefits
			including banking services, ownership of property, and engagement of services. the <a
				href="/gp">guiding principals</a
			> sets forth the initial governance and membership structure, for the community to mold as they
			see fit.
		</p>
		<p>
			as there are enough unique tiles for each ethereum address; it may be possible that the una
			recieves funding perpetually. conveniently this entity structure supports perpetual durations.
		</p>

		<br />
		<hr />
		<br />
		<h1>gnosis</h1>
		<a
			href="https://etherscan.io/address/0x4493287882f75dFFcdB40FD41d38d6308Fb8c181"
			target="_blank">0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</a
		>
		<p>
			following initial gnosis signers will steward the tiles v2 juicebox project, and in turn its
			treasury
		</p>
		<br />
		<main class:hide={innerWidth > 650}>
			<div
				class="tiles-container"
				on:click={() => goto(`mint/${address}?animate`)}
				style="transform: scale({Math.min(1, (innerWidth - 50) / 560)});"
			>
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
</div>

<style lang="scss">
	section {
		max-width: 540px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin-top: 10vh;
		.peri-profile {
			display: block;
			margin: 0 auto;
		}
		caption {
			display: block;
			text-align: center;
		}
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
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
		.wrapper {
			flex-direction: column;
		}

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
