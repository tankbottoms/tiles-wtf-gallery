<script lang="ts">
	export let options = ['ETH', 'USD'];
	export let selected = options[0];

	let index = options.indexOf(selected);

	$: index = index % options.length;
	$: selected = options[index];
</script>

<div
	role="button"
	style="cursor: pointer; color: var(--text-action-primary); background: var(--text-action-secondary);; font-weight: 500; white-space: nowrap; padding: 1px 6px; margin-left: 0px; margin-right: 0px; border-radius: 1px;"
	on:click={() => (index = (index + 1) % options.length)}
>
	{selected}<span
		role="img"
		aria-label="caret-down"
		class="anticon anticon-caret-down"
		style="font-size: 10px; margin-left: 4px;"
		><svg
			viewBox="0 0 1024 1024"
			focusable="false"
			data-icon="caret-down"
			width="1em"
			height="1em"
			fill="currentColor"
			aria-hidden="true"
			><path
				d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
			/></svg
		></span
	>
</div>
