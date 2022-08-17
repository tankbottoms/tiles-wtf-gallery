<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';

	$: address = $page.params.address;
	$: tile = generateTile(address);

	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;

	function particles(node: HTMLElement) {
		const isMobile =
			navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
		const isSmall = window.innerWidth < 1000;

		new window['ParticleSlider']({
			ptlGap: isMobile || isSmall ? 3 : 1,
			ptlSize: isMobile || isSmall ? 3 : 2,
			width: 1e9,
			height: 1e9
		});
	}
</script>

<main id="particle-slider">
	<div class="slides">
		<div id="first-slide" class="slide" data-src={tileBase64} use:particles />
	</div>
	<canvas class="draw" />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		margin: 0;
		padding: 0;
		background: #000;
		width: 100vw;
		height: 100vh;
	}
</style>
