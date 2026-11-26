import { defineConfig } from 'vite';
import { treatments } from './src/content.js';
import { treatmentHref } from './src/page.js';
import { renderPageHtml } from './scripts/page-html.mjs';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [{
    name: 'bealab-static-pages',
    apply: 'serve',
    transformIndexHtml(html, context) {
      const url = new URL(context.originalUrl || context.path, 'http://localhost');
      const path = url.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
      const treatment = treatments.find(item => treatmentHref(item.id) === path);
      return renderPageHtml(html, { treatment });
    },
  }],
});
