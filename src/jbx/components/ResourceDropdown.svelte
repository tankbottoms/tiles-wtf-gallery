<script lang="ts">
	import { slide } from 'svelte/transition';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from './Icon.svelte';
	import Collapse from './Collapse.svelte';
	import Trans from './Trans.svelte';

	export let isMobile: boolean = false;
	let isOpen: boolean = false;

	const resources = [
		{
			label: 'Docs',
			href: 'https://info.juicebox.money/docs/'
		},
		{
			label: 'Blog',
			href: 'https://info.juicebox.money/blog/'
		},
		{
			label: 'Workspace',
			href: 'https://juicebox.notion.site/'
		},
		{
			label: 'Podcast',
			href: 'https://open.spotify.com/show/4G8ji7vofcOx2acXcjXIa4?si=1e5e6e171ed744e8&nd=1'
		},
		{
			label: 'Peel',
			href: 'https://discord.com/invite/XvmfY4Hkcz'
		},
		{
			label: 'Bannyverse',
			href: 'https://bannyverse.xyz'
		}
	];
</script>

{#if isMobile}
	<button
		class="isMobile"
		on:click={() => {
			isOpen = !isOpen;
		}}><Trans>Resources</Trans> <Icon name="down" direction={isOpen ? 's' : 'n'} /></button
	>
	{#if isOpen}
		<nav class="isMobile" transition:slide>
			{#each resources as resource}
				<ExternalLink href={resource.href}>{resource.label}</ExternalLink>
			{/each}
		</nav>
	{/if}
{:else}
	<Collapse bind:isOpen>
		<button class:isMobile
			><Trans>Resources</Trans> <Icon name="down" direction={isOpen ? 's' : 'n'} /></button
		>
		<nav slot="content">
			{#each resources as resource}
				<ExternalLink href={resource.href}>{resource.label}</ExternalLink>
			{/each}
		</nav>
	</Collapse>
{/if}

<style>
	button {
		background: none;
		border: none;
		outline: inherit;
		display: inline-flex;
		width: 120px;
		justify-content: space-between;
		cursor: pointer;
		align-items: center;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 0px;
		margin: 24px 10px 0px;
	}

	button.isMobile {
		margin: 0;
		padding: 0;
		width: 95%;
	}

	nav {
		display: flex;
		flex-direction: column;
		background: var(--background-l0);
		max-width: 120px;
		border: 1px solid var(--stroke-primary);
	}

	nav.isMobile {
		max-width: 100%;
		border: none;
	}

	:global(nav[slot='content'] a, nav.isMobile a) {
		cursor: pointer;
		align-items: center;
		line-height: 40px;
		font-weight: 500;
		color: var(--text-primary);
		padding: 0px 15px;
	}
</style>
