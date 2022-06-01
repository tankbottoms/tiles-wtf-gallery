<script type="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	export let min = 0;
	export let max = 100;
	export let showValueBox = true;
	export let step = 0.5;
	export let values = [0];
</script>

<div>
	<RangeSlider range="min" {min} {max} {step} bind:values />
	{#if showValueBox}
		<section class="value-box">
			<input type="number" bind:value={values[0]} {step} />
			<span>%</span>
		</section>
	{/if}
</div>

<style>
	:global(.rangeSlider) {
		--range-slider: var(--background-action-secondary); /* slider main background color */
		--range-handle-inactive: var(--background-action-primary); /* inactive handle color */
		--range-handle: var(--background-action-secondary); /* non-focussed handle color */
		--range-handle-focus: var(--background-action-primary); /* focussed handle color */
		--range-handle-border: var(--range-handle);
		--range-range-inactive: var(--range-handle-inactive); /* inactive range bar background color */
		--range-range: var(--range-handle-focus); /* active range bar background color */
		--range-float-inactive: var(
			--range-handle-inactive
		); /* inactive floating label background color */
		--range-float: var(--range-handle-focus); /* floating label background color */
		--range-float-text: white; /* text color on floating label */

		flex: 1;
	}

	div {
		display: flex;
		align-items: center;
	}

	input {
		max-width: 70px;
		text-indent: 10px;
		background: transparent;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		color: var(--text-primary);
	}
</style>
