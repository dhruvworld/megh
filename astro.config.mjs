// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), markdoc(), keystatic()],

  vite: {
    plugins: [tailwindcss()]
  },

  // Keep local dev stable for /keystatic; enable Netlify adapter for builds/deploys.
  adapter: isDev ? undefined : netlify()
});