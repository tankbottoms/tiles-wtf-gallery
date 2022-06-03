<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let options: { [key: string]: any }[] = [];
	export let value = options[0]?.value;

	export let isOpen = false;
</script>

<div class="wrapper">
	<div
		class="label"
		on:click={() => {
			isOpen = !isOpen;
		}}
	>
		<slot />
	</div>
	{#if isOpen}
		<div class="dropdown" transition:slide={{ duration: 300 }}>
			<slot name="content" />
		</div>
	{/if}
</div>

<style>
	.label {
		display: flex;
		align-items: center;
	}
	.wrapper {
		cursor: pointer;
		position: relative;
	}

	.dropdown {
		position: absolute;
		margin-top: 10px;
		background: var(--background-l0);
		z-index: 900;
		box-shadow: 0 8px 12px var(--boxShadow-primary);
	}
</style>
