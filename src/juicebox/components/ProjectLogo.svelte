<script lang="ts">
	import Img from './Img.svelte';

	export let uri: string;
	export let size: number | undefined = 80;
</script>

<div class="project-logo" style={`width: ${size}px; height: ${size}px; flex: 0 0 ${size}px;`}>
	{#if typeof uri === 'string'}
		<Img src={uri} alt="The project logo">
			<div class="no-logo">🧃</div>
		</Img>
	{:else}
		<div class="no-logo">🧃</div>
	{/if}
</div>

<style>
	.project-logo :global(img) {
		min-width: 100%;
		max-height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.project-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 110px;
		width: 110px;
		border-radius: 1px;
	}

	.no-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		background: var(--background-l1);
		width: 80%;
		height: 80%;
	}
</style>
