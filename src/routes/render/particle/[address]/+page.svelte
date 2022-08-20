<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;

	let canvas: HTMLCanvasElement;

	$: search = browser ? new URLSearchParams(location.search) : new URLSearchParams('');
	$: background = search.get('bg') === 'dark' ? '#000' : '#fff';
	$: resolution = search.get('resolution') === 'high' ? 'high' : 'low';

	onMount(() => {
		particles();
	});

	function particles() {
		const isMobile =
			navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
		const isSmall = window.innerWidth < 1000;

		const context = canvas.getContext('2d');
		context.fillStyle = 'red';
		context.fillRect(0, 0, window.innerWidth, window.innerHeight);

		new window['ParticleSlider']({
			ptlGap: isMobile || isSmall ? 3 : resolution === 'low' ? 1 : 0,
			ptlSize: isMobile || isSmall ? 3 : resolution === 'low' ? 2 : 1,
			width: 1e9,
			height: 1e9
		});
	}
</script>

<svelte:head>
	<title>Tile</title>
	<link rel="icon" href={tileBase64} />
</svelte:head>

<main id="particle-slider" style="background: {background};">
	<div class="slides">
		<div id="first-slide" class="slide" data-src={tileBase64} />
	</div>
	<canvas class="draw" bind:this={canvas} />
</main>

<style lang="scss">
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
		flex-direction: column;
		align-items: center;
	}
</style>
