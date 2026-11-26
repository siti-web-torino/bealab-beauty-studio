import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { treatments } from '../src/content.js';
import { esc } from '../src/page.js';
import { searchMetadata, treatmentSlugs } from '../src/search-data.js';
import { publicSiteUrl, renderPageHtml } from './page-html.mjs';

const configuredSite = process.env.SITE_URL;
const url = new URL(configuredSite || publicSiteUrl);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
  throw new Error('SITE_URL deve essere un URL HTTPS pubblico senza credenziali, query o frammenti.');
}
if (!url.pathname.endsWith('/')) url.pathname += '/';
const siteUrl = url.href;
const indexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : Boolean(configuredSite);

const template = await readFile('dist/index.html', 'utf8');
await Promise.all([undefined, ...treatments].map(async treatment => {
  const output = treatment ? 'dist/trattamenti/' + treatmentSlugs[treatment.id] : 'dist';
  await mkdir(output, { recursive: true });
  await writeFile(output + '/index.html', renderPageHtml(template, { siteUrl, indexable, treatment }));
}));

if (indexable) {
  const pages = [undefined, ...treatments].map(treatment => searchMetadata(siteUrl, treatment).canonical);
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + pages.map(page => '  <url><loc>' + esc(page) + '</loc></url>\n').join('')
    + '</urlset>\n';
  await writeFile('dist/sitemap.xml', sitemap);
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + new URL('sitemap.xml', siteUrl).href + '\n');
} else {
  await rm('dist/sitemap.xml', { force: true });
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
}

console.log('Pagine HTML generate: home e ' + treatments.length + ' trattamenti. Indicizzazione: ' + (indexable ? 'attiva' : 'disattivata') + '.');
