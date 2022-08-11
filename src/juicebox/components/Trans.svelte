<script lang="ts">
	import type Store from '$utils/Store';
	import type { I18n } from 'lingui_core/esm';
	// See provider/Intl.svelte for usage
	import { getContext, onMount } from 'svelte';
	const i18n = getContext('i18n') as Store<I18n>;

	export let message = '';
	export let props: { [key: string]: string } = {};

	let data: HTMLElement;
	let listening = false;
	let textMessage = '';

	$: if (!message && data) {
		textMessage = $i18n._(data?.innerText, {});
		if (!listening) {
			$i18n.on('change', async () => {
				textMessage = $i18n._(data?.innerText, {});
				console.log();
			});
			listening = true;
		}
	}
</script>

{#if message}
	<!-- TODO fix me, don't interpolate the passed props -->
	{#if message.match(/<\w+/) && message.match(/>/)}
		{@html $i18n._(message, props)}
	{:else}
		{$i18n._(message, props)}
	{/if}
{:else}
	<div bind:this={data} style="position: fixed; opacity: 0; top: -1000px; left: -1000px">
		<slot />
	</div>
	{textMessage}
{/if}

<style>
	div {
		all: unset;
	}
</style>
