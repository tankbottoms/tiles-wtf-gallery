<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;
	
</script>

<main>
	<img src="{tileBase64}" alt="{address}"/>
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
	}
</style>
