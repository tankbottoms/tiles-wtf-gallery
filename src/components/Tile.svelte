<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';

	export let address: string;
	export let animate: boolean = false;
	export let showAddress: boolean = true;

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

<div
	class="tiles-container"
	on:click={() => goto(`mint/${address}`)}
	style="transform: scale({Math.min(1, (innerWidth - 50) / 360)});"
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
</style>
