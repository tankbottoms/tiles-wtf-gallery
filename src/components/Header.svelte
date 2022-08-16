<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		web3Connect,
		web3Disconnect,
		connectedAccount,
		readNetwork,
		switchNetwork
	} from '$stores/web3';
	import { getTruncatedAddress } from '$juicebox/components/Address.svelte';
	import { blocknativeNetworks } from '$juicebox/constants/networks';
	import { getTilePrice } from '$utils/tiles';
	import { TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE } from '$constants/tile';
	import { formatEther } from 'ethers/lib/utils.js';
	import type Store from '$utils/Store';
	import type { ethers } from 'ethers';

	const grabHistory = getContext('GRAB_HISTORY_STORE') as Store<{
		loading: boolean;
		transactions: ethers.providers.TransactionResponse[];
		grabHistory: GrabHistoryItem[];
	}>;

	let count = '0';
	let price = '0.0000';

	onMount(async () => {
		grabHistory.subscribe(async ({ grabHistory }) => {
			try {
				count = grabHistory
					.filter((item) => item.caller?.toLowerCase() === $connectedAccount?.toLowerCase())
					?.length?.toString();

				console.log(`subscription returned.`);
				console.log(`totalSupply count: ${count}`);
			} catch (e: any) {
				console.error(`subscription error: ${e}`);
				console.error(e.message);
			}
		});

		readNetwork.subscribe(async () => {
			console.error(`onMount readNetwork`);

			try {
				price = formatEther(
					(await getTilePrice(TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE))?.toString() || '0'
				);
				console.log(`tile base price: ${TILE_BASE_PRICE}`);
				console.log(`tile multiplier: ${TILE_MULTIPLIER}`);
				console.log(`tile tier size: ${TILE_TIER_SIZE}`);
				console.log(`tile price:`, price);
			} catch (e: any) {
				console.error(e.message);
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
	let innerWidth = 0;
</script>

<svelte:window on:click={handleWindowClick} bind:innerWidth />

<header>
	<div class="left">
		<a class="logo-wrapper" href="/?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">
			<img src="/favicon.svg" alt="Logo" />
		</a>
		<a
			class="primary-text"
			href="/history/{$connectedAccount || ''}?{$readNetwork
				? `network=${$readNetwork?.alias}`
				: ''}"
		>
			{#if innerWidth < 650}
				{count}
			{:else}
				{count} minted
			{/if}
		</a>
		{#if innerWidth < 650}
			// {price}
		{:else}
			// current price: {price} ETH
		{/if}
	</div>

	<div class="right">
		{#if $connectedAccount}
			<p
				on:click={() => (dropdownOpened = !dropdownOpened)}
				style="user-select: none"
				bind:this={buttonElement}
			>
				<span class="address">
					<span>{getTruncatedAddress($connectedAccount, 5, 2)}</span>
					{#if innerWidth >= 650}<span>({$readNetwork.alias})</span>{/if}
				</span>
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
		z-index: 10;
		right: 2rem;
		top: 100%;
		list-style: none;
		padding: 0;
		box-shadow: 0 0 5px #eee;
		background: var(--background-l0);
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
		&.primary-text {
			border-bottom: 3px solid gold;
			transform: translateY(1px);
			margin: 0px 10px;
			&:hover {
				border-bottom: 3px solid black;
			}
		}
	}

	.right {
		position: relative;
		justify-content: flex-end;
		span.address {
			cursor: pointer;
			color: var(--text-primary);
			display: inline-flex;
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
