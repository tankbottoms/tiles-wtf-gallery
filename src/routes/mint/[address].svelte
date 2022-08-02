<script lang="ts">
	import { onMount } from 'svelte';
	import { BigNumber, utils } from 'ethers';
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork, web3Connect } from '$stores/web3';
	import { readContract, writeContract } from '$utils/web3/contractReader';
	import { getTilePrice } from '$utils/tiles';
	import { downloadFile } from '$utils/file';
	import { TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE } from '$constants/tile';
	import { pageReady } from '$stores';
	import { txnResponse } from '$components/PendingTxn.svelte';

	enum Available {
		IS_AVAILABLE = 0,
		CAN_SEIZE = 1,
		NOT_AVAILABLE = 2
	}

	let price = BigNumber.from(0);
	let tile: string;
	let isAvailable: Available = 0;
	let availability: 'Available' | 'Not available' = 'Available';
	let showInvalidAddress = false;
	let showInsufficientBalance = false;

	let loading = false;
	$: address = $page.params.address;

	async function mint() {
		if (!$provider) {
			console.log('account not connected');
			await web3Connect();
			return;
		}

		const balance = await $provider.getBalance($connectedAccount);
		// const amount = utils.formatEther(balance);

		console.log(balance?.toString(), price?.toString());
		if (balance.lt(price)) {
			showInsufficientBalance = true;
		} else if (isAvailable === Available.IS_AVAILABLE) {
			if ($page.params.address === $connectedAccount) {
				$txnResponse = await writeContract('Tiles', 'mint', [], { value: price });
			} else {
				$txnResponse = await writeContract('Tiles', 'grab', [$page.params.address], {
					value: price
				});
			}
		} else if (isAvailable === Available.CAN_SEIZE) {
			$txnResponse = await writeContract('Tiles', 'seize', [], { value: price });
		}
	}

	async function checkAvailability(address) {
		const tokenId = await readContract('Tiles', 'idForAddress', [address]);

		if (tokenId.eq(0)) {
			return 0;
		}

		if ($connectedAccount === address) {
			return 1;
		}

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
			loading = true;

			try {
				price = await getTilePrice(TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE);
				isAvailable = await checkAvailability(address);
			} catch (error) {
				console.warn(error.message);
			}

			loading = false;
		});
	});

	$: availability = [Available.IS_AVAILABLE, Available.CAN_SEIZE].includes(isAvailable)
		? 'Available'
		: 'Not available';
	$: formattedPrice = Number(utils.formatEther(price));
</script>

<section>
	{#if showInvalidAddress}
		<h1>Not a valid address</h1>
	{:else if tile}
		{@html tile}
		<p>{$page.params.address}</p>
		<p>{loading ? 'Checking availablity...' : availability}</p>
		{#if $connectedAccount}
			<button
				class="mint"
				on:click={mint}
				disabled={!$pageReady.web3 ||
					loading ||
					![Available.IS_AVAILABLE, Available.CAN_SEIZE].includes(isAvailable)}
			>
				MINT ({formattedPrice} ETH)
			</button>
		{:else}
			<button on:click={() => web3Connect()}>CONNECT WALLET</button>
		{/if}
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

	button.mint:disabled {
		cursor: not-allowed;
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
