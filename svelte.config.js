import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		// Macros added for @lingui/macro
		babel: { plugins: ['macros'] },
		postcss: {}
	}),

	// disabled to make svelte-file-dropzone package work
	// experimental: {
	// 	prebundleSvelteLibraries: true
	// },

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		}
	}
};

export default config;
