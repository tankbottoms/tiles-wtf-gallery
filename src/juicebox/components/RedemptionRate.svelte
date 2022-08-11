<script lang="ts" context="module">
	declare var Desmos;
</script>

<script lang="ts">
	import AlertText from './AlertText.svelte';
	import Range from './Range.svelte';
	import Toggle from './Toggle.svelte';
	import { onMount } from 'svelte';

	const GRAPH_CONTAINER_ID = 'graph-container';
	const graphSize = 300;
	const graphPad = 50;
	const bondingCurveId = 'bonding-curve';
	const baseCurveId = 'base-curve';

	export let disabled = false;
	export let redemptionRate: number = 100;
	export let checked = redemptionRate !== 100;

	let calculator;
	let rangeValue = [redemptionRate];
	let isOpenToggle = false;

	onMount(() => {
		calculator = Desmos.GraphingCalculator(document.getElementById(GRAPH_CONTAINER_ID), {
			keypad: false,
			expressions: false,
			settingsMenu: false,
			zoomButtons: false,
			expressionsTopbar: false,
			pointsOfInterest: false,
			trace: false,
			border: false,
			lockViewport: true,
			images: false,
			folders: false,
			notes: false,
			sliders: false,
			links: false,
			distributions: false,
			pasteTableData: false,
			showGrid: false,
			showXAxis: false,
			showYAxis: false,
			xAxisNumbers: false,
			yAxisNumbers: false,
			polarNumbers: false
		});
		graphCurve(100);
	});

	const graphCurve = (_value?: number) => {
		const primaryColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--text-brand-primary'
		);
		const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue(
			'--text-brand-secondary'
		);
		if (_value === undefined || !calculator) return;

		const overflow = 10;
		const supply = 10;

		calculator.setMathBounds({
			left: 0,
			bottom: 0,
			right: 10,
			top: 10
		});
		calculator.removeExpressions([{ id: bondingCurveId }, { id: baseCurveId }]);
		calculator.setExpression({
			id: bondingCurveId,
			latex: `y=${overflow} * (x/${supply}) * (${_value / 100} + (x - x${_value / 100})/${supply})`,
			color: primaryColor
		});
		calculator.setExpression({
			id: baseCurveId,
			latex: `y=x`,
			color: secondaryColor
		});
	};

	$: {
		redemptionRate = rangeValue[0];
		graphCurve(redemptionRate);
	}

	const openToggle = () => {
		isOpenToggle = !isOpenToggle;
	};
</script>

<header>
	<Toggle id="redemption" bind:checked {disabled}
		><h3>
			Redemption rate {#if !disabled && redemptionRate === 100}
				<span>({disabled ? '' : '100%'})</span>
			{/if}
		</h3></Toggle
	>
</header>
{#if checked}
	<Range bind:values={rangeValue} step={0.5} />
{/if}
<p>The redemption rate determines the amount of overflow each token can be redeemed for.</p>
<div class="toggle-link" on:click={openToggle}>
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		class="icon"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		style={`transform: rotate(${isOpenToggle ? 90 : 0}deg);`}
		><path
			d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
		/></svg
	>
	How do I set the redemption rate?
</div>
{#if isOpenToggle}
	<p>
		On a lower redemption rate, redeeming a token increases the value of each remaining token,
		creating an incentive to hold tokens longer than other holders.
	</p>
	<p>
		A redemption rate of 100% means all tokens will have equal value regardless of when they are
		redeemed.
	</p>
	<p>
		Learn more in this <a href="https://youtu.be/dxqc3yMqi5M">short video</a>.
	</p>
{/if}
{#if disabled}
	<AlertText>
		Disabled when your funding cycle's distribution limit is <b>No limit</b> (infinite)
	</AlertText>
{/if}
<div class="container">
	<div class="graph-container">
		<div class="graph" style={`height: ${graphSize}px; width: ${graphSize}px`}>
			<div
				id={GRAPH_CONTAINER_ID}
				style={`width: ${graphSize - graphPad}px; height: ${graphSize - graphPad}px`}
			/>
		</div>
		<div
			class="graph-legends"
			style={`top: ${graphPad / 2}px; left: ${graphPad / 2}px; width: ${
				graphSize - graphPad
			}px; height: ${graphSize - graphPad}px`}
		/>
		<div class="label">% tokens redeemed</div>
		<div class="label y-label" style={`width: ${graphSize}px`}>Token redeem value</div>
	</div>
</div>

<style lang="scss" scoped>
	.toggle-link {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-bottom: 10px;
		.icon {
			margin-right: 10px;
		}
	}
	:global(.dcg-container) {
		background: var(--background-l2) !important;
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 20px;
	}

	.graph {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.graph-legends {
		position: absolute;
		border-left: 2px solid var(--stroke-secondary);
		border-bottom: 2px solid var(--stroke-secondary);
	}

	.graph-container {
		position: relative;
	}

	.label {
		font-size: 0.7rem;
		text-align: center;
	}
	.y-label {
		position: absolute;
		transform: rotate(-90deg);
		bottom: 0;
		left: 0;
		top: 0;
	}

	@media (max-width: 768px) {
		.container {
			flex-direction: column;
		}
	}
</style>
