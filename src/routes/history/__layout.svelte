<script lang="ts">
	import { getTruncatedAddress } from '$juicebox/components/Address.svelte';

	import Loading from '$juicebox/components/Loading.svelte';
	import { connectedAccount, readNetwork, web3Connect } from '$stores/web3';
	import { generateTile } from '$tiles/tilesStandalone';
	import type Store from '$utils/Store';
	import { getTilesHistory } from '$utils/tiles';
	import type { ethers } from 'ethers';
	import moment from 'moment';
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';

	$: userAddress = $page.params.address;

	let grid = true;
	let tiles: {
		address: string;
		tile: string;
		timestamp: number;
		blockNumber: number;
	}[] = [];

	const grabHistory = getContext('GRAB_HISTORY_STORE') as Store<{
		loading: boolean;
		transactions: ethers.providers.TransactionResponse[];
		grabHistory: GrabHistoryItem[];
	}>;

	function update(userAddress: string) {
		grabHistory.subscribe(({ grabHistory }) => {
			let _tiles = grabHistory.map(({ address, ...rest }) => ({
				address,
				tile: generateTile(address),
				...rest
			}));
			if (userAddress) {
				_tiles = _tiles.filter(
					({ caller }) => caller?.toLowerCase() === userAddress?.toLowerCase()
				);
			}
			tiles = _tiles;
		});
	}
	$: update(userAddress);

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<main>
	<section>
		<h3>mint history</h3>
	</section>

	<section class:grid>
		{#if $connectedAccount}
			{#if $grabHistory.loading}
				<Loading />
			{:else if tiles?.length}
				{#each tiles as item}
					<div class="tileContainer">
						<div class="image">
							{@html item.tile}
						</div>
						<span class="address">
							{#if innerWidth < 370}
								{getTruncatedAddress(item.address)}
							{:else}
								{item.address}
							{/if}
						</span>
						{#if item.timestamp}
							{#await moment(item.timestamp * 1000) then date}
								<div class="timestamp">{date.format('LLL')}</div>
							{/await}
						{/if}
					</div>
				{/each}
			{:else}
				<p>shockingly nothing has been minted, or something is wrong.</p>
			{/if}
		{:else}
			<p>
				connect to a wallet to see history <a href={null} on:click={web3Connect}>connect wallet</a>
			</p>
		{/if}
	</section>
</main>

<div class="menu">
	<div
		class="menuItem"
		on:click={() => {
			window.scrollTo(0, 0);
		}}
		style={'margin-bottom: 10px'}
	>
		^
	</div>
	<div
		class="menuItem"
		class:menuActive={grid}
		on:click={() => {
			grid = true;
		}}
	>
		+
	</div>
	<div
		class="menuItem"
		class:menuActive={!grid}
		on:click={() => {
			grid = false;
		}}
	>
		-
	</div>
</div>

<style lang="scss">
	main {
		max-width: 100vw;
		overflow-x: hidden;
	}
	section {
		margin: 0 auto;
		max-width: 360px;
		margin-top: 2.5rem;
	}

	h3 {
		text-align: center;
	}

	section.grid {
		margin-top: 3.5rem;
		max-width: 1200px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
	}
	.tileContainer {
		color: #222;
		margin-bottom: 80px;
		text-align: center;
		display: flex;
		max-width: 100vw;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.image {
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: calc(100vw - 20px);
		> :global(svg) {
			max-width: 100%;
		}
	}
	p {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}

	.menu {
		position: fixed;
		bottom: 0px;
		right: 0px;
		padding: 10px;
		font-weight: bold;
		font-size: 1rem;
		.menuActive {
			cursor: default;
			opacity: 0.4;
		}

		.menuItem {
			cursor: pointer;
			background: rgb(34, 34, 34);
			color: white;
			padding: 5px;
		}
	}
</style>
