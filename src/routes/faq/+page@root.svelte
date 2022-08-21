<script lang="ts">
	import { APP_CONFIG } from '$constants/app';
	import { generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import SplitPane from '$components/SplitPane.svelte';
	import Tile from '$components/Tile.svelte';
	import { getTransactionsByAddress } from '$utils/web3/contractReader';

	const randomAddresses = generateRandomAddresses(12);

	let currentTile = 3;
	let currentAnimatedTile = 0;
	const tileAddresses = {
		address1: randomAddresses[0],
		address2: randomAddresses[1],
		address3: randomAddresses[2]
	};

	function getTruncatedAddress(address: string, a = 6, b = 6) {
		return address && address.startsWith('0x')
			? `${address.slice(0, a)}...${address.slice(-b)}`
			: address;
	}

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
				href="https://ipfs.fleek.co/ipfs/Qmcw5mXkwEkxuu282qWU9zcbMaczpx8cjdQJKFAUbNTxti/"
				target="'_blank">Qmcw5mXkwEkxuu282qWU9zcbMaczpx8cjdQJKFAUbNTxti</a
			>
		</p>
		<p>
			Contracts Rinkeby InfiniteTiles.sol <a
				href="https://rinkeby.etherscan.io/address/{APP_CONFIG.contract_rinkeby}#code"
				target="_blank">{getTruncatedAddress(APP_CONFIG.contract_rinkeby)}</a
			>
			Mainnet TilesContentProvider.sol
			<a
				href="https://etherscan.io/address/{APP_CONFIG.contract_tiles_content_provider}#code"
				target="_blank">{getTruncatedAddress(APP_CONFIG.contract_tiles_content_provider)}</a
			>
			InfiniteTiles.sol
			<a href="https://etherscan.io/address/{APP_CONFIG.contract_mainnet}#code" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>
		</p>
		<p><a href="/faq/etherscan" target="_blank">Instructions on how to mint, grab, seize</a> directly with the InfiniteTiles.sol <a href="https://etherscan.io/address/{APP_CONFIG.contract_mainnet}#code" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)} on Etherscan.</a
			></p>
		<p>
			Opensea <a href="https://opensea.io/collection/infinite-tiles-v2-0" target="_blank"
				>Inifinite Tiles v2</a
			>
			Looksrare
			<a href="https://looksrare.org/collections/{APP_CONFIG.contract_mainnet}" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>
			Raribles
			<a href="https://rarible.com/collection/{APP_CONFIG.contract_mainnet}" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>
			Gem
			<a href="https://www.gem.xyz/collection/infinite-tiles-2-0-v2/?all=true" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>
			Mint.fun
			<a href="https://mint.fun/{APP_CONFIG.contract_mainnet}" target="_blank"
				>{getTruncatedAddress(APP_CONFIG.contract_mainnet)}</a
			>
		</p>
		<div class="space" />
		<hr />
		<div class="space" />
		<h1>Governance.</h1>
		<p>
			TBD, however, "to encourage and reward early Juicebox community members, projects, and
			builders", sounds pretty cool.
		</p>
		<p>
			All proceeds are transparently managed on <a href="/dao">Juicebox</a>.
			<i>At an unspecified point in the future</i>, the Gnosis
			<a
				href="https://etherscan.io/address/0x3A31414dFbA8B20D3bDa767092984db9d98a2da1"
				target="_blank">{getTruncatedAddress('0x3A31414dFbA8B20D3bDa767092984db9d98a2da1')}</a
			>
			will recieve the
			<a href="https://juicebox.money/v2/p/175" target="_blank">Tiles Juicebox Project NFT</a>. The
			initial signers are listed in
			<a href="/wtf">wtf,</a> while membership to the DAO is offered to anyone who holds Tiles2 NFT or
			its project ERC-20, the specifics of governance, if any, has not been decided. There may be no
			meaningful purpose in a DAO or governance if the decision to route payments to Juicebox projects
			with some set of criteria or some use of proceeds which renders such decisions cumbersome.
		</p>
		<div class="space" />
		<hr />
		<div class="space" />
		<h1>Pricing function.</h1>
		<p>
			Initial mints start at 0.001 ETH, and every 512 mints, the price doubles. The original
			<a
				href="https://etherscan.io/address/0x4ddeF8Fc8EEE89848b4A802CEF9FC9E72B8674A4"
				target="_blank"
				>Infinite Tiles
			</a>
			owners mint for free; the smart contract calls this operation
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/InfiniteTiles.sol#L181"
				target="_blank">"grabbing".</a
			>
			The initial parameters were set in the
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts#L46"
				target="_blank">deploy script</a
			>, and pricing is governed by a pricing contract - the
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol"
				>legacy ownership price resolver</a
			>. If somebody preemptively minted your address' Tile, you can reclaim it by paying the Tile's
			contract the current Tile rate. The smart contract refers to this operation as
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/InfiniteTiles.sol#L219"
				>"seizing"</a
			>.
		</p>
		<p>
			For example, {getTruncatedAddress('0x67a5a5136ba1725359bfdf204cbbb1c809cc5490')} minted {getTruncatedAddress(
				'0x5d95baebb8412ad827287240a5c281e3bb30d27e'
			)}'s tile. Thus {getTruncatedAddress('0x5d95baebb8412ad827287240a5c281e3bb30d27e')} was entitled
			to "seize" this tile which was done at
			<a
				href="https://etherscan.io/tx/0xf49c1994f9639560bc83ee7cabff483bb66295592ba69d7daca02ce0d8d03377"
				target="blank">transaction 0xf49c...3377</a
			>, as designed {getTruncatedAddress('0x67a5a5136ba1725359bfdf204cbbb1c809cc5490')} was not compensated.
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
		<h1>Activity feeds.</h1>
		<p>
			The Juicebox treasury hosted on Tiles.wtf has an activity feed which understands how to parse
			the SVG from the route provided to the pay contract, thus each minted tile is shown. However,
			on Juicebox.money, this is not the case as their activity feed expects a PNG file without any
			HTTP response. We will, of course, ask them to support this nuance.
		</p>
		<div class="space" />
		<h1>Render Tiles.</h1>
		<p>
			Tiles may be used to token-gate content, an example can be found <a href="/token-gated"
				>here</a
			>
			and
			<a
				href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/src/components/TokenGated.svelte"
				>here</a
			>. Tiles may be used to token-gate IRL events using
			<a href="https://gatekeep.it/" target="_blank">Gatekeeper</a>. Expect something like this to
			occur.
		</p>
		<p>
			Tiles are perfect for profile pictures and decorative imagery for contracts. Tiles.wtf
			provides routes to render addresses for use in your applications. The subtle Tile animations
			are
			<a href="/render/ethereal/{randomAddresses[0]}" target="_blank">ethereal</a>
			<i>(/render/ethereal/:address)</i>, and
			<a href="/render/particle/{randomAddresses[0]}" target="_blank">particle</a>
			<i>(/render/particle/:address)</i>; and static images formats are
			<a href="/render/png/{randomAddresses[0]}">png</a> <i>(/render/png/:address)</i>, and
			<a href="/render/svg/{randomAddresses[0]}">svg</a> <i>(/render/svg/:address)</i>.
		</p>
		<!--<p>
			<a
				class="example"
				href="https://tiles.wtf/render/ethereal/{randomAddresses[0]}"
				target="_blank">tiles.wtf/render/ethereal/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/particle/{randomAddresses[0]}"
				target="_blank">tiles.wtf/render/particle/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a class="example" href="https://tiles.wtf/render/png/{randomAddresses[0]}" target="_blank"
				>tiles.wtf/render/png/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a class="example" href="https://tiles.wtf/render/svg/{randomAddresses[0]}" target="_blank"
				>tiles.wtf/render/svg/{getTruncatedAddress(randomAddresses[0])}</a
			>
		</p>-->
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
