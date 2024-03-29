<script lang="ts">
	import { setContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import Store from '$utils/Store';
	import CloseButton from './CloseButton.svelte';
	import Modal, { bind } from './Modal.svelte';
	import UnsavedChangesModal from './UnsavedChangesModal.svelte';

	// NOTE this is a bit back to front, ideally I'd like the outer on:click to be intercepted
	// at Drawer inner component level to check if dirty _once_, and not continuesly on each update.
	const showDirty = new Store(false);
	setContext('SHOW_DIRTY', {
		showDirty,
		check: (initialState: { [x: string]: any } = {}, currentState: { [x: string]: any } = {}) => {
			// For each key in initialState, check if any value is different
			// from the values in currentState. Short-circuit if any value is different.
			$showDirty = Object.keys(initialState).some((key) => {
				return initialState[key] !== currentState[key];
			});
		}
	});

	export let shown = false;
	let modal: any;

	function close() {
		// Reset the dirty state
		showDirty.set(false);
		shown = false;
		modal = undefined;
	}

	function checkDirty() {
		if ($showDirty) {
			modal = bind(UnsavedChangesModal, {
				closeResource: close
			});
		} else {
			close();
		}
	}
</script>

{#if shown}
	<!-- The element that makes the whole page besides drawer darkish  -->
	<div class="overlay" in:fade={{ duration: 100 }} out:fade on:click={checkDirty} />

	<div class="drawer-container" in:fly={{ x: 120 }} out:fly={{ x: 120 }}>
		<CloseButton on:click={checkDirty} />
		<slot {close} />
	</div>
{/if}
<Modal show={modal} closeButton={false} />

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.drawer-container {
		overflow: auto;
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		background-color: var(--background-l0);
		z-index: 1000;
		width: 640px;
		height: 100%;
	}

	@media (max-width: 640px) {
		.drawer-container {
			width: 100%;
		}
	}
</style>
