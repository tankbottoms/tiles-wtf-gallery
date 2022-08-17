<script>
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import SplitPane from '$components/SplitPane.svelte';

	const randomAddresses = generateRandomAddresses(10);

	let tileComponent;

	let currentTile = 0;
	let address = randomAddresses[currentTile];
	let tile = generateTile(address);

	function setAddressCarousel() {
		setInterval(() => {
			address = randomAddresses[currentTile % 10];
			tile = generateTile(address);
			currentTile++;
		}, 30000);
	}

	function animateTile() {
		const styles = getTileAnimationStyleString(tileComponent);
		document.head.appendChild(document.createElement('style')).innerHTML = styles;
	}

	onMount(setAddressCarousel);

	$: {
		if (tileComponent) {
			animateTile();
		}
	}
</script>

<SplitPane>
	<section slot="left">
		{#if tile}
			<div class="tile" bind:this={tileComponent}>
				{@html tile}
				{address}
			</div>
		{/if}
	</section>
	<section slot="right">
		<h1>Faq</h1>
		<div class="space" />
		<h1>What is the ongoing purpose of the DAO?</h1>
		<p>
			TBD, however, "to encourage and reward early Juicebox community members, projects, and
			builders", sounds pretty cool.
		</p>

		<div class="space" />
		<h1>What is Tiles "grabbing"?</h1>
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
			>
		</p>

		<div class="space" />
		<h1>How are Tiles priced?</h1>
		<p>Initial mints start at 0.0001 ETH, and every 512 mints, the price doubles.</p>
		<p>
			The initial parameters were set in the <a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts#L46"
				target="_blank">deploy script</a
			>, and pricing is governed by a pricing contract - the
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol"
				>legacy ownership price resolver</a
			>.
		</p>
		<p>
			If somebody preemptively minted your address' Tile, you can reclaim it by transfering the
			current Tile rate. The smart contract calls this operation
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/InfiniteTiles.sol#L219"
				>"seizing"</a
			>.
		</p>

		<div class="space" />
		<h1>How will the treasury be managed?</h1>
		<p>
			All proceeds will be transparently managed on <a href="/dao">Juicebox.</a> The Gnosis
			<b>0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</b>
			will recieve the Juicebox Project NFT. The initial signers are listed in
			<a href="/wtf">wtf</a>, while membership to the DAO is offerred to anyone who holds Tiles2 NFT
			or the project ERC-20, the specifics of governance, if any, has not been decided.
		</p>

		<div class="space" />
		<h1>What are the Terms of Use or Licensing?</h1>
		<p>
			Tiles.wtf and its source code are under the <a
				href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/LICENSE.md"
				target="_blank">WE-PARTY license</a
			>. Use of the source code is premitted for projects which route their proceeds through the
			Juicebox v2 Treasury protocol.
		</p>

		<div class="space" />
		<h1>How can I use Tiles for token-gating?</h1>
		<p>
			An example of how to use Tiles to token-gate is available <a href="/token-gated">here</a> and
			<a
				href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/src/components/TokenGated.svelte"
				>here</a
			>.
		</p>

		<div class="space" />
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

	.tile {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
