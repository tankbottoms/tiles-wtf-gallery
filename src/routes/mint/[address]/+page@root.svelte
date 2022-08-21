<script lang="ts">
	import { onMount } from 'svelte';
	import { APP_CONFIG } from '$constants/app';
	import { BigNumber, constants, utils } from 'ethers';
	import { page } from '$app/stores';
	import { modal } from '$stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { connectedAccount, provider, readNetwork, web3Connect } from '$stores/web3';
	import { readContract, readContractByAddress, writeContract } from '$utils/web3/contractReader';
	import { getTilePrice } from '$utils/tiles';
	import { downloadFile } from '$utils/file';
	import { pageReady, whenPageReady } from '$stores';
	import ErrorModal, { errorMessage } from '$components/ErrorModal.svelte';
	import { parseEther } from 'ethers/lib/utils.js';
	import { createCustomNotification } from '$utils/notification';
	import Modal from '$juicebox/components/Modal.svelte';
	import { startConfetti } from '$utils/confetti';
	import { getTileAnimationStyleString } from '$tiles/utils';
	import Tile from '$components/Tile.svelte';
	import Footer from '$components/Footer.svelte';
	import { sleep } from '$utils/time';
	import EtherscanLink from '$juicebox/components/EtherscanLink.svelte';

	type Available = {
		availability: boolean;
		reason: '' | 'CAN_MINT' | 'CAN_SEIZE' | 'CAN_GRAB' | 'OWNER' | 'TAKEN';
	};

	let mouseLastMoved = Date.now();

	let price = BigNumber.from(0);
	let tile: string;
	let tileComponent: any;
	let isAvailable: Available = { availability: false, reason: '' };
	let showInvalidAddress = false;
	let animate = false;

	let loading = false;
	$: address = $page.params.address?.padEnd(24, '0');

	let balance = BigNumber.from(parseEther('10000'));
	let hasEnoughBalance = true;
	let seizeFrom = '';

	$: connectedUser = $connectedAccount;

	$: if (price.gt(0) && $provider) {
		(async () => {
			balance = BigNumber.from(await $provider?.getBalance(connectedUser));
			if (balance.lt(price)) {
				hasEnoughBalance = false;
			} else {
				hasEnoughBalance = true;
			}
		})();
	}

	async function checkAvailability(address: string): Promise<Available> {
		seizeFrom = '';
		let ownsOnOriginalContract = false;
		if ($readNetwork.alias === 'mainnet') {
			try {
				ownsOnOriginalContract = await ownsOnV1Contract(address);
			} catch (er) {
				console.log('error checking if user owns on v1 tiles contract', er);
			}
		}

		let tokenId: BigNumber = BigNumber.from(0);
		let v2Owner: string = '';
		try {
			tokenId = await readContract('Tiles', 'idForAddress', [address]);
			if (tokenId?.gt(0)) {
				v2Owner = await readContract('Tiles', 'ownerOf', [tokenId]);
			}
			price = ownsOnOriginalContract ? BigNumber.from(0) : await getTilePrice();
		} catch (e) {}

		if (address?.toLowerCase() === $connectedAccount?.toLowerCase()) {
			if (tokenId?.gt(0)) {
				if (v2Owner?.toLowerCase() === $connectedAccount?.toLowerCase()) {
					return { availability: true, reason: 'OWNER' };
				}
				seizeFrom = v2Owner;
				return { availability: true, reason: 'CAN_SEIZE' };
			} else {
				return { availability: true, reason: 'CAN_MINT' };
			}
		} else {
			if (tokenId?.gt(0)) {
				if (v2Owner?.toLowerCase() === $connectedAccount?.toLowerCase()) {
					return { availability: true, reason: 'OWNER' };
				}
				return { availability: false, reason: 'TAKEN' };
			} else {
				return { availability: true, reason: 'CAN_GRAB' };
			}
		}
	}

	async function ownsOnV1Contract(address: string) {
		const id: BigNumber = await readContractByAddress(
			APP_CONFIG.contract_mainnet_v1,
			[
				{
					inputs: [{ internalType: 'address', name: '', type: 'address' }],
					name: 'idOfAddress',
					outputs: [{ internalType: 'address', name: '', type: 'uint256' }],
					stateMutability: 'view',
					type: 'function'
				}
			],
			'idOfAddress',
			[address]
		);
		return Boolean(id?.gt(0));
	}

	let minting = false;
	async function mint() {
		minting = true;
		if (!connectedUser) {
			console.log('mint: account not connected, try connecting');
			return await web3Connect();
		}
		try {
			isAvailable = await checkAvailability(address);
			let ownsOnOriginalContract = false;
			if ($readNetwork.alias === 'mainnet') {
				try {
					ownsOnOriginalContract = await ownsOnV1Contract(address);
				} catch (er) {
					console.log('error checking if user owns on v1 tiles contract', er);
				}
			}

			const price = ownsOnOriginalContract ? BigNumber.from(0) : await getTilePrice();

			let tokenId: BigNumber = BigNumber.from(0);
			let v2Owner: string = '';
			try {
				tokenId = await readContract('Tiles', 'idForAddress', [address]);
				if (tokenId?.gt(0)) {
					v2Owner = await readContract('Tiles', 'ownerOf', [tokenId]);
				}
			} catch (e) {}

			if (address?.toLowerCase() === $connectedAccount?.toLowerCase()) {
				if (tokenId?.gt(0)) {
					if (v2Owner?.toLowerCase() === $connectedAccount?.toLowerCase()) {
						throw Error('you already own this tile');
					}
					const txnResponse = await writeContract('Tiles', 'seize', [], {
						value: price
					});
					console.log(`seize: ${JSON.stringify(txnResponse)}`, `Tiles, seize, ${price}`);
					await txnResponse?.wait();
				} else {
					const txnResponse = await writeContract('Tiles', 'mint', [], {
						value: price
					});
					console.log(`mint: ${JSON.stringify(txnResponse)}`, `Tiles, mint, ${price}`);
					await txnResponse?.wait();
				}
			} else {
				if (tokenId?.gt(0)) {
					if (v2Owner?.toLowerCase() === $connectedAccount?.toLowerCase()) {
						throw Error('you already own this tile');
					}
					throw Error('this tile has already been minted by another user');
				} else {
					console.log(`mint, can grab, minting ${address}, ${price}`);
					const txnResponse = await writeContract('Tiles', 'grab', [address], {
						value: price
					});
					console.log(`grab: ${JSON.stringify(txnResponse)}`, `Tiles, grab, ${address}, ${price}`);
					await txnResponse?.wait();
				}
			}
			isAvailable = { availability: false, reason: '' };
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
		minting = false;
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

	let ownsOnOriginalContract = false;

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
					if ($readNetwork.alias === 'mainnet') {
						try {
							ownsOnOriginalContract = await ownsOnV1Contract(address);
							console.log(
								`ownsofv1:${ownsOnOriginalContract}, if so check which tile they are minting`
							);
						} catch (er) {
							console.log('error checking if user owns on v1 tiles contract', er);
						}
					}
					price = ownsOnOriginalContract ? BigNumber.from(0) : await getTilePrice();
					isAvailable = await checkAvailability(address);
					console.log(`is available:${JSON.stringify(isAvailable)}, price:${price}`);
				} catch (error) {
					console.warn(error.message);
					$errorMessage;
				}

				loading = false;
			});
		});
	});

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
			<!--unconnected shows already owned -->
			{loading
				? 'Checking availablity...'
				: isAvailable.availability
				? isAvailable.reason === 'OWNER'
					? 'already owner'
					: 'available'
				: 'not available'}
			{#if (!isAvailable.availability || isAvailable.reason === 'OWNER') && isAvailable.reason !== ''}
				- <a href="/mint?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">generate tiles</a>
			{:else if !loading && seizeFrom}
				(seize from <EtherscanLink
					truncated={true}
					type="address"
					showTooltip={false}
					value={seizeFrom || constants.AddressZero}
				/>)
			{/if}
		</p>
		{#if connectedUser}
			{#if minting}
				<button class="mint" on:click|preventDefault disabled={true}>
					Minting ({formattedPrice} ETH)
				</button>
			{:else}
				<button
					class="mint"
					on:click={mint}
					disabled={minting ||
						!$pageReady.web3 ||
						loading ||
						!isAvailable.availability ||
						!hasEnoughBalance ||
						isAvailable.reason === 'OWNER'}
				>
					Mint ({formattedPrice} ETH)
				</button>
			{/if}
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
