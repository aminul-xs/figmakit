import esbuild from 'esbuild';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
	entryPoints: [resolve(__dirname, 'src/plugin/code.ts')],
	bundle: true,
	outfile: 'dist/code.js',
	target: 'es2017',
	logLevel: 'info',
});

if (watch) {
	await ctx.watch();
	console.log('Watching plugin code...');
} else {
	await ctx.rebuild();
	await ctx.dispose();
}
