<script lang="ts">
	import Icon from './Icon.svelte';

	export let disabled = false;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let type:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'danger'
		| 'success'
		| 'warning'
		| 'info'
		| 'light'
		| 'link'
		| 'dark' = 'primary';
	export let loading = false;
	export let buttonProps: any = {};
	export let fullWidth = false;
	export let fullWidthMobile = false;
</script>

<button
	class={`${size} ${type}`}
	class:fullWidth
	class:fullWidthMobile
	disabled={disabled || loading}
	{...buttonProps}
	on:click
	><slot />
	{#if loading}
		<Icon name="loading" spin />
	{/if}
</button>

<style>
	button {
		background: var(--background-action-primary);
		border-color: transparent;
		/* box-shadow: 0 6px 10px rgba(19, 13, 13, 0.08); */
		border-radius: var(--radius-sm);
		color: var(--text-over-action-primary);
		font-weight: 500;
		font-size: 16px;
		cursor: pointer;
	}
	button[disabled] {
		background: var(--background-disabled);
		border-color: var(--stroke-disabled);
		color: var(--text-disabled);
		cursor: not-allowed;
	}

	.fullWidth {
		width: 100%;
	}
	/* button:hover {
		box-shadow: 0 8px 12px rgb(0 0 0 / 12%);
	} */

	.sm {
		min-height: 26px;
		font-size: 0.7rem;
		padding: 0px 10px;
		margin-top: 0;
	}

	.md {
		min-height: 32px;
		font-size: 14px;
		font-weight: 500;
		padding: 0px 20px;
		margin-top: 0;
	}

	.lg {
		min-height: 40px;
		padding: 6.4px 15px;
	}

	.secondary {
		background: transparent;
		color: var(--text-over-action-secondary);
		border: 1px solid var(--stroke-action-secondary);
	}

	.secondary:hover {
		color: var(--background-action-primary);
		border: 1px solid var(--background-action-primary);
		transition: all 0.5s ease-in-out;
	}

	.tertiary {
		background: transparent;
		color: var(--background-action-primary);
		box-shadow: unset;
		border: 1px dashed var(--background-action-secondary);
		font-weight: 400;
		width: 100%;
	}

	.tertiary:hover {
		border: 1px dashed var(--background-action-primary);
		box-shadow: unset;
	}
	.link {
		border: none;
		background: transparent;
		box-shadow: unset;
		margin: 0;
		display: inline;
		height: unset;
		padding: unset;
		color: var(--text-action-secondary);
		font-size: inherit;
	}

	.link:hover {
		color: var(--text-action-highlight);
		box-shadow: none;
	}

	@media (max-width: 767px) {
		.fullWidthMobile {
			width: 100%;
		}
	}
</style>
