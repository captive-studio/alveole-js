import assert from 'node:assert/strict';
import { test } from 'node:test';
import { releverDansSource, releverValeursBrutes } from './box-valeur-brute.mjs';

const racine = new URL('..', import.meta.url).pathname;

test('aucune valeur brute passee a Box dans packages/ et apps/', () => {
  assert.deepEqual(releverValeursBrutes(racine), []);
});

test('releve une ancienne cle passee par un appel de fonction', () => {
  assert.deepEqual(releverDansSource(`<Box gap={spacingValue('050')} />`, 'f.tsx'), [`f.tsx:1 gap='050'`]);
});

test("ne releve pas l'operande d'un calcul", () => {
  assert.deepEqual(releverDansSource(`<Box style={{ paddingLeft: gap / 2 }} />`, 'f.tsx'), []);
});
