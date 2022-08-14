<script lang="ts">
	import ErrorModal from '$components/ErrorModal.svelte';
	import Header from '$components/Header.svelte';
	import PendingTxn from '$components/PendingTxn.svelte';
	import Intl from '$juicebox/provider/Intl.svelte';
	import { notify } from '$utils/notification';
	import { onMount } from 'svelte';
	import { loadLocale } from '$utils/LanguageProvider';
	import Notify from 'bnc-notify';

	onMount(async () => {
		await loadLocale();
		notify.set(Notify({}));
	});
</script>

<Intl config={{}}>
	<Header />
	<slot />
	<PendingTxn />
	<ErrorModal />
</Intl>

<style>
	:global(body) {
		cursor: crosshair;
	}
	:global(body, button) {
		font-family: monospace;
	}

	:root {
		--background-l0: #ffffff;
		--background-l1: #e7e3dc;
		--background-l2: #f3f1ec;
		--background-disabled: #00000018;
		--background-success: #0f8534;
		--background-warn: #bf7c08;
		--background-failure: #ff4524;
		--background-brand-primary: #f5a312;
		--background-brand-secondary: #ffecbb;
		--background-action-primary: #18b4c7;
		--background-action-secondary: #32c8db44;
		--background-action-highlight: #3dd1e4;
		--text-primary: #000000ee;
		--text-secondary: #00000099;
		--text-tertiary: #00000055;
		--text-placeholder: #00000055;
		--text-disabled: #00000044;
		--text-success: #0f8534;
		--text-warn: #bf7c08;
		--text-failure: #ff4524;
		--text-header: #f5a312;
		--text-action-primary: #18b4c7;
		--text-action-secondary: #18b4c7;
		--text-action-highlight: #25c4d8;
		--text-brand-primary: #f5a312;
		--text-brand-secondary: #ffecbb;
		--text-over-brand-primary: #fff;
		--text-over-brand-secondary: #000;
		--text-over-action-primary: #fff;
		--text-over-action-secondary: #18b4c7;
		--text-over-action-highlight: #000000ee;
		--text-over-success: #fff;
		--text-over-warn: #fff;
		--text-over-failure: #fff;
		--text-over-disabled: #00000055;
		--icon-primary: #000000ee;
		--icon-secondary: #00000099;
		--icon-tertiary: #00000055;
		--icon-disabled: #00000044;
		--icon-success: #0f8534;
		--icon-warn: #bf7c08;
		--icon-failure: #ff4524;
		--icon-action-primary: #18b4c7;
		--icon-action-secondary: #18b4c7;
		--icon-brand-primary: #f5a312;
		--icon-brand-secondary: #ffecbb;
		--icon-over-brand-primary: #fff;
		--icon-over-brand-secondary: #000;
		--icon-over-action-primary: #fff;
		--icon-over-action-secondary: #18b4c7;
		--icon-over-action-highlight: #25c4d8;
		--icon-over-success: #fff;
		--icon-over-warn: #fff;
		--icon-over-failure: #fff;
		--icon-over-disabled: #00000055;
		--stroke-primary: #00000048;
		--stroke-secondary: #00000032;
		--stroke-tertiary: #00000018;
		--stroke-success: #0f8534;
		--stroke-warn: #bf7c08;
		--stroke-failure: #ff4524;
		--stroke-disabled: #00000018;
		--stroke-action-primary: #18b4c7;
		--stroke-action-secondary: #32c8db44;
		--stroke-action-highlight: #3dd1e4;
		--boxShadow-primary: rgba(0, 0, 0, 0.1);
		--radius-xs: 1px;
		--radius-sm: 1px;
		--radius-md: 1px;
		--radius-lg: 1px;
		--radius-xl: 1px;
	}
</style>
