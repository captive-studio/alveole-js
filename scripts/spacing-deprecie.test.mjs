import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

// Les anciennes cles de l'echelle Spacings sont purement numeriques ('000', '025', '100'...) et
// toutes `@deprecated` au profit de l'echelle V/W ('0V', '1V', '2W'...), qui contient toujours une
// lettre. Un `spacing('<chiffres>')` ne peut donc viser qu'une cle condamnee : on les traque pour
// qu'aucune ne subsiste ni ne reapparaisse dans le code des composants.
const CLE_DEPRECIEE = /spacing\('\d+'\)/;

const racine = new URL('../packages/components/src', import.meta.url).pathname;

const fichiersSource = dossier =>
  readdirSync(dossier, { withFileTypes: true }).flatMap(entree => {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) return fichiersSource(chemin);
    if (!/\.tsx?$/.test(entree.name)) return [];
    return [chemin];
  });

test('aucune cle de spacing depreciee dans les composants', () => {
  const fautifs = fichiersSource(racine).filter(chemin => CLE_DEPRECIEE.test(readFileSync(chemin, 'utf8')));

  assert.deepEqual(fautifs, []);
});
