<!-- DO NOT DELETE THIS FILE -->
<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(window.location.pathname, { replaceState: true });
	});
</script>
