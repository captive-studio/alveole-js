import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const BASE_URL = 'https://alveole.captive.fr';
const TITLE_RE = /title:\s*['"]([^'"]+)['"]/;
const CONST_EXPORT_RE = /export const (\w+)\s*(?::[^=]*)?=\s*([\s\S]{0,50})/g;

const storyFiles = await Array.fromAsync(glob('packages/components/src/**/*.stories.tsx', { cwd: root }));

const titles = storyFiles
  .map(file => {
    const content = readFileSync(resolve(root, file), 'utf8');
    const match = content.match(TITLE_RE);
    return match?.[1] ?? null;
  })
  .filter(Boolean)
  .sort();

const constantFiles = await Array.fromAsync(glob('packages/theme/src/constants/*.ts', { cwd: root }));

const constantNames = constantFiles
  .flatMap(file => {
    const content = readFileSync(resolve(root, file), 'utf8');
    return [...content.matchAll(CONST_EXPORT_RE)]
      .filter(([, , value]) => /^[{[]/.test(value.trim()) || value.trim().startsWith('Object.fromEntries('))
      .map(([, name]) => name);
  })
  .sort();

const lastmod = new Date().toISOString();

const staticPage = (path, priority) =>
  `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority.toFixed(4)}</priority>\n  </url>`;

const urls = [
  `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0000</priority>\n  </url>`,
  staticPage('/guides/installation', 0.6),
  staticPage('/guides/philosophy', 0.6),
  staticPage('/guides/migration-v2', 0.6),
  staticPage('/constants', 0.6),
  staticPage('/theme/colors', 0.6),
  staticPage('/theme/css-variables', 0.6),
  staticPage('/theme/typographies', 0.6),
  ...titles.map(
    title =>
      `  <url>\n    <loc>${BASE_URL}/components/${encodeURIComponent(title)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8000</priority>\n  </url>`,
  ),
  ...constantNames.map(name => staticPage(`/constants/${encodeURIComponent(name)}`, 0.5)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>\n`;

const outputPath = resolve(import.meta.dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`generated sitemap.xml with ${titles.length} components`);
