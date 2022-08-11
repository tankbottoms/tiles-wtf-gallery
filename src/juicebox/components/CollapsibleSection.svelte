<script>
	import { slide } from 'svelte/transition';
	import Icon from '$juicebox/components/Icon.svelte';

	export let alignCaret = 'center';
	export let color = 'var(--text-header)';

	export let expanded = true;
</script>

<button
	style={`align-items: ${alignCaret}; color: ${color};`}
	aria-expanded={expanded}
	on:click={() => (expanded = !expanded)}
>
	<Icon name="emptyCarret" direction={expanded ? 'e' : 'n'} />
	<slot name="header" />
</button>

{#if expanded}
	<div in:slide>
		<slot />
	</div>
{/if}

<style>
	button {
		background-color: unset;
		border: none;
		border-bottom: 1px solid var(--light-body);
		display: inline-flex;
		align-items: baseline;
		width: 100%;
		margin: 0;
	}
</style>
