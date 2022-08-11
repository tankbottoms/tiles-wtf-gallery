<script>
	import Icon from './Icon.svelte';
	export let info = undefined;
	export let classes = '';
</script>

<aside class={classes}>
	<div class="icon">
		<Icon name="infoCircle" />
	</div>
	<p>
		{#if info}
			{@html info}
		{/if}
		<slot />
	</p>
</aside>

<style>
	aside {
		background-color: var(--background-l1);
		padding: 20px 20px;
		font-weight: 300;
		display: flex;
		align-items: flex-start;
	}

	p {
		margin: 0;
	}

	.icon {
		margin-right: 10px;
		width: 18px;
		height: 18px;
	}

	.margin {
		margin-bottom: 32px;
	}
</style>
