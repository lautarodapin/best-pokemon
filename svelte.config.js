import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [tailwindcss({ compile: false }), autoprefixer]
		},
		preserve: ['ld+json', 'module'],
		typescript: true
	}),
	kit: {
		adapter: adapter()
		// files: {
		// 	hooks: './src/hooks.ts'
		// }
	}
};

export default config;
