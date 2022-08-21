import { sveltekit } from '@sveltejs/kit/vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import path from 'path';

/** @type {() => import('vite').UserConfig} */
const config = ({ mode }) => {
	const development = mode === 'development';
	return {
		kit: {
			prerender: {
				default: false
			},
			browser: {
				hydrate: true,
				router: true
			}
		},
		plugins: [
			sveltekit(),
			development &&
				nodePolyfills({
					include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
					http: true,
					crypto: true
				})
		],
		resolve: {
			alias: {
				$stores: path.resolve('./src/stores'),
				$utils: path.resolve('./src/utils'),
				$assets: path.resolve('./src/assets'),
				$constants: path.resolve('./src/constants'),
				$models: path.resolve('./src/models'),
				$data: path.resolve('./src/data'),

				$juicebox: path.resolve('./src/juicebox'),
				$components: path.resolve('./src/components'),
				$markdown: path.resolve('./src/markdown'),
				$tiles: path.resolve('./src/tiles'),
				$deployments: path.resolve('./src/deployments'),

				crypto: 'crypto-browserify',
				stream: 'stream-browserify',
				assert: 'assert',
				util: path.resolve('./libraries/util')
			}
		},
		ssr: {
			noExternal: ['@lingui/*', 'lingui-core/*']
		},
		optimizeDeps: {
			esbuildOptions: { target: 'es2020', supported: { bigint: true } }
		},
		build: {
			target: ['es2020'],
			rollupOptions: {
				plugins: [
					nodePolyfills({
						crypto: true,
						http: true
					})
				]
			},
			commonjsOptions: {
				transformMixedEsModules: true
			}
		}
	};
};

export default config;
