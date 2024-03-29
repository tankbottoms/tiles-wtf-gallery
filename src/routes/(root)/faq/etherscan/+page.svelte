<script lang="ts">
	import { APP_CONFIG } from '$constants/app';
	import { generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import SplitPane from '$components/SplitPane.svelte';
	import Tile from '$components/Tile.svelte';
	import { getTransactionsByAddress } from '$utils/web3/contractReader';
	import { readNetwork } from '$stores/web3';
	import EtherscanLink from '$juicebox/components/EtherscanLink.svelte';

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
	<section slot="right" class="right">
		<h1>Etherscan</h1>
		<h3>Interact with Etherscan directly.</h3>
		<p>
			For individuals comfortable with executing transactions directly with Ethereum smart contracts
			on Etherscan, (provided in case an existential crisis requires you to acquire an Infinite Tile
			v2 and the front-end shits-itself). Apologies in advance.
		</p>

		<table width="100%">
			<tr>
				<th> Networks </th>
				<th colspan="1">InfiniteTiles.sol</th>
			</tr>
			<tr>
				<td> Mainnet </td>
				<td colspan="1">
					<EtherscanLink
						truncated
						type="address"
						showTooltip={false}
						value={APP_CONFIG.contract_mainnet}
					>
						{APP_CONFIG.contract_mainnet}
					</EtherscanLink>
				</td>
			</tr>
			<tr>
				<td> Rinkeby (testnet) </td>
				<td colspan="1">
					<EtherscanLink
						truncated
						type="address"
						showTooltip={false}
						value={APP_CONFIG.contract_rinkeby}
						network="rinkeby"
					>
						{APP_CONFIG.contract_rinkeby}
					</EtherscanLink>
				</td>
			</tr>
		</table>
		<br />

		<h4>How to interact with the InfiniteTiles.sol contract?</h4>

		<ul>
			<li>Visting the Etherscan contract page.</li>
			<li>From the multiple tabs on that page, "Contract" tab.</li>
			<li>From three buttons under that tab, "Write Contract"</li>
			<li>Connect your wallet via the "Connect to Web3" button.</li>
			<li>
				Here are different things you can do with contract on this page: getMintPrice, mint, grab,
				and seize.
			</li>
		</ul>

		<hr />
		<div class="space" />
		<h1>GetMintPrice.</h1>
		<p>
			Check the price of a Tile under the "Read Contract" tab by clicking on "getMintPrice". Note
			this value if in wei, you can divide this value by 10e18 to get price of a Tile in Ethereum.
		</p>
		<h4>Note:</h4>
		<p>By owning a v1 Tile, you not only are an OG but you can mint Infinite Tile v2 for free.</p>

		<hr />
		<div class="space" />
		<h1>Mint.</h1>
		<p>
			If you own a particular wallet address and want to mint a unique Tile againt that, you can
			click on 4th command "mint" from the list. it will show an input fields where you can enter
			the amount of Ethereum that you have to send to mint this Tile. Click on "Write" button to
			send the transaction.
		</p>
		<hr />
		<div class="space" />
		<h1>Grab.</h1>
		<p>
			If you do not own a particular wallet address but you want to mint a unique Tile against that
			particular address, you can click on 2nd command "grab" from the list. it will show two input
			fields, first where you can enter the amount of Ethereum that you have to send to mint this
			tile and second the address you want to mint this Tile for. Click on "Write" button to send
			the transaction.
		</p>
		<hr />
		<div class="space" />
		<h1>Seize.</h1>
		<p>
			If you own a particular wallet address and you want to mint a unique Tile againt that
			particular address but someone has already minted tile againt your wallet address, you can
			click on 10th command "seize" from the list. it will show an input fields where you can enter
			the amount of Ethereum that you have to send to seize this tile. Click on "Write" button to
			send the transaction.
		</p>
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

	.right {
		min-height: 80vh;
	}

	table {
		border: 1px solid gray;
	}
	tr {
		border-bottom: 1px solid gray;
	}
	th,
	td {
		border-left: 1px solid gray;
		padding: 0.25rem 0 0.25rem 1rem;
	}

	tr > th:first-child,
	tr > td:first-child {
		max-width: 100px;
	}
	tr > th:not(:first-child),
	tr > td:not(:first-child) {
		text-align: center;
	}
</style>
