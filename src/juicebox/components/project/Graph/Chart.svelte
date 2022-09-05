<script lang="ts">
	import { browser } from '$app/environment';
	import { axisBottom, axisRight, scaleLinear, scalePoint, select } from 'd3';
	import * as d3 from 'd3';
	import { daysToMillis } from './utils';
	import moment from 'moment';
	import type { EventRef } from './types';

	export let width = browser ? window.innerWidth : 500;
	export let data: EventRef[];
	export let duration: number;

	const TICKS = 7;

	let shownTooltip = false;
	let toolTipContent = [0, 0, '', ''];

	const dateStringForBlockTime = (timestamp: number) =>
		duration ? moment(timestamp * 1000).format(duration > 1 ? 'M/DD' : 'h:mma') : undefined;

	export const loadDomain = (events: EventRef[]): [number, number] => {
		let max: number | undefined;
		let min: number | undefined;
		// Calculate domain for graph based on floor/ceiling balances
		events.forEach((r) => {
			if (r.value === undefined) return;
			if (min === undefined || r.value < min) min = r.value;
			if (max === undefined || r.value > max) max = r.value;
		});

		if (max === undefined || min === undefined) {
			return [0, 0.1];
		} else {
			const domainPad = (max - min) * 0.05;
			return [Math.max(min - domainPad, 0), Math.max(max + domainPad, 0.1)];
		}
	};

	function drawChart(node: SVGElement, [width, data, duration]: [number, EventRef[], number]) {
		const svg = select(`#${node.id}`);
		draw(width, data, duration);
		function draw(width: number, data: EventRef[], duration: number) {
			const margin = 40;
			const height = Number(svg.attr('height')) - margin;

			const _events = [];
			const now = Date.now() - 1000 * 60 * 5;
			const durationInMillis = daysToMillis(
				duration === 365 ? duration - 1 : duration === 1 ? 0.99 : duration
			);
			const fromTime = now - durationInMillis;
			const durationInTick = Math.floor(durationInMillis / TICKS);
			for (let time = fromTime; time <= now; time += durationInTick) {
				const prevEvents = data.filter((e) => e.timestamp * 1000 <= time);
				if (prevEvents.length) {
					const lastEvent = prevEvents[prevEvents.length - 1];
					_events.push({ timestamp: Math.floor(time / 1000), value: lastEvent.value });
				} else {
					_events.push({ timestamp: Math.floor(time / 1000), value: 0 });
				}
			}

			const xScale = scalePoint()
				.domain(_events.map((e) => dateStringForBlockTime(e.timestamp)))
				.range([0, width]);

			// X-AXIS TEXT + VT Lines
			const xAxis = svg
				.append('g')
				.attr('style', 'color: var(--stroke-tertiary)')
				.attr('stroke-dasharray', '4 2')
				.attr('transform', `translate(-0,0)`)
				.call(axisBottom(xScale).tickSize(height + 6));

			const yScale = scaleLinear().domain(loadDomain(_events)).nice().range([height, 0]);
			// Y-AXIS HZ Lines
			const yAxisLines = svg
				.append(`g`)
				.attr('style', 'color: var(--stroke-tertiary)')
				.attr('stroke-dasharray', '4 2')
				.call(
					axisRight(yScale)
						.ticks(6)
						.tickSize(width)
						.tickFormat('' as null)
				);
			// Y-AXIS TEXT
			const yAxis = svg
				.append(`g`)
				.attr('style', 'color: var(--stroke-tertiary)')
				.call(axisRight(yScale).ticks(TICKS).tickSize(0));

			xAxis
				.selectAll('text')
				.attr('stroke', 'none')
				.attr('fill', 'var(--text-tertiary)')
				.attr('transform', `translate(10)`);
			xAxis.select('domain').attr('style', 'display: none');
			xAxis.select('g.tick:last-child > text').attr('transform', 'translate(-10, 0)');
			yAxisLines.select('domain').attr('style', 'display: none');

			yAxis
				.selectAll('text')
				.attr('stroke', 'none')
				.attr('fill', 'var(--text-tertiary)')
				.attr('transform', `translate(0, 12)`);
			yAxis.selectAll('path').attr('stroke', 'none').attr('fill', 'none');
			yAxis.select('text').attr('stroke', 'none').attr('fill', 'none');

			const line = d3
				.line()
				.x((d) => xScale(dateStringForBlockTime(d[0])))
				.y((d) => yScale(d[1]))
				.curve(d3.curveStep);

			svg
				.append('path')
				.datum(_events.map((event) => [event.timestamp, event.value]))
				.attr('class', 'line')
				.attr('d', line as any)
				.style('fill', 'none')
				.style('stroke', 'rgb(245, 163, 18)')
				.style('stroke-width', '2');

			///////////////////

			const hoverLine = svg.append('line').attr('y2', height).attr('stroke', '#00000000');
			const hoverCircle = svg
				.append('circle')
				.attr('cx', '50')
				.attr('cy', '50')
				.attr('r', '4')
				.attr('stroke-width', '2')
				.attr('stroke', '#ffffff')
				.attr('fill', 'rgb(245, 163, 18)')
				.attr('style', 'display: none')
				.attr('class', 'hover-circle');

			svg.on('mousemove', function (event) {
				const target = this as SVGElement;
				const width = target.getClientRects()[0].width;
				const index = Math.floor(event.offsetX / (width / _events.length));
				const x = (width / (_events.length - 1)) * index;
				hoverLine.attr('stroke', '#00000032').attr('transform', `translate(${x},${0})`);
				hoverCircle
					.attr('cx', `${x}`)
					.attr('cy', `${yScale(_events[index]?.value)}`)
					.attr('data', yScale(_events[index]?.value))
					.attr('style', '');
				toolTipContent[2] = dateStringForBlockTime(_events[index]?.timestamp);
				toolTipContent[3] = _events[index]?.value.toFixed(2);
			});

			svg.on('pointerleave', function () {
				hoverLine.attr('stroke', '#00000000');
				hoverCircle.attr('style', 'display: none');
				shownTooltip = false;
			});

			///////////////////
		}
		return {
			update([width, data, duration]: [number, EventRef[], number]) {
				node.innerHTML = '';
				draw(width, data, duration);
			}
		};
	}

	let chartTarget: SVGSVGElement;
	let tooltipElement: HTMLElement;

	function onPointerEnter(event: PointerEvent) {
		shownTooltip = true;
	}

	function onPointerMove() {
		const circle = chartTarget.querySelector('circle.hover-circle') as HTMLElement;
		const tooltip = tooltipElement as HTMLElement;
		const rect = circle.getBoundingClientRect();
		const chartRect = chartTarget.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		let x = rect.left - chartRect.left;
		let y = rect.top - chartRect.top;
		if (chartRect.width <= x + tooltipRect.width + 10) {
			x -= tooltipRect.width + 10;
		} else {
			x += 20;
		}
		if (chartRect.height <= y + tooltipRect.height + 10) {
			y -= tooltipRect.height + 5;
		} else {
			y += 20;
		}
		toolTipContent = [x, y, toolTipContent[2], toolTipContent[3]];
	}

	function onPointerLeave(event: PointerEvent) {
		shownTooltip = false;
	}
</script>

<div class="wrapper">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		width="100%"
		height="240"
		id="chart-svg"
		bind:this={chartTarget}
		use:drawChart={[width - 40, data, duration]}
		on:pointerenter={onPointerEnter}
		on:pointermove={onPointerMove}
		on:pointerleave={onPointerLeave}
	/>

	{#if shownTooltip}
		<div
			class="chart-tooltip"
			bind:this={tooltipElement}
			style="transform: translate({toolTipContent[0]}px, {toolTipContent[1]}px);"
		>
			<div style="padding: 10px; border: 1px solid var(--text-tertiary);">
				<div style="font-size: 0.7rem; color: var(--text-tertiary);">{toolTipContent[2]}</div>
				<div><span style="font-family: sans-serif;">Ξ</span>{toolTipContent[3]}</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
	}
	svg {
		margin-top: 5px;
		width: 100%;
	}
	.chart-tooltip {
		pointer-events: none;
		visibility: visible;
		position: absolute;
		top: 0px;
		left: 0px;
		transition: -webkit-transform 100ms ease 0s;
		z-index: 100;
		color: var(--text-primary);
		background: var(--background-l2);
	}
</style>
