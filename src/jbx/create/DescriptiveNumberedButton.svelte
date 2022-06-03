<script>
	import Icon from '$jbx/components/Icon.svelte';
	export let description;
	export let disabled = false;
	export let number;
	export let onClick;
	export let title;
	export let visited;
</script>

<div role="button" class:disabled class:visited on:click={!disabled && onClick}>
	<div class="number">{number}</div>
	<div class="details">
		<div class="title">{title}</div>
		<div class="description">
			{description}
		</div>
	</div>
	<div class="icon">
		{#if visited}
			<Icon name="checkCircle" />
		{:else}
			<Icon name="caret" />
		{/if}
	</div>
</div>

<style>
	.icon {
		align-self: center;
		margin-left: auto;
		fill: var(--text-action-primary);
		width: 15px;
		height: 15px;
		/* padding-left: 20px; */
	}

	.number {
		margin-right: 15px;
	}

	.description {
		color: var(--text-primary);
		font-weight: 300;
		font-size: 0.75rem;
		margin-top: 10px;
	}

	div[role='button'] {
		display: flex;
		cursor: pointer;
		padding: 15px;
		border-radius: 1px;
		font-weight: 500;
		color: var(--text-action-primary);
		border-color: var(--text-action-primary);
		border-style: solid;
		border-width: 1px;
		margin-bottom: 16px;
	}

	div[role='button'].disabled {
		cursor: not-allowed;
	}

	div[role='button'].visited {
		color: var(--text-tertiary);
		border-color: var(--text-tertiary);
	}

	div[role='button'].visited .description {
		color: var(--text-tertiary);
	}

	/* div[role="button"].visited svg {
    fill: var(--text-tertiary);
  } */
</style>
