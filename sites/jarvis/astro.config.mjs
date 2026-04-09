import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/presentation-repos/jarvis',
  outDir: './dist',
  build: {
    assets: '_assets',
  },
});
