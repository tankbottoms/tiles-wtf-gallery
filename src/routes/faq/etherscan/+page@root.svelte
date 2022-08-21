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
		<h1>Etherscan</h1>
		<h1>Introduction.</h1>
		<p>For individuals comfortable with executing transactions directlly with Ethereum smart contracts on Etherscan.  In case some existential crisis requires you to acquire an Infinite Tile v2 and the front-end is deficient. Apologies in advance.</p>				
		
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
        <p>Open up the InfiniteTiles.sol Etherscan contract above and connect your wallet.  All of these commands are under the 'Write Contract' tab.</p>
        <div class="space" />
		<hr />
		<div class="space" />
		<h1>Mint.</h1>
		<p>
			You do not have a particular Tile, you just want to mint one. This function, "mint" requires the going price, which is under "Read Contract" or number 5.
		</p>
		<p>
			
		</p>
		<div class="space" />
		<hr />
		<div class="space" />
		<h1>Grab.</h1>
		<p>
            You are an owner of a Tile and you want to get it, use "grab" or number 2, under "Write Contract". 
		</p>		
		<div class="space" />
		<hr />
		<div class="space" />
		<h1>Seize.</h1>
		<p>If a user who is not the owner of the address for a tile and you are, you can </p>
		<div class="space" />
		<hr />		
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
	
</style>
