import { expect, test } from '@playwright/test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { compare, load } from './baseline';

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
