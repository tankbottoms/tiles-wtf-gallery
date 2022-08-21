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
		<p>Ethereum: <a href="https://rinkeby.etherscan.io/address/0xb8AD6515C5635b754259584b90959b3b1F47b7CC#code" target="_blank">Rinkeby:{getTruncatedAddress('0xb8AD6515C5635b754259584b90959b3b1F47b7CC')}</a>, <a href="https://etherscan.io/address/0x4ddeF8Fc8EEE89848b4A802CEF9FC9E72B8674A4#readContract" target="_blank"> Mainnet:{getTruncatedAddress('0x4ddeF8Fc8EEE89848b4A802CEF9FC9E72B8674A4')} </a></p>
		<p>Etherscan: <a href="https://etherscan.io/address/{APP_CONFIG.contract_mainnet}#code">{APP_CONFIG.contract_mainnet}</a></p>
		<p>Opensea: <a href="https://opensea.io/collection/infinite-tiles-v2" target="_blank">Inifinite Tiles v2</a></p>
		<p>Looksrare: <a href="https://looksrare.org/collections/{APP_CONFIG.contract_mainnet}" target="_blank">{APP_CONFIG.contract_mainnet}</a></p>
		<!--							
		<p><a href="https://ipfs.io/ipfs/bafybeifkqnc5d2jqrotfx4dz3ye3lxgtaasqfh2exnar5incy35nbwlbrm/?resolution=low&tile=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmRldi9zdmdqcyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjM2MCIgaWQ9IlN2Z2pzU3ZnMTAwMCI+PHJlY3Qgd2lkdGg9IjM2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmYWYzZTgiIC8+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwzMCwzMCkiPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwwKSI+PHBhdGggZD0iTTAgMEwwIDEwMEgxMDBDMTAwIDQ0Ljc3MTUgNTUuMjI4NSAwIDAgMFoiIGZpbGw9IiMxQTQ5RUYiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMDAsMCkiPjxwYXRoIGQ9Ik0wIDEwMEgxMDBMMCAwVjEwMFoiIGZpbGw9IiNGRTQ0NjUiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwyMDAsMCkiPjxwYXRoIGQ9Ik0wIDEwMEgxMDBMMCAwVjEwMFoiIGZpbGw9IiNGRTQ0NjUiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDEwMCkiPjxwYXRoIGQ9Ik0xMDAgMEgwTDEwMCAxMDBWMFoiIGZpbGw9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMDAsMTAwKSI+PHBhdGggZD0iTTUwIDBDNTAgMjcuNjE0MiA3Mi4zODU4IDUwIDEwMCA1MFYwSDUwWiIgZmlsbD0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDIwMCwxMDApIj48cGF0aCBkPSJNMCAwQzAgNTUuMjI4NSA0NC43NzE1IDEwMCAxMDAgMTAwQzEwMCA0NC43NzE1IDU1LjIyODUgMCAwIDBaIiBmaWxsPSIjMUE0OUVGIiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwyMDApIj48cGF0aCBkPSJNMTAwIDEwMEwxMDAgMEgwQzAgNTUuMjI4NSA0NC43NzE1IDEwMCAxMDAgMTAwWiIgZmlsbD0iI0Y4RDkzOCIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDEwMCwyMDApIj48cGF0aCBkPSJNMCAxMDBMMCAwSDEwMEMxMDAgNTUuMjI4NSA1NS4yMjg1IDEwMCAwIDEwMFoiIGZpbGw9IiNGRTQ0NjUiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwyMDAsMjAwKSI+PHBhdGggZD0iTTEwMCAwTDEwMCAxMDBIMEMwIDQ0Ljc3MTUgNDQuNzcxNSAwIDEwMCAwWiIgZmlsbD0iI0ZFNDQ2NSIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiPjxwYXRoIGQ9Ik0wIDBDMCA1NS4yMjg1IDQ0Ljc3MTUgMTAwIDEwMCAxMDBDMTAwIDQ0Ljc3MTUgNTUuMjI4NSAwIDAgMFoiIGZpbGw9IiNGOEQ5MzgiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMDAsMCkiPjxwYXRoIGQ9Ik0wIDEwMEMwIDQ0Ljc3MTUgNDQuNzcxNSAwIDEwMCAwQzEwMCA1NS4yMjg1IDU1LjIyODUgMTAwIDAgMTAwWiIgZmlsbD0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDIwMCwwKSI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNGOEQ5MzgiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwwKSIgIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDEwMCkiPjxwYXRoIGQ9Ik01MCAxMDBDNTAgNzIuMzg1OCA3Mi4zODU4IDUwIDEwMCA1MFYxMDBINTBaIiBmaWxsPSIjRjhEOTM4IiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTAwLDEwMCkiPjxwYXRoIGQ9Ik0wIDBIMTAwTDAgMTAwVjBaIiBmaWxsPSIjRkU0NDY1IiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMjAwLDEwMCkiPjxwYXRoIGQ9Ik0xMDAgMEwxMDAgMTAwSDBDMCA0NC43NzE1IDQ0Ljc3MTUgMCAxMDAgMFoiIGZpbGw9IiNGOEQ5MzgiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDIwMCkiPjxwYXRoIGQ9Ik0wIDEwMEwwIDBIMTAwQzEwMCA1NS4yMjg1IDU1LjIyODUgMTAwIDAgMTAwWiIgZmlsbD0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDEwMCwyMDApIj48cGF0aCBkPSJNMCAwQzAgNTUuMjI4NSA0NC43NzE1IDEwMCAxMDAgMTAwQzEwMCA0NC43NzE1IDU1LjIyODUgMCAwIDBaIiBmaWxsPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMjAwLDIwMCkiPjxwYXRoIGQ9Ik0wIDBMMCAxMDBIMTAwQzEwMCA0NC43NzE1IDU1LjIyODUgMCAwIDBaIiBmaWxsPSIjRjhEOTM4IiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwzMDApIj48Y2lyY2xlIHI9Ijk1LjAwMDAwIiBmaWxsPSIjZmFmM2U4IiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2U9IiNmYWYzZTgiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTUwLDUwKSI+PGNpcmNsZSByPSI0NS4wMDAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlPSIjZmFmM2U4IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiPjxwYXRoIGQ9Ik01MCAxMDBDNTAgNzIuMzg1OCAyNy42MTQyIDUwIDAgNTBWMTAwSDUwWiIgZmlsbD0iI0ZFNDQ2NSIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDEwMCwwKSI+PHBhdGggZD0iTTAgMEwwIDEwMEgxMDBDMTAwIDQ0Ljc3MTUgNTUuMjI4NSAwIDAgMFoiIGZpbGw9IiMxQTQ5RUYiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwyMDAsMCkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIiBmaWxsPSIjMjIyIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDMwLDMwKSIgIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDEwMCkiPjxwYXRoIGQ9Ik0wIDBDMCA1NS4yMjg1IDQ0Ljc3MTUgMTAwIDEwMCAxMDBDMTAwIDQ0Ljc3MTUgNTUuMjI4NSAwIDAgMFoiIGZpbGw9IiMxQTQ5RUYiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMDAsMTAwKSI+PHBhdGggZD0iTTAgMTAwQzAgNDQuNzcxNSA0NC43NzE1IDAgMTAwIDBDMTAwIDU1LjIyODUgNTUuMjI4NSAxMDAgMCAxMDBaIiBmaWxsPSIjMUE0OUVGIiBzdHlsZT0ib3BhY2l0eTogMC44ODsiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMjAwLDEwMCkiPjxwYXRoIGQ9Ik0wIDEwMEwwIDBIMTAwQzEwMCA1NS4yMjg1IDU1LjIyODUgMTAwIDAgMTAwWiIgZmlsbD0iI0ZFNDQ2NSIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMjAwKSI+PHBhdGggZD0iTTUwIDBDNTAgMjcuNjE0MiAyNy42MTQyIDUwIDAgNTBWMEg1MFoiIGZpbGw9IiNGRTQ0NjUiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwxMDAsMjAwKSI+PHBhdGggZD0iTTEwMCAwSDBMMTAwIDEwMFYwWiIgZmlsbD0iIzFBNDlFRiIgc3R5bGU9Im9wYWNpdHk6IDAuODg7IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDIwMCwyMDApIj48cGF0aCBkPSJNMTAwIDEwMEgwTDEwMCAwVjEwMFoiIGZpbGw9IiMxQTQ5RUYiIHN0eWxlPSJvcGFjaXR5OiAwLjg4OyIgLz48L2c+PC9nPjwvZz48L3N2Zz4=" target="_blank">Particle animation</a></p>
		<p><a href="https://tiles.wtf/render/ethereal/0x5d95baEBB8412AD827287240A5c281E3bB30d27E" target="_blank">Ethereal animation</a></p>
		-->
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
			<a href="https://etherscan.io/address/0x3A31414dFbA8B20D3bDa767092984db9d98a2da1" target="_blank">{getTruncatedAddress('0x3A31414dFbA8B20D3bDa767092984db9d98a2da1')}</a> will recieve the <a href="https://juicebox.money/v2/p/175" target="_blank">Juicebox Project NFT</a>. The initial signers are listed in
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
				href="https://etherscan.io/address/0x4ddeF8Fc8EEE89848b4A802CEF9FC9E72B8674A4"
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
				href="/render/ethereal/{randomAddresses[0]}"
				target="_blank">ethereal</a
			> <i>(/render/ethereal/:address)</i>, and
			<a href="/render/particle/{randomAddresses[0]}" target="_blank"
				>particle</a
			> <i>(/render/particle/:address)</i>; or static images 
			<a href="/render/png/{randomAddresses[0]}">png</a> <i>(/render/png/:address)</i>, and
			<a href="/render/svg/{randomAddresses[0]}">svg</a> <i>(/render/svg/:address)</i>.
		</p>
		<p>
			<a
				class="example"
				href="https://tiles.wtf/render/ethereal/{randomAddresses[0]}"
				target="_blank"
				>tiles.wtf/render/ethereal/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/particle/{randomAddresses[0]}"
				target="_blank"
				>tiles.wtf/render/particle/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/png/{randomAddresses[0]}"
				target="_blank">tiles.wtf/render/png/{getTruncatedAddress(randomAddresses[0])}</a
			>
			<a
				class="example"
				href="https://tiles.wtf/render/svg/{randomAddresses[0]}"
				target="_blank">tiles.wtf/render/svg/{getTruncatedAddress(randomAddresses[0])}</a
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
