<script lang="ts">
	import Autolinker from 'autolinker';
	import type * as CSS from 'csstype';
	import { onMount } from 'svelte';
	import RichImgPreview, { supportedContentTypes, getContentType } from './RichImgPreview.svelte';

	export let note: string;
	export let style: CSS.Properties | undefined = undefined;

	let mediaLinks: string[] = [];
	let sanitizedNote: string | undefined;

	$: note = updateLinks(note);

	async function getMediaLinks() {
		if (!note) return [];

		let links: string[] = [];

		note.replace(/(https|http):\/\/[\w./&?,=#-;]+/gi, (link) => {
			links.push(link);
			return '';
		});

		const filteredLinks: string[] = [];
		for (const link of links) {
			const contentType = (await getContentType(link))?.split(';')?.[0] || '';
			if (supportedContentTypes.includes(contentType)) {
				filteredLinks.push(link);
			}
		}
		return filteredLinks;
	}

	onMount(async () => {
		note = updateLinks(note);
		mediaLinks = await getMediaLinks();
	});

	function updateLinks(note: string) {
		note = note
			.replace(
				/https[:]\/\/us-central1-juicebox-svelte.cloudfunctions.net\/app\/render\/simple\//g,
				() => `https://juicebox.wtf/tiles/render/svg/`
			)
			.replace(
				/https[:]\/\/tiles.wtf\/render\/png\//g,
				() => `https://juicebox.wtf/tiles/render/svg/`
			);
		return note;
	}

	$: {
		let _note = note;
		for (const link of mediaLinks) {
			_note = _note.replace(link, '');
		}
		sanitizedNote = _note;
	}
</script>

<div>
	{@html Autolinker.link(sanitizedNote, {
		sanitizeHtml: true,
		truncate: {
			length: 30,
			location: 'smart'
		}
	}).replace(/\n/g, '<br>')}
</div>

<slot />

<div class="images">
	{#each mediaLinks as mediaLink}
		<div class="image">
			<RichImgPreview src={mediaLink} height="100px" {style} />
		</div>
	{/each}

	<!-- <div class="frames">
		{#each tileLinks as tileLink}
			<iframe src={tileLink} title="" width="360" height="360" />
		{/each}
	</div> -->
</div>

<style>
	div {
		color: var(--text-secondary);
		font-weight: 300;
	}
	.images {
		display: flex;
		gap: 0.5rem;
	}
	.image {
		max-height: 100px;
	}
	.image :global(img) {
		max-width: 100%;
		max-height: 100%;
	}
	iframe {
		transform: translate(-120px, -120px) scale(0.3);
		border: none;
	}
	.frames {
		max-width: 120px;
		max-height: 120px;
	}
</style>
