<script lang="ts">
	import Icon from './Icon.svelte';
	export let fullHeight = false;
	export let fullWidth = false;
	export let fullScreen = false;
	export let height: number = '' as any;
</script>

<div class="loading" class:fullHeight class:fullWidth class:fullScreen style="height: {height}px;">
	<Icon name="loading" spin />
</div>

<style>
	.loading {
		text-align: center;
		font-size: 2rem;
		color: var(--text-header);
	}
	.loading {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	.loading.fullHeight {
		height: 100%;
	}
	.loading.fullWidth {
		width: 100%;
	}
	.loading.fullScreen {
		width: 100%;
		height: 100vh;
	}
</style>
