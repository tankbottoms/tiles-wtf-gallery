<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';

	export let address: string;
	export let animate: boolean = false;
	export let showAddress: boolean = true;
	export let goToMint: boolean = true;
	export let bigger = false;

	let innerWidth = browser ? window.innerWidth : 0;
	let tile = '';
	let tileComponent: HTMLElement;

	function animateTile() {
		const styles = getTileAnimationStyleString(tileComponent);
		document.head.appendChild(document.createElement('style')).innerHTML = styles;
	}

	$: {
		tile = generateTile(address);
		if (tileComponent) {
			animateTile();
		}
	}
</script>

<svelte:window bind:innerWidth />

<div
	class="tiles-container"
	on:click={goToMint ? () => goto(`/mint/${address}`) : undefined}
	class:bigger={bigger && innerWidth >= 760}
>
	<div id="tiles">
		{#if animate}
			<div class="tile" bind:this={tileComponent}>
				{@html tile}
			</div>
		{:else}
			<div class="tile">
				{@html tile}
			</div>
		{/if}
		{#if showAddress}
			<div class="address">
				{address}
			</div>
		{/if}
	</div>
</div>

<style>
	.address {
		font-size: small;
		text-align: center;
	}
	.tiles-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bigger {
		width: 100vmin;
		height: 100vmin;
		max-width: min(500px, 100vmin);
		max-height: min(500px, 100vmin);
	}
	.bigger :global(svg) {
		width: 50vmin;
		height: 50vmin;
		max-width: min(500px, 50vmin);
		max-height: min(500px, 50vmin);
	}
</style>
