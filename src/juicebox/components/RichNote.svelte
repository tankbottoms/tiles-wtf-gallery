<script lang="ts">
	import axios from 'axios';
	import Autolinker from 'autolinker';
	import { onMount } from 'svelte';

	export let note: string;
	export let style: { [key: string]: string } = undefined;

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

	let mediaLinks: string[] = [];
	let sanitizedNote: string | undefined;

	async function getMediaLinks() {
		if (!note) return [];

		let links: string[] = [];

		note.replace(/https:\/\/[\w./&?,=#-;]+/gi, (link) => {
			links.push(link);
			return '';
		});

		const filteredLinks: string[] = [];
		for (const link of links) {
			const contentType = await getContentType(link);
			if (supportedContentTypes.includes(contentType)) {
				filteredLinks.push(link);
			}
		}
		return filteredLinks;
	}

	onMount(async () => {
		mediaLinks = await getMediaLinks();
		const promises = mediaLinks.map((mediaLink) => {
			return getContentType(mediaLink);
		});
	});

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
			<img src={mediaLink} {style} alt="_image" />
		</div>
	{/each}
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
</style>
