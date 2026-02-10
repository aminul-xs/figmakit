import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
	plugins: [react(), viteSingleFile()],
	resolve: {
		alias: {
			'@/types': path.resolve(__dirname, './src/types'),
			'@/utils': path.resolve(__dirname, './src/ui/utils'),
			'@/widgets': path.resolve(__dirname, './src/ui/widgets'),
			'@/builder': path.resolve(__dirname, './src/ui/builder'),
			'@/config': path.resolve(__dirname, './src/ui/config'),
			'@/components': path.resolve(__dirname, './src/ui/components'),
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		rollupOptions: {
			input: './index.html',
		},
	},
});
