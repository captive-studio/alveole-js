import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import {
  FICHIER_DE_BASE,
  ecartsAuCliquet,
  estSurveille,
  rapport,
  releverDansSource,
  releverDepot,
} from './dimension-brute.mjs';

const racine = new URL('..', import.meta.url).pathname;

test('le depot respecte sa base de valeurs brutes', () => {
  const releve = releverDepot(racine);
  const ecarts = ecartsAuCliquet(releve, JSON.parse(readFileSync(join(racine, FICHIER_DE_BASE), 'utf8')));

  assert.deepEqual(ecarts, [], rapport(ecarts, releve));
});

test('releve une largeur brute passee en style a Box', () => {
  assert.deepEqual(releverDansSource(`<Box style={{ width: 340 }} />`, 'f.tsx'), [`f.tsx:1 width=340`]);
});

test('releve une opacite brute dans un objet de style hors Box', () => {
  assert.deepEqual(releverDansSource(`const styles = StyleSheet.create({ voile: { opacity: 0.5 } });`, 'f.ts'), [
    `f.ts:1 opacity=0.5`,
  ]);
});

test('releve toute la famille des dimensions, de la typographie et du placement', () => {
  const cles = [
    'height',
    'minWidth',
    'maxHeight',
    'fontSize',
    'lineHeight',
    'letterSpacing',
    'flexBasis',
    'top',
    'left',
    'right',
    'bottom',
    'inset',
    'outlineWidth',
    'outlineOffset',
  ];

  assert.deepEqual(
    cles.flatMap(cle => releverDansSource(`({ ${cle}: 12 })`, 'f.ts')),
    cles.map(cle => `f.ts:1 ${cle}=12`),
  );
});

test('ne releve pas le zero', () => {
  assert.deepEqual(releverDansSource(`({ minWidth: 0, top: 0 })`, 'f.ts'), []);
});

test("releve une valeur negative dans une branche d'un ternaire", () => {
  assert.deepEqual(releverDansSource(`({ outlineOffset: actif ? -4 : 0 })`, 'f.ts'), [`f.ts:1 outlineOffset=-4`]);
});

test('releve une pile de polices ecrite en dur', () => {
  assert.deepEqual(releverDansSource(`({ mono: { fontFamily: 'ui-monospace, Menlo' } })`, 'f.ts'), [
    `f.ts:1 fontFamily='ui-monospace, Menlo'`,
  ]);
});

test("releve une dimension en pixels ecrite en texte, pas une valeur d'appareil", () => {
  assert.deepEqual(releverDansSource(`({ width: '340px', maxHeight: '90vh', height: '100%' })`, 'f.ts'), [
    `f.ts:1 width='340px'`,
  ]);
});

test('le cliquet signale un fichier qui depasse sa base', () => {
  const releve = ['a.tsx:1 width=340', 'a.tsx:2 height=44', 'b.tsx:3 opacity=0.5'];

  assert.deepEqual(ecartsAuCliquet(releve, { 'a.tsx': 1, 'b.tsx': 1 }), [{ fichier: 'a.tsx', base: 1, mesure: 2 }]);
});

test('le cliquet reclame la baisse de la base quand un fichier a ete corrige', () => {
  assert.deepEqual(ecartsAuCliquet(['a.tsx:1 width=340'], { 'a.tsx': 2, 'b.tsx': 1 }), [
    { fichier: 'a.tsx', base: 2, mesure: 1 },
    { fichier: 'b.tsx', base: 1, mesure: 0 },
  ]);
});

test('le rapport nomme le fichier, dit de passer par un token et quand abaisser la base', () => {
  const texte = rapport(
    [
      { fichier: 'a.tsx', base: 1, mesure: 2 },
      { fichier: 'b.tsx', base: 2, mesure: 1 },
    ],
    ['a.tsx:1 width=340', 'a.tsx:2 height=44', 'b.tsx:3 opacity=0.5'],
  );

  assert.match(texte, /a\.tsx : 2 valeurs brutes, base a 1/);
  assert.match(texte, /a\.tsx:2 height=44/);
  assert.match(texte, /token du theme/);
  assert.match(texte, /b\.tsx : 1 valeur brute, base a 2 \(abaissez-la a 1\)/);
});

test('surveille le code de production, pas les tests, stories, demos ni e2e', () => {
  const chemins = {
    'packages/storybook/src/screens/ThemeNuancesScreen.tsx': true,
    'packages/components/src/ui/Button/Button.styles.ts': true,
    'apps/docs/src/app/page.tsx': true,
    'packages/components/src/ui/Button/Button.test.web.tsx': false,
    'packages/components/src/ui/Button/Button.stories.tsx': false,
    'packages/components/src/ui/Button/Button.stories.sources.ts': false,
    'packages/components/src/ui/DataTable/DataTable.demo.deployments.tsx': false,
    'packages/components/__tests__/helpers/rendu.tsx': false,
    'apps/docs/e2e/nuances.spec.ts': false,
    'packages/components/src/index.d.ts': false,
  };

  assert.deepEqual(
    Object.keys(chemins).filter(estSurveille),
    Object.keys(chemins).filter(chemin => chemins[chemin]),
  );
});

test("ne releve pas l'opacite pleine, valeur neutre comme le zero", () => {
  assert.deepEqual(releverDansSource(`({ opacity: 1 })`, 'f.ts'), []);
});
