<script>
	import Header from '$components/Header.svelte';
</script>

<Header />
<slot />

<style>
    :global(body) {
        cursor: crosshair;
    }
    :global(body, button) {
        font-family: monospace;
    }
</style>