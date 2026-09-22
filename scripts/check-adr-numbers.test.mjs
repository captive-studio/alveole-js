import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { numerosEnDouble, rapport } from './check-adr-numbers.mjs';

/** Un faux depot : un fichier vide par nom d'ADR donne. */
const depotAvec = noms => {
  const racine = mkdtempSync(join(tmpdir(), 'adr-'));
  mkdirSync(join(racine, 'docs', 'adr'), { recursive: true });
  for (const nom of noms) writeFileSync(join(racine, 'docs', 'adr', nom), '');

  return racine;
};

test('ne signale rien quand chaque numero est unique', () => {
  const racine = depotAvec(['0001-premier.md', '0002-deuxieme.md', '0017-dix-septieme.md']);

  assert.deepEqual(numerosEnDouble(racine), []);
});

test('signale un numero porte par deux ADR', () => {
  const racine = depotAvec(['0014-select-unique.md', '0014-tag-survol.md', '0015-theme-de-coloration.md']);

  assert.deepEqual(numerosEnDouble(racine), [
    { numero: '0014', fichiers: ['0014-select-unique.md', '0014-tag-survol.md'] },
  ]);
});

test('le rapport nomme le numero et les fichiers qui se le disputent', () => {
  const lignes = rapport([{ numero: '0014', fichiers: ['0014-select-unique.md', '0014-tag-survol.md'] }]);

  assert.match(lignes, /0014/);
  assert.match(lignes, /0014-select-unique\.md/);
  assert.match(lignes, /0014-tag-survol\.md/);
});
