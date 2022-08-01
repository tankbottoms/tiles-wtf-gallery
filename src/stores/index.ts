import { browser } from '$app/env';
import Store from '$utils/Store';
import { derived } from 'svelte/store';

export const darkMode = new Store(browser ? localStorage.getItem('DARK_MODE') === 'true' : false);
export const modal = new Store();

if (browser) {
	darkMode.subscribe((value) => localStorage.setItem('DARK_MODE', JSON.stringify(value)));
}

export const pageReady = new Store<Record<string, boolean>>({
	web3: false
});

export const isPageReady = derived(pageReady, ($pageReady) => {
	let ready = true;
	for (const key in $pageReady) {
		ready = ready && !!$pageReady[key];
	}
	return ready;
});
