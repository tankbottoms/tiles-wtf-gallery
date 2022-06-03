<script lang="ts">
	export let color = '#000000';
	export let bgColor = '#dddddd';
	export let icon = false;
	export let disabled = false;
	export let widthFull = false;
	export let opacity = disabled ? 0.5 : 1;
</script>

<button
	{disabled}
	class:button-icon={icon}
	class:button-text={!icon}
	class:width-full={widthFull}
	style="--color: {color}; --bg-color: {bgColor}; opacity: {opacity};"
	on:click
>
	<slot />
</button>

<style>
	button:not(:disabled) {
		cursor: pointer;
	}
	button:disabled {
		border-color: white;
		cursor: not-allowed;
	}
	button.width-full {
		width: 100%;
	}
	.button-text {
		min-width: 150px;
		line-height: 1.15;
		font-size: 16px;
		border-radius: 12px;
		padding: 1rem;
		border: 1px solid transparent;
		color: var(--color, #005dc2);
		background-color: var(--bg-color, #baceff);
	}

	.button-icon {
		border-radius: 12px;
		background: var(--bg-color);
		display: -moz-box;
		display: flex;
		-moz-box-align: center;
		align-items: center;
		-moz-box-pack: center;
		justify-content: center;
		padding: 12px;
		border: 1px solid var(--bg-color);
	}
	.button-icon > :global(img) {
		display: -moz-box;
		display: flex;
		height: 25px;
		width: 25px;
	}
</style>
