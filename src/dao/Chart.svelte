<script lang="ts">
	import { browser } from '$app/env';
	import { axisBottom, axisRight, scaleLinear, select } from 'd3';
	import * as d3 from 'd3';

	export let width = browser ? window.innerWidth : 500;
	export let data: [string, number][];

	let shownTooltip = false;
	let toolTipContent = [0, 0, '', ''];

	function drawChart(node: SVGElement, width: number) {
		draw(width);
		function draw(width: number) {
			const svg = select(`#${node.id}`);
			const margin = 40;
			const height = Number(svg.attr('height')) - margin;
			const xScale = scaleLinear()
				.domain([d3.min(data, (d, i) => i), d3.max(data, (d, i) => i)])
				.nice()
				.range([0, width]);

			// X-AXIS TEXT + VT Lines
			const xAxis = svg
				.append('g')
				.attr('style', 'color: #00000018')
				.attr('stroke-dasharray', '4 2')
				.attr('transform', `translate(-0,0)`)
				.call(
					axisBottom(xScale)
						.tickSize(height + 6)
						.tickFormat((d, i, ...arr) => {
							const labels: SVGTextElement[] = arr[0 as any];
							const index = Math.floor(Math.max(0, (i * data.length) / (labels.length - 1) - 1));
							return data[index][0];
						})
				);

			const yScale = scaleLinear()
				.domain([d3.min(data, (d) => d[1]), d3.max(data, (d) => d[1])])
				.nice(6)
				.range([height, 0])
				.clamp(true);
			// Y-AXIS HZ Lines
			const yAxisLines = svg
				.append(`g`)
				.attr('style', 'color: #00000018')
				.attr('stroke-dasharray', '4 2')
				.call(
					axisRight(yScale)
						.tickSize(width)
						.tickFormat('' as null)
				);
			// Y-AXIS TEXT
			const yAxis = svg
				.append(`g`)
				.attr('style', 'color: #00000018')
				.call(axisRight(yScale).ticks(6).tickSize(0));

			xAxis
				.selectAll('text')
				.attr('stroke', 'none')
				.attr('fill', '#00000055')
				.attr('transform', `translate(10)`);
			xAxis.select('domain').attr('style', 'display: none');
			xAxis.select('g.tick:last-child > text').attr('transform', 'translate(-10, 0)');
			yAxisLines.select('domain').attr('style', 'display: none');

			yAxis
				.selectAll('text')
				.attr('stroke', 'none')
				.attr('fill', '#00000055')
				.attr('transform', `translate(0, 12)`);
			yAxis.selectAll('path').attr('stroke', 'none').attr('fill', 'none');
			yAxis.select('text').attr('stroke', 'none').attr('fill', 'none');

			const line = d3
				.line()
				.x((d) => xScale(d[0]))
				.y((d) => yScale(d[1]))
				.curve(d3.curveMonotoneX);

			svg
				.append('path')
				.datum(data.map(([, y], i) => [i, y]))
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
				.attr('fill', '#ff0000')
				.attr('style', 'display: none');

			svg.on('mousemove', function (event) {
				const target = this as SVGElement;
				const width = target.getClientRects()[0].width;
				const index = Math.floor(event.offsetX / (width / data.length));
				const x = ((width - 7) / (data.length - 1)) * index;
				hoverLine.attr('stroke', '#00000032').attr('transform', `translate(${x},${0})`);
				hoverCircle
					.attr('cx', `${x}`)
					.attr('cy', `${yScale(data[index][1])}`)
					.attr('data', yScale(data[index][1]))
					.attr('style', '');
				toolTipContent[2] = data[index][0];
				toolTipContent[3] = data[index][1].toFixed(2);
			});

			svg.on('pointerleave', function () {
				hoverLine.attr('stroke', '#00000000');
				hoverCircle.attr('style', 'display: none');
				shownTooltip = false;
			});

			///////////////////
		}
		return {
			update(width: number) {
				node.innerHTML = '';
				draw(width);
			}
		};
	}

	function onPointerEnter(event: PointerEvent) {
		shownTooltip = true;
	}
	function onPointerMove(event: PointerEvent) {
		let x = event.offsetX;
		let y = event.offsetY;
		const target = this as HTMLElement;
		const rect = target.getClientRects()[0];

		if (rect.width <= event.offsetX + 127) {
			x -= 127;
		} else {
			x += 20;
		}
		if (rect.height <= event.offsetY + 103) {
			y -= 83;
		} else {
			y += 20;
		}
		toolTipContent = [x, y, toolTipContent[2], toolTipContent[3]];
	}
	function onPointerLeave(event: PointerEvent) {
		shownTooltip = false;
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
	width="100%"
	height="240"
	id="chart-svg"
	use:drawChart={width - 40}
	on:pointerenter={onPointerEnter}
	on:pointermove={onPointerMove}
	on:pointerleave={onPointerLeave}
/>

{#if shownTooltip}
	<div
		class="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-top"
		style="pointer-events: none; visibility: visible; position: absolute; top: 0px; left: 0px; transform: translate({toolTipContent[0]}px, {toolTipContent[1]}px); transition: -webkit-transform 100ms ease 0s;z-index: 100"
	>
		<div
			style="padding: 10px; background: rgb(251, 249, 246); border: 1px solid rgba(0, 0, 0, 0.094);"
		>
			<div style="font-size: 0.7rem; color: var(--text-tertiary);">{toolTipContent[2]}</div>
			<div><span style="font-family: sans-serif;">Ξ</span>{toolTipContent[3]}</div>
		</div>
	</div>
{/if}

<style>
	svg {
		margin-top: 1rem;
		width: 100%;
	}
</style>
