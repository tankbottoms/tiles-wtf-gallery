<script>
	import { generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import SplitPane from '$components/SplitPane.svelte';
	import Tile from '$components/Tile.svelte';

	const randomAddresses = generateRandomAddresses(12);

	let currentTile = 3;
	let currentAnimatedTile = 0;
	const tileAddresses = {
		address1: randomAddresses[0],
		address2: randomAddresses[1],
		address3: randomAddresses[2]
	};

	function setAddressCarousel() {
		setInterval(() => {
			[currentTile, currentTile + 1, currentTile + 2].forEach((i) => {
				tileAddresses[`address${i + 1}`] = randomAddresses[i];
			});
			currentTile += (currentTile + 3) % 12;
		}, 45000);

		setInterval(() => {
			currentAnimatedTile = (currentAnimatedTile + 1) % 3;
		}, 15000);
	}

	onMount(setAddressCarousel);
</script>

<SplitPane>
	<section slot="left">
		<!-- {#each Object.keys(tileAddresses) as address, index}
			<Tile {address} animate={currentAnimatedTile === index} />
		{/each} -->
		<Tile address={tileAddresses.address1} animate={currentAnimatedTile === 0} />
		<br />
		<br />
		<Tile address={tileAddresses.address2} animate={currentAnimatedTile === 1} />
		<br />
		<br />
		<Tile address={tileAddresses.address3} animate={currentAnimatedTile === 2} />
	</section>
	<section slot="right">
		<h1>Faq</h1>
		<h1>Addresses.</h1>
		<p>
			IPFS: <a
				href="https://cloudflare-ipfs.com/ipfs/QmYScBzncx9kqEFRrZtPjWWPpqvLFZP2cBS7iWdoCDaQzd"
				target="'_blank">QmYScBzncx9kqEFRrZtPjWWPpqvLFZP2cBS7iWdoCDaQzd</a
			>
		</p>				
		<p>Ethereum:  <a href="" target="_blank">Rinkeby</a>, <a href="" target="_blank">Mainnet </a></p>
		<div class="space" />		
		<hr />
		<div class="space" />
		<h1>Governance.</h1>
		<p>			
			TBD, however, "to encourage and reward early Juicebox community members, projects, and
			builders", sounds pretty cool.			
		</p>
		<p>
			All proceeds will be transparently managed on <a href="/dao">Juicebox</a>. <i>At an unspecified point in the future</i>, the Gnosis
			<a href="https://etherscan.io/address/0x4493287882f75dFFcdB40FD41d38d6308Fb8c181" target="_blank">0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</a> will recieve the <a href="https://juicebox.money/v2/p/175" target="_blank">Juicebox Project NFT</a>. The initial signers are listed in
			<a href="/wtf">wtf,</a> while membership to the DAO is offered to anyone who holds Tiles2 NFT or the project ERC-20, the specifics of governance, if any, has not been decided. There may be no meaningful purpose in a DAO or governance if the decision to route payments to Juicebox projects with some set of criteria or some use of proceeds which renders such decisions cumbersome. 
		</p>
		<div class="space" />		
		<hr />
		<div class="space" />
		<h1>Pricing function.</h1>
		<p>Initial mints start at 0.0001 ETH, and every 512 mints, the price doubles.</p>
		<p>
			The original
			<a
				href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764"
				target="_blank"
				>Infinite Tiles
			</a>
			owners mint for free; the smart contract calls this operation
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/InfiniteTiles.sol#L181"
				target="_blank">"grabbing".</a
			>  The initial parameters were set in the <a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts#L46"
				target="_blank">deploy script</a
			>, and pricing is governed by a pricing contract - the
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol"
				>legacy ownership price resolver</a
			>.					
			If somebody preemptively minted your address' Tile, you can reclaim it by transfering the
			current Tile rate. The smart contract refers to this operation as
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/InfiniteTiles.sol#L219"
				>"seizing"</a
			>.				
		</p>		
		<div class="space" />
		<hr />		
		<div class="space" />
		<h1>Terms of Use.</h1>
		<p>
			Tiles.wtf and its source code are under the <a
				href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/LICENSE.md"
				target="_blank">we-party license</a
			>. Use of the source code is premitted for projects which route their proceeds through the
			Juicebox v2 Treasury protocol.
		</p>
		<div class="space" />		
		<hr />
		<div class="space" />
		<h1>Use Tiles.</h1>
		<p>
			An example of how to use Tiles to token-gate is available <a href="/token-gated">here</a> and
			<a
				href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/src/components/TokenGated.svelte"
				>here</a
			>.  You can use Tiles to token-gate IRL using <a href="https://gatekeep.it/" target="_blank">Gatekeeper</a>.
		</p>				
		<p>
			Tiles can be used on your site for a profile picture or just decorative imagery for contracts,
			for example, the animations <a
				href="/render/ethereal/0x8a97426C1a720a45B8d69E974631f01f1168232B"
				target="_blank">ethereal</a
			> <i>(/render/ethereal/:address)</i>, and
			<a href="/render/particle/0x8a97426C1a720a45B8d69E974631f01f1168232B" target="_blank"
				>particle</a
			> <i>(/render/particle/:address)</i>; or static images 
			<a href="/render/png/0x8a97426C1a720a45B8d69E974631f01f1168232B">png</a> <i>(/render/png/:address)</i>, and
			<a href="/render/svg/0x8a97426C1a720a45B8d69E974631f01f1168232B">svg</a> <i>(/render/svg/:address)</i>.
		</p>
		<p>
			<a
				class="example"
				href="https://tiles.wtf/render/ethereal/0x8a97426C1a720a45B8d69E974631f01f1168232B"
				target="_blank"
				>tiles.wtf/render/ethereal/0x8a974...232B</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/particle/0x8a97426C1a720a45B8d69E974631f01f1168232B"
				target="_blank"
				>tiles.wtf/render/particle/0x8a974...232B</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/png/0x8a97426C1a720a45B8d69E974631f01f1168232B"
				target="_blank">tiles.wtf/render/png/0x8a974...232B</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/svg/0x8a97426C1a720a45B8d69E974631f01f1168232B"
				target="_blank">tiles.wtf/render/svg/0x8a974...232B</a
			>
		</p>		
	</section>
</SplitPane>

<style>
	.space {
		display: block;
		height: 0.25em;
	}

	p {
		margin-bottom: 1em;
	}

	a {
		word-break: break-all;
		display: inline-block;
	}

	a.example {
		margin-bottom: 0.5em;
	}
</style>
