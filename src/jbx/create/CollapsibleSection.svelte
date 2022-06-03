<script>
	import { slide } from 'svelte/transition';
	import Icon from '$jbx/components/Icon.svelte';

	export let alignCaret = 'center';

	export let expanded = true;
</script>

<button
	style={`align-items: ${alignCaret}`}
	aria-expanded={expanded}
	on:click={() => (expanded = !expanded)}
>
	<Icon name="caret" direction={expanded ? 'e' : 'n'} />
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
		color: var(--text-header);
		display: inline-flex;
		align-items: baseline;
		width: 100%;
		margin: 0;
	}
</style>
