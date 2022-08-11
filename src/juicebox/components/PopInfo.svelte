<script lang="ts">
	import Icon from './Icon.svelte';
	import Popover from './Popover.svelte';

	export let message: string;
	export let placement: 'right' | 'left' | 'top' | 'bottom' = 'right';
</script>

<div>
	<slot />
	<Popover {message} {placement}
		><div class="gap">
			<Icon name="questionCircle" />
		</div></Popover
	>
</div>

<style>
	div {
		display: flex;
		align-items: center;
	}
	.gap {
		transform: translateY(-2px);
		margin-left: 10px;
	}
</style>
