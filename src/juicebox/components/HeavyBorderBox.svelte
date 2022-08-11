<script>
	export let padding = '2rem';
	export let margin = '10px';

	$: style = `--padding: ${padding}; --margin: ${margin};`;
</script>

<section {style}>
	<slot />
</section>

<style>
	section {
		padding: var(--padding);
		margin-bottom: var(--margin);
		background: var(--background-l2);
		box-shadow: var(--background-l1) 10px 10px;
		border-radius: 1px;
		stroke: none;
		color: var(--text-primary);
	}
</style>
