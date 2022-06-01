<script lang="ts">
	import Icon from '$components/Icon.svelte';
	/**
	 * Flag to center on full page
	 */
	export let center = false;
	export let icon = 'exclamationCircle';
	export let showIcon = true;
</script>

<div class="error" class:center>
	<p>
		{#if showIcon}
			<Icon name={icon} />
		{/if}
		<slot />
	</p>
</div>

<style>
	.center {
		width: 100vw;
		text-align: center;
	}

	.error {
		width: 100%;
		color: var(--text-failure);
	}
</style>
