<script lang="ts">
	import { onMount } from 'svelte';
	import { BigNumber, utils } from 'ethers';
	import { page } from '$app/stores';
	import { modal } from '$stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork, web3Connect } from '$stores/web3';
	import { readContract, writeContract } from '$utils/web3/contractReader';
	import { getTilePrice } from '$utils/tiles';
	import { downloadFile } from '$utils/file';
	import { pageReady, whenPageReady } from '$stores';
	import { errorMessage } from '$components/ErrorModal.svelte';
	import { parseEther } from 'ethers/lib/utils.js';
	import { createCustomNotification } from '$utils/notification';
	import Modal from '$juicebox/components/Modal.svelte';
	import { startConfetti } from '$utils/confetti';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import { useUniswapPriceQuery } from '$juicebox/utils/ERC20UniswapPrice';
	import { formattedNum } from '$juicebox/utils/formatNumber';

	enum Available {
		IS_AVAILABLE = 0,
		CAN_SEIZE = 1,
		NOT_AVAILABLE = 2
	}

	let mouseLastMoved = Date.now();

	let price = BigNumber.from(0);
	let tile: string;
	let tileComponent: any;
	let isAvailable: Available = 0;
	let availability: 'available' | 'not available' = 'available';
	let showInvalidAddress = false;
	let animate = false;

	let loading = false;
	$: address = $page.params.address?.padEnd(24, '0');
	$: token = $page.params.token?.padEnd(24, '0');
	$: symbol = $page.params.symbol;

	let balance = BigNumber.from(parseEther('10000'));
	let hasEnoughBalance = true;

	$: if (price.gt(0) && $provider) {
		(async () => {
			balance = BigNumber.from(await $provider?.getBalance($connectedAccount));
			if (balance.lt(price)) {
				hasEnoughBalance = false;
			} else {
				hasEnoughBalance = true;
			}
		})();
	}

	async function mint() {
		if (!$connectedAccount) {
			console.log('mint: account not connected');
			return await web3Connect();
		}
		try {
			if (isAvailable === Available.IS_AVAILABLE) {
				if ($page.params.address === $connectedAccount) {
					const txnResponse = await writeContract('Tiles', 'mint', [], { value: price });
					await txnResponse?.wait();
				} else {
					const txnResponse = await writeContract('Tiles', 'grab', [address], {
						value: price
					});
					await txnResponse?.wait();
				}
			} else if (isAvailable === Available.CAN_SEIZE) {
				const txnResponse = await writeContract('Tiles', 'seize', [], { value: price });
				await txnResponse?.wait();
			}
			isAvailable = Available.NOT_AVAILABLE;
			isAvailable = await checkAvailability(address);
			startConfetti();
		} catch (error) {
			createCustomNotification({
				type: 'error',
				message: error.message?.split('{')[0],
				autoDismiss: 3000
			});
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

	function animateTile() {
		const styles = getTileAnimationStyleString(tileComponent);
		document.head.appendChild(document.createElement('style')).innerHTML = styles;
	}

	function handleMove() {
		animate = false;
		mouseLastMoved = Date.now();
	}

	function checkAnimationState() {
		if (mouseLastMoved + 4000 < Date.now()) {
			animate = true;
		}
	}

	let tokenPrice = 0;

	onMount(async () => {
		loading = true;
		await whenPageReady();
		tile = generateTile(address);
		console.log('mint, init subscribing...');
		setInterval(checkAnimationState, 1000);
		// Returning so it gets unsubscribed when component is destroyed
		return readNetwork.subscribe(async () => {
			loading = true;

			try {
				const tokenPriceQueryResponse = await useUniswapPriceQuery({
					tokenAddress: token,
					tokenSymbol: symbol
				});
				tokenPrice = Number(tokenPriceQueryResponse?.WETHPrice?.toFixed(9));

				price = await getTilePrice();

				isAvailable = await checkAvailability(address);
			} catch (error) {
				console.warn(error.message);
				$errorMessage;
			}

			loading = false;
		});
	});

	$: availability = [Available.IS_AVAILABLE, Available.CAN_SEIZE].includes(isAvailable)
		? 'available'
		: 'not available';
	$: formattedPrice = Number(utils.formatEther(price));

	$: {
		if (tileComponent) {
			animateTile();
		}
	}
</script>

<svelte:window on:mousemove={handleMove} />

<section>
	{#if showInvalidAddress}
		<h1>Not a valid address</h1>
	{:else if tile}
		{#if animate}
			<span bind:this={tileComponent}>
				{@html tile}
			</span>
		{:else}
			<span>
				{@html tile}
			</span>
		{/if}
		<br />
		<p>{$page.params.address}</p>
		<p>
			{loading ? 'checking availablity...' : availability}
			{#if availability == 'not available'}
				- <a href="/mint?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">generate tiles</a>
			{/if}
		</p>
		{#if $connectedAccount}
			<button
				class="mint"
				on:click={mint}
				disabled={!$pageReady.web3 ||
					loading ||
					![Available.IS_AVAILABLE, Available.CAN_SEIZE].includes(isAvailable) ||
					!hasEnoughBalance}
			>
				Mint ({tokenPrice && formattedPrice
					? formattedNum(formattedPrice / tokenPrice, {
							precision: 5
					  })
					: '0..'}
				{symbol})
			</button>
		{:else}
			<button on:click={() => web3Connect()}>CONNECT WALLET</button>
		{/if}
		<br />
		{#if !hasEnoughBalance}
			<p>Insufficient balance</p>
		{/if}
	{/if}
</section>

<button class="download" on:click={() => downloadFile(tile, `${address}.svg`, 'image/svg')}>
	Download SVG
</button>

<Modal show={$modal} />

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
		height: calc(100vh - 85px);
		line-height: 1.3;
	}

	.download {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}
</style>
