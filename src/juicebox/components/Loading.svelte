<script lang="ts">
	import Icon from './Icon.svelte';
	export let fullHeight = false;
	export let fullWidth = false;
	export let fullScreen = false;
	export let height: number = '' as any;
	export let width: number = '' as any;
	export let size: number = '' as any;
	export let style = '';
</script>

<div
	class="loading"
	class:fullHeight
	class:fullWidth
	class:fullScreen
	style="width: {width}px !important;height: {height}px !important;{style}"
>
	<Icon name="loading" spin style="width: {size}px;" />
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
