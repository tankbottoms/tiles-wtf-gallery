<script lang="ts">
	import { computePosition, autoPlacement } from '@floating-ui/dom';
	import clickOutsideDirective from '$juicebox/utils/clickOutside';

	export let message: string = undefined;
	export let placement: 'left' | 'right' | 'top' | 'bottom' = undefined;
	export let maxWidth = '200px';
	export let nowrap = false;
	export let close: Function;
	close;

	let popoverShow = false;
	let popoverRef: HTMLElement;
	let wrapperRef: HTMLElement;

	const firstChild = (node: HTMLSpanElement) => {
		wrapperRef = node.firstChild as HTMLElement;
	};

	function setPosition({ x, y, strategy }) {
		Object.assign(popoverRef.style, {
			position: strategy,
			left: `${x}px`,
			top: `${y}px`
		});
	}

	let currentId = 0;

	async function togglePopover(newState?: boolean) {
		const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		currentId = id;
		if (typeof newState === 'boolean') {
			if (newState) {
				const result = await computePosition(wrapperRef, popoverRef, {
					middleware: [autoPlacement()],
					placement
				});
				await setPosition(result);
			}
			if (id === currentId) popoverShow = !!newState;
		} else if (popoverShow) {
			popoverShow = false;
		} else {
			const result = await computePosition(wrapperRef, popoverRef, {
				middleware: [autoPlacement()],
				placement
			});
			await setPosition(result);
			if (id === currentId) popoverShow = true;
		}
	}

	$: style = `--maxWidth: ${maxWidth};`;
</script>

<span
	class="wrapper"
	bind:this={wrapperRef}
	use:firstChild
	on:mouseenter={() => togglePopover(true)}
	on:mouseleave={() => togglePopover(false)}
	on:touchstart={() => togglePopover(true)}
	use:clickOutsideDirective
	on:clickOutside={() => togglePopover(false)}
>
	<slot />
	<div {style} bind:this={popoverRef} class:hidden={!popoverShow} class="popover">
		<slot name="content" />
		{#if message}
			<p class="message" class:nowrap>{@html message}</p>
		{/if}
	</div>
</span>

<style>
	.message {
		font-weight: 300;
		font-size: 12px;
		color: var(--text-primary);
		line-height: 1.2;
		margin: 0;
		text-align: left;
		text-transform: none;
	}
	.popover {
		left: 0;
		top: 0;
		position: absolute;
		left: 0;
		top: 0;
		max-width: var(--maxWidth);
		background: var(--background-l0);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		transition: visibility 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
		padding: 10px;
		z-index: 999;
		white-space: normal;
		text-transform: none;
	}
	.hidden {
		visibility: hidden;
	}
	.nowrap {
		white-space: nowrap;
	}
</style>
