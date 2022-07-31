<script lang="ts" context="module">
	export const supportedContentTypes = [
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/png',
		'image/svg'
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

	export let src: string | undefined;
	export let width: CSS.Properties['width'] | undefined = undefined;
	export let height: CSS.Properties['height'] | undefined = undefined;
	export let style: CSS.Properties;

	const w = width ?? '100px';
	const h = height ?? '100px';

	let contentType: string;
	let isSupportedContent: boolean;

	function formatStyleKey(key: string) {
		return key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
	}

	function styleStringFromObject(obj: CSS.Properties) {
		return Object.entries(obj)
			.map(([key, value]) => `${formatStyleKey(key)}: ${value}`)
			.join('; ');
	}

	onMount(async () => {
		contentType = await getContentType(src);
		isSupportedContent = supportedContentTypes.includes(contentType);
	});
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
	</div>
{/if}
