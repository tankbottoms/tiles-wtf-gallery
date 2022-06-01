import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		// trailingSlash: 'always',
		vite: {
			resolve: {
				alias: {
					$dao: path.resolve('./src/dao'),
					$data: path.resolve('./src/dao/data'),
					$deployments: path.resolve('./src/deployments'),
					$components: path.resolve('./src/components'),
					$constants: path.resolve('./src/dao/constants'),
					$models: path.resolve('./src/dao/models'),
					$stores: path.resolve('./src/stores'),
					$tiles: path.resolve('./src/tiles'),
					$utils: path.resolve('./src/dao/utils')
				}
			}
		}
	}
};

export default config;
