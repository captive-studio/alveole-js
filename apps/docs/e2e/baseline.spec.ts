import { expect, test } from '@playwright/test';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { compare, load, merge } from './baseline';

test('signale une règle dont les occurrences dépassent la baseline', () => {
  expect(compare({ label: 4 }, { label: 3 })).toEqual(['label : 4 occurrences, 3 attendues']);
});

test('signale une règle dont les occurrences sont passées sous la baseline', () => {
  expect(compare({ label: 1 }, { label: 3 })).toEqual([
    'label : 1 occurrence, 3 attendues. Corrigé : resserrer le cliquet.',
  ]);
});

test('part d’une baseline vide quand le fichier n’existe pas encore', () => {
  expect(load(join(tmpdir(), 'alveole-a11y-absente.json'))).toEqual({});
});

// Une baseline corrompue ne doit pas passer pour un cliquet : un compte lu comme texte
// ferait taire la comparaison au lieu de la faire échouer.
test('refuse une baseline dont un compte n’est pas un nombre', () => {
  const path = join(mkdtempSync(join(tmpdir(), 'alveole-a11y-')), 'baseline.json');
  writeFileSync(path, JSON.stringify({ '/components/Select': { label: '4' } }));

  expect(() => load(path)).toThrow('Baseline a11y malformée');
});

test('ne réécrit que les routes auditées et laisse les autres intactes', () => {
  const existing = { '/components/Select': { label: 9 }, '/components/TextField': { label: 2 } };

  expect(merge(existing, { '/components/Select': { label: 4 } }, ['/components/Select'])).toEqual({
    '/components/Select': { label: 4 },
    '/components/TextField': { label: 2 },
  });
});

test('retire une route auditée qui ne présente plus aucune violation', () => {
  const existing = { '/components/Select': { label: 9 }, '/components/TextField': { label: 2 } };

  expect(merge(existing, {}, ['/components/Select'])).toEqual({ '/components/TextField': { label: 2 } });
});
