<script lang="ts">
	import { onMount } from 'svelte';
	import { utils } from 'ethers';
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork } from '$stores/web3';
	import { readContractByAddress } from '$jbx/utils/web3/contractReader';
	import tileABI from '$abis/tilesAbi';
	import { getTilePrice } from '$utils/tiles';
	import { downloadFile } from '$utils/file';

	let price = 0;
	let formattedPrice = Number(utils.formatEther(price));
	let tile: string;
    let isAvailable = 0;
    let availability: string;
	let showInvalidAddress = false;
	let showInsufficientBalance = false;

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
		} else if (isAvailable == 0) {
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
		} else if (isAvailable == 1) {
            readContractByAddress(
                '0xB9c73D46357708e23B99106FBF9e26C0F0412743',
                tileABI,
                'seize',
                [{ value: utils.parseEther(`${price}`) }],
					$provider.getSigner()
				);
        }
	}

	async function checkAvailability(tile, account) {
        const tokenId = await readContractByAddress(
			'0xB9c73D46357708e23B99106FBF9e26C0F0412743',
			tileABI,
			'idForAddress',
			[tile]
		);

        if (tokenId.eq(0)) { return 0; }

        if (tile == $connectedAccount) { return 1; }

		return 2;
	}

	onMount(async () => {
		// TODO: check if legitimate address
		if (!utils.isAddress($page.params.address)) {
			showInvalidAddress = true;
		} else {
			tile = generateTile($page.params.address);
			showInvalidAddress = false;
		}

		// Returning so it gets unsubscribed when component is destroyed
		return readNetwork.subscribe(async () => {
			try {
				price = await getTilePrice(utils.parseEther('0.0001'), 2, 512); // TODO: consts
			} catch (error) {
				console.warn(error.message);
			}
		});

        isAvailable = await checkAvailability(tile, $connectedAccount);
	});

    $: availability = isAvailable < 2 ? 'Available' : 'Not available';
	$: formattedPrice = Number(utils.formatEther(price));
</script>

<section>
	{#if showInvalidAddress}
		<h1>Not a valid address</h1>
	{:else if tile}
		{@html tile}
		<p>{$page.params.address}</p>
		<p>{availability}</p>
		<button on:click={mint}>MINT ({formattedPrice} ETH)</button>
		{#if showInsufficientBalance}
			<p>Insufficient balance</p>
		{/if}
	{/if}
</section>

<button class="download" on:click={() => downloadFile(tile, 'tile.svg', 'image/svg')}>
	Download SVG
</button>

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
