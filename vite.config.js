import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/click-finder-js/', 
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        stats: resolve(__dirname, 'users/stats/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@common': resolve(__dirname, './src/common'),
      '@features': resolve(__dirname, './src/features'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
});