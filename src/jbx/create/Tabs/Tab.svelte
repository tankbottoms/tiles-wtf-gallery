<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let id: string;
	export let onClick: (tabId: string) => void = undefined;

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);

	function click() {
		selectTab(tab);
		onClick && onClick(id);
	}
</script>

<button {id} class:selected={$selectedTab === tab} on:click={click}>
	<slot />
</button>

<style>
	button {
		background: none;
		border: none;
		font-size: 18px;
		font-weight: 300;
		border-radius: 0;
		margin: 0;
		color: var(--secondary-text);
		padding-bottom: 20px;
		padding-right: 40px;
		position: relative;
	}

	.selected {
		/* border-bottom: 2px solid var(--text-brand-primary); */
		color: var(--text-brand-primary);
		font-weight: 500;
	}

	/* The tab underline for the active component
    TODO: the underline should be over the border bottom, annoylingly not solved by the z-index.
  */
	.selected:after {
		position: absolute;
		content: ' ';
		height: 2px;
		bottom: 0px;
		margin: 0 auto;
		left: 0;
		right: 0;
		background: var(--text-brand-primary);
	}

	@media (max-width: 900px) {
		button {
			padding-right: unset;
		}
	}

	@media (max-width: 650px) {
		button {
			padding-bottom: 5px;
		}
		.selected:after {
			background: none;
		}
	}
</style>
