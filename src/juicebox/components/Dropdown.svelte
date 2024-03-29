<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import clickOutsideDirective from '$juicebox/utils/clickOutside';

	export let options: { [key: string]: any }[];
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let placeholder = '';
	export let initial = undefined;
	export let value;

	let isOpen = false;

	const dispatch = createEventDispatcher();

	function selectedItem(optionValue) {
		value = optionValue;
		isOpen = false;
		dispatch('select', { value });
	}

	if (!placeholder) {
		value = initial || options[0].value;
	}

	$: selectedOption = options.find((option) => option.value === value);
</script>

<div class="custom-select">
	<div
		class={`select-selected ${size}`}
		on:click={() => {
			isOpen = !isOpen;
		}}
	>
		{selectedOption?.label || placeholder}
	</div>
	{#if isOpen}
		<div
			class="dropdown"
			transition:slide={{ duration: 300 }}
			use:clickOutsideDirective
			on:clickOutside={() => {
				isOpen = false;
			}}
		>
			{#each options as option}
				<div
					class="select-item"
					class:active={option.value === value}
					on:click={() => selectedItem(option.value)}
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.custom-select {
		width: 100%;
		position: relative;
		border: 1px solid var(--stroke-tertiary);
		border-radius: 2px;
	}

	.dropdown {
		position: absolute;
		width: 100%;
		margin-top: 1px;
		background: var(--background-l0);
		z-index: 900;
		box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
			0 9px 28px 8px rgb(0 0 0 / 5%);
	}

	.select-item {
		padding: 6px 12px;
		cursor: pointer;
	}

	.active {
		font-weight: 600;
	}
	.active,
	.select-item:hover {
		background: var(--background-l2);
	}

	.select-selected {
		background-color: transparent;
	}

	.select-selected {
		color: var(--text-secondary);
		font-weight: 400 !important;
		cursor: pointer;
	}

	.select-selected.xs {
		padding: 3px 12px;
		font-size: 11px;
	}

	.select-selected.sm {
		padding: 3px 12px;
	}

	.select-selected.md {
		padding: 4px 12px;
	}

	/* Style the arrow inside the select element: */
	.select-selected:after {
		position: absolute;
		content: '';
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-color: var(--text-primary) transparent transparent transparent;
		right: 10px;
	}

	.select-selected.xs:after {
		top: 8px;
	}

	.select-selected.sm:after {
		top: 11px;
	}

	.select-selected.md:after {
		top: 14px;
	}
</style>
