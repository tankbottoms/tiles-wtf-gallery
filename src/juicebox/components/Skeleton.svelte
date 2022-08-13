<script lang="ts">
	import { onMount } from 'svelte';

	export let loading = true;
	export let type: 'image' | 'text' = 'image';
	export let style = '';
	export let load: () => {} = null;
	export let width = '100%';
	export let height = '100%';

	onMount(async () => {
		if (typeof load === 'function') {
			await load();
			loading = false;
		}
	});
</script>

{#if loading}
	<span class="skeleton style-{type}" style="width: {width}; height: {height}; {style}" />
{:else}
	<slot />
{/if}

<style lang="scss">
	.skeleton {
		display: inline-block;
		position: relative;
		border-radius: 2px;
		animation: skeleton-animation 1s linear infinite alternate;
	}

	@keyframes skeleton-animation {
		from {
			background: #444;
		}
		to {
			background: #666;
		}
	}
</style>
