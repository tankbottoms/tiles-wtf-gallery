<script>
	import Icon from './Icon.svelte';
</script>

<p>
	<Icon name="questionCircle" />
	<slot />
</p>

<style>
	p {
		font-weight: 300;
		color: var(--text-warn);
	}
</style>
