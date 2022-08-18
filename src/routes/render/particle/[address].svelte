<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;

	let canvas: HTMLCanvasElement;

	let resolution = 'low';
	let background = '#fff';
	let particleSlider: any;

	let _resolutionValue = resolution;

	onMount(() => {
		particles();
	});

	afterUpdate(() => {
		if (_resolutionValue !== resolution) {
			_resolutionValue = resolution;
			const isMobile =
				navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
			const isSmall = window.innerWidth < 1000;

			particleSlider.ptlGap = isMobile || isSmall ? 3 : resolution === 'low' ? 1 : 0;
			particleSlider.ptlSize = isMobile || isSmall ? 3 : resolution === 'low' ? 2 : 3;
		}
	});

	function particles() {
		const isMobile =
			navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
		const isSmall = window.innerWidth < 1000;

		const context = canvas.getContext('2d');
		context.fillStyle = 'red';
		context.fillRect(0, 0, window.innerWidth, window.innerHeight);

		particleSlider = new window['ParticleSlider']({
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
	<div class="controls" class:dark={background === '#000'}>
		<div>
			<label for="checkbox">Background</label>
			<span>
				<input type="radio" name="background" value="#000" bind:group={background} /> dark
			</span>
			<span>
				<input type="radio" name="background" value="#fff" bind:group={background} /> light
			</span>
		</div>
		<div class="">
			<label for="checkbox">Particle size</label>
			<span>
				<input type="radio" name="resolution" value="low" bind:group={resolution} /> low
			</span>
			<span>
				<input type="radio" name="resolution" value="high" bind:group={resolution} /> high
			</span>
		</div>		
	</div>
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
	.controls {
		margin-top: 100px;
		font-size: 1rem;
		z-index: 10;
		&.dark {
			color: white;
		}
	}
	.draw {
		margin-top: -100px;
	}
</style>
