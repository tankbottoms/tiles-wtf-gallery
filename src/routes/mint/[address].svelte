<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { BigNumber, utils } from 'ethers';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork } from '$stores/web3';
	import { readContractByAddress } from '$jbx/utils/web3/contractReader';

	const tileABI = [
		{
			inputs: [],
			name: 'mint',
			outputs: [
				{
					internalType: 'uint256',
					name: 'mintedTokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'tile',
					type: 'address'
				}
			],
			name: 'grab',
			outputs: [
				{
					internalType: 'uint256',
					name: 'mintedTokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		},
		{
			inputs: [],
			name: 'totalSupply',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			name: 'idForAddress',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'id',
					type: 'uint256'
				}
			],
			name: 'ownerOf',
			outputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'seize',
			outputs: [
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		}
	];
	let price = 0;
	let formattedPrice = Number(utils.formatEther(price));
	let tile: string;
    let isAvailable = false;
    let availability: string;
	let showInvalidAddress = false;
	let showInsufficientBalance = false;

	async function getPrice(basePrice, multiplier, tierSize) {
		const currentSupply = await readContractByAddress(
			'0xB9c73D46357708e23B99106FBF9e26C0F0412743',
			tileABI,
			'totalSupply'
		);
		const expectedPrice = currentSupply.div(tierSize).mul(multiplier).mul(basePrice);
		if (expectedPrice.eq(0)) {
			return basePrice;
		}

		return expectedPrice;
	}

	async function mint() {
		if (!$provider) {
			console.log('account not connected');
			// TODO: prompt to connect
			return;
		}

		const balance = await $provider.getBalance($connectedAccount);
		const amount = utils.formatEther(balance);

		if (Number(amount) < formattedPrice) {
			showInsufficientBalance = true;
		} else {
			if ($page.params.address == $connectedAccount) {
				readContractByAddress(
					'0xB9c73D46357708e23B99106FBF9e26C0F0412743',
					tileABI,
					'mint',
					[{ value: utils.parseEther(`${price}`) }],
					$provider.getSigner()
				);
			} else {
				readContractByAddress(
					'0xB9c73D46357708e23B99106FBF9e26C0F0412743',
					tileABI,
					'grab',
					[$page.params.address, { value: utils.parseEther(`${price}`) }],
					$provider.getSigner()
				);
			}
			// TODO: seize
		}
	}

	async function checkAvailability(tile, account) {
        if (tile == $connectedAccount) { return true; }

        const tokenId = await readContractByAddress(
			'0xB9c73D46357708e23B99106FBF9e26C0F0412743',
			tileABI,
			'idForAddress',
            [tile]
		);

        if (tokenId.eq(0)) { return true; }

		return false;
	}

	function download() {
		const blob = new Blob([tile], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'tile.svg';
		link.click();
		window.URL.revokeObjectURL(url);
	}

	onMount(async () => {
		// Check if legitimate address
		if (!utils.isAddress($page.params.address)) {
			showInvalidAddress = true;
		} else {
			tile = generateTile($page.params.address);
			showInvalidAddress = false;
		}
		readNetwork.subscribe(async (net) => {
			try {
				price = await getPrice(utils.parseEther('0.0001'), 2, 512); // TODO: consts
			} catch (error) {
				console.log(error.message);
			}
		});

        isAvailable = await checkAvailability(tile, $connectedAccount);
	});

    $: availability = isAvailable ? 'Available' : 'Not available';
	$: formattedPrice = Number(utils.formatEther(price));
</script>

<section>
	{#if showInvalidAddress}
		<h1>Not a valid address</h1>
	{:else if tile}
		{@html tile}
		<p>{$page.params.address}</p
		<p>{availability}</p>
		<button on:click={mint}>MINT ({formattedPrice} ETH)</button>
		{#if showInsufficientBalance}
			<p>Insufficient balance</p>
		{/if}
	{/if}
</section>

<button class="download" on:click={download}> Download SVG </button>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
		border-bottom: 3px solid gold;
		padding: 0px;
		margin-top: 20px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 100px);
		line-height: 1.3;
	}

	.download {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}
</style>
