import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';


const MODE = process.env.NODE_ENV;
const development = MODE === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		// Macros added for @lingui/macro
		babel: { plugins: ['macros'] }
	}),
	experimental: {
		prebundleSvelteLibraries: true
	},

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		// trailingSlash: 'always',
		vite: {
			plugins: [
				development &&
					nodePolyfills({
						include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
						http: true,
						crypto: true
					})
			],
			// https://github.com/sveltejs/kit/issues/928
			// This is for lingui to work, I know it says ssr
			// but people with the same issue with the static-adapter
			// solved it this way
			ssr: {
				noExternal: ['@lingui/*', 'lingui-core/*']
			},
			resolve: {
				alias: {
					$jbx: path.resolve('./src/jbx'),
					$deployments: path.resolve('./src/deployments'),
					$components: path.resolve('./src/components'),
					$stores: path.resolve('./src/stores'),
					$tiles: path.resolve('./src/tiles'),
				}
			}
		}
	}
};

export default config;
