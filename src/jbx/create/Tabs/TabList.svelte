<div class="tab-list">
	<slot />
</div>

<style>
	/* TODO: the tabs aren't scrolling, they're stacking */
	.tab-list {
		border-bottom: 1px solid var(--text-disabled);
		overflow-x: scroll;
		max-width: 100vw;
	}
</style>
