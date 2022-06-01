<script lang="ts" context="module">
	import { darkMode } from '$stores';

	function toggleHTMLClass() {
		// NOTE: doesn't need to be this explicit, but brain isn't handling binary states
		if (darkMode.get()) {
			document.documentElement.classList.add('darkmode');
			document.documentElement.classList.remove('lightmode');
		} else {
			document.documentElement.classList.add('lightmode');
			document.documentElement.classList.remove('darkmode');
		}
	}

	export function toggleTheme() {
		darkMode.set(!darkMode.get());
		toggleHTMLClass();
	}
</script>

<script>
	import { onMount } from 'svelte';
	import Icon from '$components/Icon.svelte';
	// import { darkMode } from '$stores';

	onMount(() => {
		if ($darkMode) {
			toggleHTMLClass();
		}
	});
</script>

<div role="switch" aria-checked={$darkMode} on:click={toggleTheme}>
	<div class:active={!$darkMode}>
		<Icon name="sun" />
	</div>
	<div class:active={$darkMode}>
		<Icon name="moon" />
	</div>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	div[role='switch'] {
		border: 1px solid var(--stroke-tertiary);
		transition: border-color 0.12s ease-out;
		width: 60px;
		height: 30px;
		border-radius: 15px;
		cursor: pointer;
		color: var(--icon-tertiary);
	}
	div[role='switch']:hover {
		border-color: var(--stroke-secondary);
	}

	.active {
		color: var(--icon-primary);
	}
</style>
