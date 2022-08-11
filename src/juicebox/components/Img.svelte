<script lang="ts">
	export let src: string;
	export let alt = '';

	let isErrored = false;

	function handleLoad() {
		isErrored = false;
	}

	function handleError() {
		isErrored = true;
	}
</script>

{#if (isErrored || !src) && $$slots['default']}
	<slot />
{:else}
	<img {src} {alt} {...$$restProps} on:error={handleError} on:load={handleLoad} />
{/if}

<style>
	img {
		max-width: 100%;
	}
</style>
