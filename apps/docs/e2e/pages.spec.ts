import { expect, test } from '@playwright/test';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { auditedRoutes, matching, navigationRoute } from './pages';

// Un faux export, pour que ces tests ne dépendent pas d'un build présent : la lecture du
// vrai dist/ est exercée par accessibility.spec.ts, qui en a besoin pour exister.
const fakeSitemap = (...routes: string[]) => {
  const dist = mkdtempSync(join(tmpdir(), 'alveole-a11y-'));
  const urls = routes.map(route => `  <url><loc>https://alveole.captive.fr${route}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0"?>\n<urlset>\n${urls}\n</urlset>\n`);
  return dist;
};

test('énumère une route par composant du sitemap, dans un ordre stable', () => {
  expect(auditedRoutes(fakeSitemap('/components/TextField', '/components/Select'))).toEqual([
    '/components',
    '/components/Select',
    '/components/TextField',
  ]);
});

test('ignore les routes qui ne sont pas des composants', () => {
  expect(auditedRoutes(fakeSitemap('/', '/philosophy', '/theme/colors', '/components/TextField'))).toEqual([
    '/components',
    '/components/TextField',
  ]);
});

test('décode les noms de composants échappés dans le sitemap', () => {
  expect(auditedRoutes(fakeSitemap('/components/Select%20Multiple'))).toEqual([
    '/components',
    '/components/Select Multiple',
  ]);
});

test('refuse un build sans aucun composant', () => {
  expect(() => auditedRoutes(fakeSitemap('/philosophy'))).toThrow(/aucune page de composant/i);
});

test('refuse un build absent avec le même message qu’un build vide', () => {
  expect(() => auditedRoutes(join(tmpdir(), 'alveole-a11y-inexistant'))).toThrow(/aucune page de composant/i);
});

test('ne retient que les routes dont le nom contient le motif', () => {
  expect(matching(['/components/Select', '/components/SelectMultiple', '/components/TextField'], 'Select')).toEqual([
    '/components/Select',
    '/components/SelectMultiple',
  ]);
});

test('refuse un motif qui ne correspond à aucune route', () => {
  expect(() => matching(['/components/Select'], 'Inexistant')).toThrow(/aucune page ne correspond/i);
});

test('audite la colonne depuis une fiche, jamais depuis l’index', () => {
  expect(navigationRoute(fakeSitemap('/components/TextField', '/components/Select'))).toBe('/components/Select');
});
