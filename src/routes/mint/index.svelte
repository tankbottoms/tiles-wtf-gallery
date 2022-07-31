<script lang="ts">
	import Icon from '$jbx/components/Icon.svelte';
	import { constants, utils } from 'ethers';
	import { onMount } from 'svelte';
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { goto } from '$app/navigation';

	const { AddressZero } = constants;

	let input: string | undefined;
	let grid = false;
	let randomTiles: any[] = [];
	let tile = '';
	let showInvalidAddress = false;

	onMount(() => {
		const randomAddresses = generateRandomAddresses(51);
		randomTiles = randomAddresses.map((address) => ({ address, tile: generateTile(address) }));
	});

	$: {
		if (utils.isAddress(input || '')) {
			console.log(input);
			tile = generateTile(input || '');
			showInvalidAddress = false;
		} else if (input !== '' && input !== undefined) {
			tile = '';
			showInvalidAddress = true;
		} else {
			tile = '';
			showInvalidAddress = false;
		}
	}
	/*
	TODO: firebase function to tweet the last tile which was minted
	*/
</script>

<section>
	<h1>Mint a Tile</h1>
	<p>Enter an 0x address to find its matching Tile, or browse the randomly generated list below.</p>
	<input placeholder={AddressZero} bind:value={input} />
</section>

<section class:grid>
	{#if tile}
		<div class="tileContainer" on:click={() => goto(`mint/${input}`)}>
			{@html tile}
			<span>{input}</span>
		</div>
	{:else if showInvalidAddress}
		<p>Not a valid address</p>
	{:else}
		{#each randomTiles as item}
			<div class="tileContainer" on:click={() => goto(`mint/${item.address}`)}>
				{@html item.tile}
				<span>{item.address}</span>
			</div>
		{/each}
	{/if}
</section>
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

<!-- TODO the social links -->
<div class="socialIcons" target="_blank">
	<a href="https://twitter.com/Tile_DAO">
		<Icon name="twitter" />
	</a>
	<a href="https://discord.gg/U3fMydKj4J" target="_blank">
		<Icon name="discord" />
	</a>
	<a href="https://github.com/tankbottoms/tiles-on-chain" target="_blank">
		<Icon name="github" />
	</a>
</div>

<style>
	section {
		margin: 0 auto;
		max-width: 360px;
		margin-top: 2.5rem;
	}

	section.grid {
		margin-top: 3.5rem;
		max-width: 1200px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
	}

	input {
		text-align: center;
		display: block;
		border: 1px solid rgb(221, 221, 221);
		border-radius: 4px;
		padding: 5px;
		width: 100%;
		box-sizing: border-box;
	}

	a {
		cursor: pointer;
	}

	p {
		text-align: center;
	}

	.socialIcons {
		position: fixed;
		bottom: 0px;
		left: 0px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.menu {
		position: fixed;
		bottom: 0px;
		right: 0px;
		padding: 10px;
		font-weight: bold;
		font-size: 1rem;
	}

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

	.tileContainer {
		color: #222;
		margin-bottom: 80px;
		text-align: center;
	}

	.tileContainer span {
		opacity: 0.25;
	}
</style>
