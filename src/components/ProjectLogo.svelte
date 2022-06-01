<script lang="ts">
	export let uri: string;
	export let size: number | undefined = 80;
</script>

<div class="project-logo" style={`width: ${size}px; height: ${size}px`}>
	{#if uri !== ''}
		<img src={uri} alt="The project logo" />
	{:else}
		<div class="no-logo">🧃</div>
	{/if}
</div>

<style>
	img {
		max-height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.project-logo {
		overflow: hidden;
		border-radius: var(--radius-xl);
	}

	.no-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		background: var(--background-l1);
		width: 100%;
		height: 100%;
	}
</style>
