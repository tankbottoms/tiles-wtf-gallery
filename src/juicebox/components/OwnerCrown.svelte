<script>
	import Icon from './Icon.svelte';
	import Popover from './Popover.svelte';
	export let translateY = 0;
	export let translateX = 0;
</script>

<Popover message="Project owner" placement="right">
	<Icon name="crown" style="transform: translate({translateX}px,{translateY}px)" />
</Popover>
