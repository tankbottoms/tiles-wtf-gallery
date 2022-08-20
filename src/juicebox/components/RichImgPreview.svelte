<script lang="ts" context="module">
	export const supportedContentTypes = [
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/png',
		'image/svg',
		'image/svg+xml'
	];
	export async function getContentType(url: string): Promise<string> {
		return axios
			.get(url)
			.then((res) => {
				return res.headers['content-type'];
			})
			.catch(() => {
				return undefined;
			});
	}
</script>

<script lang="ts">
	import axios from 'axios';

	import type * as CSS from 'csstype';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import ImageViewer from './ImageViewer.svelte';

	export let src: string | undefined;
	export let width: CSS.Properties['width'] | undefined = undefined;
	export let height: CSS.Properties['height'] | undefined = undefined;
	export let style: CSS.Properties;

	const w = width ?? height ? '' : '100px';
	const h = height ?? '100px';

	let isSupportedContent: boolean = true;

	function formatStyleKey(key: string) {
		return key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
	}

	function styleStringFromObject(obj: CSS.Properties) {
		return Object.entries(obj)
			.map(([key, value]) => `${formatStyleKey(key)}: ${value}`)
			.join('; ');
	}

	onMount(async () => {
		//
	});

	let displayViewer = false;
</script>

{#if isSupportedContent}
	<div style={style && styleStringFromObject(style)}>
		<img
			{src}
			style={styleStringFromObject({
				maxWidth: w,
				maxHeight: h,
				width: w,
				height: h
			})}
			alt="Payment memo"
		/>
		<div class="overlay" on:click={() => (displayViewer = true)}>
			<span>
				<Icon name="eye" />
				Preview
			</span>
		</div>
	</div>
	{#if displayViewer}
		<ImageViewer {src} close={() => (displayViewer = false)} />
	{/if}
{/if}

<style lang="scss">
	div {
		position: relative;
		width: fit-content;

		.overlay {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--text-over-brand-primary);
			background: #00000080;
			cursor: pointer;
			opacity: 0;
			transition: opacity 0.3s;
			width: 100%;

			&:hover {
				opacity: 1;
			}
			span {
				display: flex;
				gap: 4px;
				align-items: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
