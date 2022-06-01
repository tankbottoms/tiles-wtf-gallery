<script lang="ts">
	export let close: () => void;

	export let networkName: string;
	export let networkOptions: { label: string; href: string }[];

	console.log(networkOptions);
</script>

<section>
	<h2>Connect wallet to {networkName}</h2>
	<div>Or, go to:</div>
	{#each networkOptions as option}
		<a href={option.href}>{option.label}</a>
	{/each}
</section>

<style>
	section {
		padding: 4rem;
	}

	h2 {
		color: var(--text-header);
	}
</style>
