import { expect, test } from '@playwright/test';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { auditedRoutes } from './pages';

// Un faux export, pour que ces tests ne dépendent pas d'un build présent : l'énumération
// du vrai dist/ est exercée par accessibility.spec.ts, qui en a besoin pour exister.
const fakeExport = (...pages: string[]) => {
  const dist = mkdtempSync(join(tmpdir(), 'alveole-a11y-'));
  mkdirSync(join(dist, 'components'));
  pages.forEach(page => writeFileSync(join(dist, 'components', page), ''));
  return dist;
};

test('énumère une route par page de composant exportée, dans un ordre stable', () => {
  expect(auditedRoutes(fakeExport('TextField.html', 'Select.html'))).toEqual([
    '/components/Select',
    '/components/TextField',
  ]);
});

test('ignore les fichiers qui ne sont pas des pages', () => {
  expect(auditedRoutes(fakeExport('TextField.html', 'bundle.js'))).toEqual(['/components/TextField']);
});

test('refuse un build sans aucune page de composant', () => {
  expect(() => auditedRoutes(fakeExport())).toThrow(/aucune page de composant/i);
});

test('refuse un build absent avec le même message qu’un build vide', () => {
  expect(() => auditedRoutes(join(tmpdir(), 'alveole-a11y-inexistant'))).toThrow(/aucune page de composant/i);
});
