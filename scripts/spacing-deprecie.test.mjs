import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fichiersSource } from './fichiers-source.mjs';

// Les anciennes cles de l'echelle Spacings sont purement numeriques ('000', '025', '100'...) et
// toutes `@deprecated` au profit de l'echelle V/W ('0V', '1V', '2W'...), qui contient toujours une
// lettre. Un `spacing('<chiffres>')` ou `spacingValue('<chiffres>')` ne peut donc viser qu'une cle
// condamnee : on les traque pour qu'aucune ne subsiste ni ne reapparaisse dans packages/ et apps/.
const CLE_DEPRECIEE = /spacing\w*\('\d+'\)/;

const racine = new URL('..', import.meta.url).pathname;

test('aucune cle de spacing depreciee dans packages/ et apps/', () => {
  const fautifs = ['packages', 'apps']
    .flatMap(dossier => fichiersSource(join(racine, dossier), nom => /\.tsx?$/.test(nom)))
    .filter(chemin => CLE_DEPRECIEE.test(readFileSync(chemin, 'utf8')));

  assert.deepEqual(fautifs, []);
});
