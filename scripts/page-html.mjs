import { esc, renderHome } from '../src/page.js';
import { searchMetadata } from '../src/search-data.js';
import { renderTreatmentPage } from '../src/treatment-page.js';

export const publicSiteUrl = 'https://bealab-beauty-studio.vercel.app/';

export function renderPageHtml(template, { siteUrl = publicSiteUrl, indexable = false, treatment } = {}) {
  const meta = searchMetadata(siteUrl, treatment);
  const metadata = `<title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}">
    <meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}">
    <link rel="canonical" href="${esc(meta.canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="it_IT">
    <meta property="og:site_name" content="Bealab Beauty Studio">
    <meta property="og:title" content="${esc(meta.title)}">
    <meta property="og:description" content="${esc(meta.description)}">
    <meta property="og:url" content="${esc(meta.canonical)}">
    <meta property="og:image" content="${esc(meta.image)}">
    <meta property="og:image:alt" content="${esc(meta.imageAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(meta.schema).replace(/</g, '\\u003c')}</script>`;
  const content = treatment ? renderTreatmentPage(treatment) : renderHome();
  return template
    .replace('<!-- search-metadata -->', () => metadata)
    .replace('<div id="app"></div>', () => `<div id="app">${content}</div>`);
}
