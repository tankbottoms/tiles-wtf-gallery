<script lang="ts">
	import Button from '$jbx/components/Button.svelte';

	export let description: string;
	export let characterLimit: number;

	let expanded = false;

	const CHARACTER_LIMIT_EXCEEDED =
		(characterLimit && description.length > characterLimit) || description.split('\n').length > 1;

	const toggleExpanded = () => {
		expanded = !expanded;
	};

	// truncate the first line of the description
	const shortDescription = `${description.split('\n')[0].slice(0, characterLimit).trim()}...`;
</script>

<div>
	<div class="content">
		<p>
			{!expanded && CHARACTER_LIMIT_EXCEEDED ? shortDescription : description}
			{#if CHARACTER_LIMIT_EXCEEDED}
				<Button type="link" on:click={() => toggleExpanded()}>
					{expanded ? 'Read less' : 'Read more'}
				</Button>
			{/if}
		</p>
	</div>
</div>

<style>
	.content {
		max-width: '700px';
		display: 'inline';
		color: var(--text-secondary);
		font-weight: 300;
	}
</style>
