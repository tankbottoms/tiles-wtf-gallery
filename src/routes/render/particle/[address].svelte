<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	$: tileBase64 = `data:image/svg+xml;base64,${btoa(tile)}`;
</script>

<main>
	<iframe
		src="https://cloudflare-ipfs.com/ipfs/bafybeifkqnc5d2jqrotfx4dz3ye3lxgtaasqfh2exnar5incy35nbwlbrm/?resolution=low&tile={tileBase64}"
		title="Tiles Animation"
		frameborder="0"
		width="360"
		height="360"
	/>
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
</style>
