<script>
	import Header from '$components/Header.svelte';
</script>

<Header />
<slot />

<style>
    :global(body, button) {
        font-family: monospace;
    }
</style>