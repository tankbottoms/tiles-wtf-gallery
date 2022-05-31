<script>
	import Header from '$components/Header.svelte';
</script>

<Header />
<slot />

<style>
    :global(body) {
        font-family: monospace;
    }
</style>