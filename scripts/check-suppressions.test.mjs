import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { gelsNonVides, rapport } from './check-suppressions.mjs';

/** Un faux depot : un workspace par gel, avec le contenu qu'on veut lui donner. */
const depotAvec = gels => {
  const racine = mkdtempSync(join(tmpdir(), 'gels-'));
  for (const [workspace, contenu] of Object.entries(gels)) {
    mkdirSync(join(racine, 'packages', workspace), { recursive: true });
    writeFileSync(join(racine, 'packages', workspace, 'eslint-suppressions.json'), contenu);
  }

  return racine;
};

test('ne signale rien quand tous les gels sont vides', () => {
  const racine = depotAvec({ core: '{}\n', theme: '{\n}\n' });

  assert.deepEqual(gelsNonVides(racine), []);
});

test('signale un gel qui retient une offense', () => {
  const racine = depotAvec({
    core: '{}\n',
    storybook: JSON.stringify({ 'src/pages/UIKitPage.tsx': { complexity: { count: 1 } } }),
  });

  assert.deepEqual(gelsNonVides(racine), [
    { fichier: 'packages/storybook/eslint-suppressions.json', offenses: 1, regles: ['complexity'] },
  ]);
});

test('le rapport nomme le fichier, le compte et les regles', () => {
  const lignes = rapport([
    { fichier: 'packages/storybook/eslint-suppressions.json', offenses: 3, regles: ['complexity', 'max-lines'] },
  ]);

  assert.match(lignes, /packages\/storybook\/eslint-suppressions\.json/);
  assert.match(lignes, /3 offenses/);
  assert.match(lignes, /complexity, max-lines/);
});
