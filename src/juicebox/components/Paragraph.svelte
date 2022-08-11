<script lang="ts">
	import Button from './Button.svelte';
	import RichNote from './RichNote.svelte';

	export let description: string;
	export let characterLimit: number;
	export let markdown = true;

	let expanded = false;

	const CHARACTER_LIMIT_EXCEEDED =
		(characterLimit && description.length > characterLimit) || description.split('\n').length > 1;

	const toggleExpanded = () => {
		expanded = !expanded;
	};

	$: description = description || '';

	$: processedDescription = description;

	// truncate the first line of the description
	$: shortDescription = `${processedDescription
		.replace(/\n+/g, ' ')
		.slice(0, characterLimit)
		.trim()}...`;
</script>

<div>
	<div class="content">
		<p>
			{#if markdown}
				<div class="markdown">
					{#if !expanded && CHARACTER_LIMIT_EXCEEDED}
						<RichNote note={shortDescription} />
					{:else}
						<RichNote note={processedDescription} />
					{/if}
				</div>
			{:else}
				{!expanded && CHARACTER_LIMIT_EXCEEDED ? shortDescription : processedDescription}
			{/if}
			{#if CHARACTER_LIMIT_EXCEEDED}
				<Button type="link" on:click={() => toggleExpanded()}>
					{expanded ? 'Read less' : 'Read more'}
				</Button>
			{/if}
		</p>
	</div>
</div>

<style lang="scss">
	div {
		white-space: pre-wrap;
	}
	.content {
		max-width: '700px';
		display: 'inline';
		color: var(--text-secondary);
		font-weight: 300;
	}
	p {
		margin-bottom: 0px;
	}
	.markdown {
		white-space: normal;
		:global(*) {
			margin-bottom: 0;
			margin-block-start: 0;
			margin-block-end: 0;
		}
		> :global(p) {
			display: block;
			margin-bottom: 0.3rem;
		}
		:global(a) {
			font-weight: 500;
		}
	}
</style>
