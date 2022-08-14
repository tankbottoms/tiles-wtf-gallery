<script lang="ts">
	import { onMount } from 'svelte';
	import {
		web3Connect,
		web3Disconnect,
		provider,
		connectedAccount,
		readNetwork,
		switchNetwork
	} from '$stores/web3';
	import { getTruncatedAddress } from '$juicebox/components/Address.svelte';
	import { blocknativeNetworks } from '$juicebox/constants/networks';
	import { readContract } from '$utils/web3/contractReader';
	import { getTilePrice } from '$utils/tiles';
	import { TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE } from '$constants/tile';
	import { formatEther } from 'ethers/lib/utils.js';

	let count = '0';
	let price = '0.0000';

	onMount(async () => {
		readNetwork.subscribe(async (net) => {
			try {
				count = (await readContract('Tiles', 'totalSupply'))?.toString() || '0';
				console.log(`onMount readNetwork subscription returned. totalSupply count: ${count}`);
			} catch (e: any) {
				console.error(`onMount readNetwork subscription error: ${e}`);
				console.error(e.message);
			}
			try {
				price = formatEther(
					(await getTilePrice(TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE))?.toString() || '0'
				);
				console.log(`Tile base price: ${TILE_BASE_PRICE}`);
				console.log(`Tile multiplier: ${TILE_MULTIPLIER}`);
				console.log(`Tile tier size: ${TILE_TIER_SIZE}`);
				console.log(`Tile price:`, price);
			} catch (e: any) {
				console.error(e.message);
			}
		});

		connectedAccount.subscribe(async ($connectedAccount) => {
			if ($connectedAccount) {
				const ens = $provider && (await $provider.lookupAddress($connectedAccount));
				if (ens) {
					$connectedAccount = ens;
				}
			}
		});
	});

	let buttonElement: HTMLElement;
	let dropdownOpened = false;

	function handleWindowClick(event: MouseEvent) {
		if (dropdownOpened) {
			const target = event.target as HTMLElement;
			if (!buttonElement?.contains(target)) {
				dropdownOpened = false;
			}
		}
	}
</script>

<svelte:window on:click={handleWindowClick} />

<header>
	<div class="left">
		<a href="/">
			<img src="/favicon.svg" alt="Logo" />
		</a>
		<a class="primary-text" href="/history?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">
			{count} minted
		</a>
		// current price: {price} ETH
	</div>

	<div class="right">
		{#if $connectedAccount}
			<p
				on:click={() => (dropdownOpened = !dropdownOpened)}
				style="user-select: none"
				bind:this={buttonElement}
			>
				<span class="address">{getTruncatedAddress($connectedAccount)}({$readNetwork.alias})</span>
				{#if dropdownOpened}
					<ul class="dropdown">
						<li>{getTruncatedAddress($connectedAccount)}</li>
						{#each blocknativeNetworks as network}
							<li
								on:click={async () => {
									await switchNetwork(Number(network.id));
									dropdownOpened = false;
								}}
								class:active={$readNetwork.alias === network.alias}
							>
								{network.alias}
							</li>
						{/each}
						<li on:click={web3Disconnect}>disconnect</li>
					</ul>
				{/if}
			</p>
			<button class="disconnect" on:click={web3Disconnect}>X</button>
		{:else}
			<button on:click={web3Connect}>connect</button>
		{/if}
	</div>
</header>

<style lang="scss">
	.dropdown {
		position: absolute;
		left: 0;
		top: 100%;
		list-style: none;
		padding: 0;
		box-shadow: 0 0 5px #eee;
	}

	.dropdown li {
		cursor: pointer;
		padding: 5px 10px;
		border-bottom: 1px solid #eee;
	}
	.dropdown li.active {
		font-weight: bold;
	}
	header,
	.right,
	.left {
		display: flex;
		padding: 5px 7px;
	}

	header {
		justify-content: space-between;
	}

	.right,
	.left {
		align-items: center;
		gap: 10px;
	}

	.left a {
		/* color: inherit; */
		font-size: 14px;
		color: black;
		text-decoration: none;
		position: relative;
		border-bottom: 3px solid gold;
		&.primary-text {
			transform: translateY(1px);
			margin: 0px 10px;
		}
		&:hover {
			border-bottom: 3px solid black;
		}
	}

	.right {
		position: relative;
		justify-content: flex-end;
		span.address {
			cursor: pointer;
		}
	}

	img {
		width: 25px;
	}

	button,
	p {
		margin: 0;
		margin-left: auto;
	}

	button {
		border: none;
		background: none;
		cursor: pointer;
		padding: 0px 0px 0px 0px;
		transform: translateY(1px);
		border-bottom: 3px solid gold;
		&:hover {
			border-bottom: 3px solid black;
		}
		&.disconnect {
			/*padding: 0;*/
			position: relative;
			justify-content: flex-end;
		}
	}
</style>
