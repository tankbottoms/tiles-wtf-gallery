<script lang="ts">
	import { onMount } from 'svelte';
	import { BigNumber, utils } from 'ethers';
	import { page } from '$app/stores';
	import { modal } from '$stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork, web3Connect } from '$stores/web3';
	import { readContract, readContractByAddress, writeContract } from '$utils/web3/contractReader';
	import { getTilePrice } from '$utils/tiles';
	import { downloadFile } from '$utils/file';
	import { pageReady, whenPageReady } from '$stores';
	import { errorMessage } from '$components/ErrorModal.svelte';
	import { parseEther } from 'ethers/lib/utils.js';
	import { createCustomNotification } from '$utils/notification';
	import Modal from '$juicebox/components/Modal.svelte';
	import { startConfetti } from '$utils/confetti';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import Tile from '$components/Tile.svelte';
	import Footer from '$components/Footer.svelte';
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import { sleep } from '$utils/time';

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

	const historyStore = getContext('GRAB_HISTORY_STORE') as Store<{ refreshHistory: Function }>;

	async function ownsOnV1Contract(address: string) {
		const TILES_DOT_ART_MAINNET_ADDRESS = '0x64931F06d3266049Bf0195346973762E6996D764';
		const id: BigNumber = await readContractByAddress(
			TILES_DOT_ART_MAINNET_ADDRESS,
			[
				{
					inputs: [{ internalType: 'address', name: '', type: 'address' }],
					name: 'idOfAddress',
					outputs: [{ internalType: 'address', name: '', type: 'address' }],
					stateMutability: 'view',
					type: 'function'
				}
			],
			'idOfAddress',
			[address]
		);
		return Boolean(id?.gt(0));
	}

	async function mint() {
		if (!$connectedAccount) {
			console.log('mint: account not connected');
			return await web3Connect();
		}
		try {
			isAvailable = await checkAvailability(address);
			let ownsOnOriginalContract = false;
			if ($readNetwork.alias === 'mainnet') {
				try {
					ownsOnOriginalContract = await ownsOnV1Contract($connectedAccount);
				} catch (er) {
					console.log('error checking if user owns on v1 tiles contract', er);
				}
			}
			if (isAvailable === Available.IS_AVAILABLE) {
				if ($page.params.address === $connectedAccount) {
					const txnResponse = await writeContract('Tiles', 'mint', [], {
						value: ownsOnOriginalContract ? 0 : price
					});
					console.log(`mint: ${JSON.stringify(txnResponse)}`, `Tiles, mint, ${price}`);
					await txnResponse?.wait();
				} else {
					const txnResponse = await writeContract('Tiles', 'grab', [address], {
						value: ownsOnOriginalContract ? 0 : price
					});
					console.log(`grab: ${JSON.stringify(txnResponse)}`, `Tiles, grab, ${address}, ${price}`);
					await txnResponse?.wait();
				}
			} else if (isAvailable === Available.CAN_SEIZE) {
				const txnResponse = await writeContract('Tiles', 'seize', [], {
					value: ownsOnOriginalContract ? 0 : price
				});
				console.log(`seize: ${JSON.stringify(txnResponse)}`, `Tiles, seize, ${price}`);
				await txnResponse?.wait();
			}
			isAvailable = Available.NOT_AVAILABLE;
			isAvailable = await checkAvailability(address);
			startConfetti();
			await sleep(4000);
			location.reload();
		} catch (error) {
			createCustomNotification({
				type: 'error',
				message: error.message?.split('{')[0],
				autoDismiss: 3000
			});
		}
	}

	async function checkAvailability(address: string) {
		const tokenId = await readContract('Tiles', 'idForAddress', [address]);

		if (tokenId.eq(0)) {
			return 0;
		}

		if ($connectedAccount?.toLowerCase() === address?.toLowerCase()) {
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

	onMount(async () => {
		loading = true;
		await whenPageReady();
		tile = generateTile(address);
		console.log('mint, init subscribing...');
		setInterval(checkAnimationState, 1000);
		// Returning so it gets unsubscribed when component is destroyed
		return readNetwork.subscribe(() => {
			connectedAccount.subscribe(async () => {
				loading = true;

				try {
					let ownsOnOriginalContract = false;
					if ($readNetwork.alias === 'mainnet') {
						try {
							ownsOnOriginalContract = await ownsOnV1Contract($connectedAccount);
						} catch (er) {
							console.log('error checking if user owns on v1 tiles contract', er);
						}
					}
					price = ownsOnOriginalContract ? BigNumber.from(0) : await getTilePrice();
					isAvailable = await checkAvailability(address);
				} catch (error) {
					console.warn(error.message);
					$errorMessage;
				}

				loading = false;
			});
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
		<Tile {address} {animate} showAddress={false} goToMint={false} />
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
				Mint ({formattedPrice} ETH)
			</button>
			<!--
			<br />			
			<a href="/mint/{address}/holdings" class="mint"> use other tokens to mint </a>
			-->
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
<Footer />

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
		height: calc(100vh - 86px);
		line-height: 1.3;
	}

	.download {
		position: fixed;
		bottom: 1px;
		right: 10px;
	}
</style>
