<!-- DO NOT DELETE THIS FILE -->
<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(window.location.href.replace(window.location.origin, ''), { replaceState: true });
	});
</script>
