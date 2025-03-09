import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
    publicDir: './public',
    root: './src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            output: {
                entryFileNames: 'index.js',
                chunkFileNames: 'chunk-[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
        minify: false,
    },
    server: {
        port: 8089,
        open: true,
    },
});
