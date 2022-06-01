import { browser } from '$app/env';
import Store from '$utils/Store';

export const darkMode = new Store(browser ? localStorage.getItem('DARK_MODE') === 'true' : false);
export const modal = new Store();

if (browser) {
	darkMode.subscribe((value) => localStorage.setItem('DARK_MODE', JSON.stringify(value)));
}
