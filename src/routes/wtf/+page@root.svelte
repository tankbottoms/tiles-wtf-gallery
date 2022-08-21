<script lang="ts">
	import { APP_CONFIG } from '$constants/app';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import SplitPane from '$components/SplitPane.svelte';
	import Tile from '$components/Tile.svelte';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import { getTruncatedAddress } from '$juicebox/components/Address.svelte';
	import { onMount } from 'svelte';

	const initialSigners = [
		'0x5d95baEBB8412AD827287240A5c281E3bB30d27E',
		'0x63a2368f4b509438ca90186cb1c15156713d5834',
		'0x823b92d6a4b2aed4b15675c7917c9f922ea8adad',
		'0xe7879a2d05dba966fcca34ee9c3f99eee7edefd1',
		'0x4823e65c10daa3ef320e5e262cfa8d0a059e02a6',
		'0x5566b7cb1cccb3e147084cf971d6dda770a3c90f'
	];

	let address = initialSigners[0];
	let animate = false;
	let mouseLastMoved = Date.now();

	let currentTile = 1;
	let timer: NodeJS.Timeout;

	function setAddressCarousel() {
		timer = setInterval(() => {
			address = initialSigners[currentTile % initialSigners.length];
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
		// Check if it's been 4s since the last move
		setInterval(() => checkAnimationState(), 1000);
	});

	let innerWidth = browser ? window.innerWidth : 0;
</script>

<svelte:window bind:innerWidth on:mousemove={handleMove} />

<SplitPane>
	<section slot="left">
		<img
			class="peri-profile"
			width="360"
			style="transform: scale({Math.min(1, (innerWidth - 50) / 360)});"
			src="images/QmaM1m53J2qwEa5Gu3XNW8xryPbkNpMp42Wc984WtZj9iU.png"
			alt="@peripheralist (@peri) - profile with a Tile background accented with nipple, preserved for all time https://cloudflare-ipfs.com/ipfs/QmaM1m53J2qwEa5Gu3XNW8xryPbkNpMp42Wc984WtZj9iU"
		/>
		<caption
			><a href="https://twitter.com/peripheralist">@peripheralist</a>, Presumably on a warm relaxing
			day, contemplating life, the universe, ∞ and everything.</caption
		>
		<br />
		<br />
		<main class:hide={innerWidth < 650}>
			<Tile {address} {animate} />
		</main>
	</section>
	<section slot="right">
		<h1>Wtf?</h1>
		<p>
			<a href="https://github.com/tankbottoms/tiles-on-chain">Infinite Tiles v2</a> is a
			reversed-engineered implementation of
			<a href="https://twitter.com/peripheralist">@peripheralist</a>'s
			<a href="https://github.com/TileDAO">Tiles</a>, without any api-service support. The
			<a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics" target="_blank">SVG</a> Tile,
			attributes metadata is completely generated and served from the Ethereum blockchain. The
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/components/TileContentProvider.sol#L61"
				target="_blank">Tile's artwork algorithm</a
			> is computed entirely in Solidity.
		</p>
		<p>
			The Infinite Tiles v2 contracts are verified on Etherscan at <a
				href="https://etherscan.io/address/{APP_CONFIG.contract_mainnet}#code"
				target="_blank">{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>.
		</p>
		<p>
			The Tile minting and <a href="/dao">Juicebox Treasury</a> applications are implemented with
			<a href="https://kit.svelte.dev/" target="_blank">Svelte</a>
			in <a href="https://www.typescriptlang.org/">Typescript</a>. Github repos
			<a href="https://github.com/tankbottoms/tiles-on-chain">tiles-v2-nft</a>
			and
			<a href="https://github.com/tankbottoms/tiles-wtf-gallery">tiles-v2-gallery</a> combined seek
			to further decentralization the
			<a
				href="https://snapshot.org/#/jbdao.eth/proposal/0x122ec83036d4ed2379c98ed6c566666256169aac1ee4316f60da24bd768c7ff6"
				target="_blank">Juicebox v2 protocol</a
			>.
		</p>
		<p>
			This project is an homage to the venerable @peripheralist: the genius artist, designer,
			developer, grapher, person. <i>"all hail @peripheralist"</i> <br />
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
			The Infinite Tiles v2 DAO (TilesDAO2), coupled with the Juicebox v2 Treasury, wrapped by the
			Unincorporated Nonprofit Association entity structure provide the legal foundation for this
			project. As there are enough unique Tiles for each Ethereum address; it may be possible that
			the UUNAA recieves funding perpetually; therefore meatspace communities would benefit from
			banking services, ownership of property, and/or engagement of services with other entities. To
			this end, Infinite Tiles v2 DAO has set forth the <a href="/gp">Guiding Principals</a> establishing
			an initial governance and membership structure, for the Tile's community to mold as they see fit.
		</p>

		<br />
		<hr />
		<br />
		<h1>Gnosis</h1>
		<p>
			<a href="https://etherscan.io/address/{APP_CONFIG.gnosis_mainnet}" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.gnosis_mainnet)}</a
			>
		</p>
		<p>
			The proposed initial Gnosis signers, (listed to the left with their corresponding Tile), are
			intended to serve as stewards to the Tiles v2 Juicebox community, through the NFT, and in turn
			its treasury. Through the Gnosis, the signers may appoint minters who are able to generate new
			Tiles, in hopes of spreading goodwill and interests exapanding the community.
		</p>
		<br />
		<main class:hide={innerWidth > 650}>
			<Tile {address} {animate} />
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
