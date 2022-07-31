<script lang="ts">
	import Autolinker from 'autolinker';
	import type * as CSS from 'csstype';
	import { onMount } from 'svelte';
	import RichImgPreview, { supportedContentTypes, getContentType } from './RichImgPreview.svelte';

	export let note: any;
	export let style: CSS.Properties | undefined = undefined;

	let contentType: string | undefined;
	let mediaLink: string | undefined;
	let sanitizedNote: string | undefined;

	function getMediaLink() {
		if (!note) return '';

		const https = 'https://';
		const http = 'http://';

		if (note.includes(https)) {
			return https + note.split(https)[1].split(' ')[0];
		} else if (note.includes(http)) {
			return http + note.split(http)[1].split(' ')[0];
		}
		return '';
	}

	onMount(async () => {
		mediaLink = getMediaLink();
		contentType = await getContentType(mediaLink);

		sanitizedNote =
			mediaLink && supportedContentTypes.includes(contentType) ? note.replace(mediaLink, '') : note;
	});
</script>

<div>
	{@html Autolinker.link(sanitizedNote, {
		sanitizeHtml: true,
		truncate: {
			length: 30,
			location: 'smart'
		}
	}).replaceAll('\n', '<br>')}
</div>

<slot />

{#if mediaLink}
	<RichImgPreview src={mediaLink} height="140" {style} />
{/if}


<style>
    div {
        color: var(--text-secondary);
    }
</style>