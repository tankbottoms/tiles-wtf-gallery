<script lang="ts">
	export let title = '';
	export let expanded = false;
	export let titleColor = '';
</script>

<div class="head" on:click={() => (expanded = !expanded)}>
	<svg
		width="9"
		height="14"
		viewBox="0 0 9 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class:expanded
		style="color: {titleColor};"
	>
		<path
			d="M8.53036 6.60315L0.480359 0.315653C0.459324 0.299092 0.434044 0.288801 0.407424 0.28596C0.380803 0.283119 0.353922 0.287844 0.329866 0.299592C0.30581 0.311341 0.285555 0.329636 0.271428 0.352377C0.257301 0.375117 0.249875 0.401382 0.250002 0.428153V1.80851C0.250002 1.89601 0.291073 1.97994 0.35893 2.03351L6.7875 7.05315L0.35893 12.0728C0.289287 12.1264 0.250002 12.2103 0.250002 12.2978V13.6782C0.250002 13.7978 0.387502 13.8639 0.480359 13.7907L8.53036 7.50315C8.59878 7.44978 8.65413 7.38151 8.6922 7.30353C8.73027 7.22556 8.75005 7.13993 8.75005 7.05315C8.75005 6.96638 8.73027 6.88075 8.6922 6.80277C8.65413 6.72479 8.59878 6.65652 8.53036 6.60315Z"
			fill="currentColor"
			fill-opacity="0.85"
		/>
	</svg>

	{#if $$slots.title}
		<slot name="title" />
	{:else if title}
		<h3 class="title" style="color: {titleColor};">
			{title || ''}
		</h3>
	{/if}
</div>
{#if expanded}
	<div class="content">
		<slot />
	</div>
{/if}

<style>
	.head {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		cursor: pointer;
	}
	svg {
		color: white;
		transition: transform 300ms;
	}
	svg.expanded {
		transform: rotateZ(90deg);
	}

	.title {
		user-select: none;
	}
</style>
