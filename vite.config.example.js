import { defineConfig } from 'vite';

export default defineConfig({
  root: 'example',
  base: process.env.GITHUB_ACTIONS ? '/cm-theme/' : '/',
  build: {
    outDir: '../demo',
    emptyOutDir: true
  }
});
