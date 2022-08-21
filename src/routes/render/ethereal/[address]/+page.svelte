<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';
	import { getTileAnimationStyleString } from '$tiles/utils';

	let tileComponent: HTMLElement;

	$: address = $page.params.address;
	$: tile = generateTile(address);

	function animateTile() {
		const styles = getTileAnimationStyleString(tileComponent);
		document.head.appendChild(document.createElement('style')).innerHTML = styles;
	}

	onMount(animateTile);
</script>

<main>
	<div bind:this={tileComponent}>
		{@html tile}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		margin: 0;
		padding: 0;
		background: #fefdfb;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
