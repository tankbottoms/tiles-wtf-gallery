<!-- DO NOT DELETE THIS FILE -->
<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		console.clear();
		const path = window.location.href.replace(window.location.origin, '');
		console.log('goto', path);
		goto(path, { replaceState: true });
	});
</script>
