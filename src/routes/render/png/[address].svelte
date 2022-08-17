<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;

	let imageElement: HTMLImageElement;
	let canvasElement: HTMLCanvasElement;

	let pngImageAddress = '';

	// onMount(async () => {
	// 	await new Promise((r) => setTimeout(r, 1000));

	// });
	function onLoad() {
		console.log(imageElement);
		canvasElement.width = imageElement.naturalWidth;
		canvasElement.height = imageElement.naturalHeight;
		const context = canvasElement.getContext('2d');
		context.drawImage(imageElement, 0, 0);
		const imgData = canvasElement.toDataURL('image/png');
		pngImageAddress = imgData;
	}
</script>

<main>
	{#if pngImageAddress}
		<img class="png-image" src={pngImageAddress} alt={address} in:fade />
	{:else}
		<img
			class="svg-image"
			src={tileBase64}
			alt={address}
			bind:this={imageElement}
			on:load={onLoad}
		/>
		<canvas
			class="canvas-convert-svg-to-png"
			width="360px"
			height="360px"
			bind:this={canvasElement}
		/>
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		margin: 0;
		padding: 0;
		background: #ffffff;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.svg-image,
	.canvas-convert-svg-to-png {
		position: fixed;
		top: -40000px;
		left: -40000px;
	}
</style>
