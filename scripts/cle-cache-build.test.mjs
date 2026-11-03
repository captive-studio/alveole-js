import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { cheminsDivergents, entreesDuBuild, entreesNonCouvertes } from './cle-cache-build.mjs';

const actionAvec = (restauration, sauvegarde) =>
  [
    'steps:',
    '  - uses: actions/cache/restore@sha',
    '    with:',
    '      path: |',
    ...restauration.map(chemin => `        ${chemin}`),
    '      key: cle',
    '  - uses: actions/cache/save@sha',
    '    with:',
    '      path: |',
    ...sauvegarde.map(chemin => `        ${chemin}`),
    '      key: cle',
  ].join('\n');

test('signale un chemin restauré mais jamais sauvegardé', () => {
  assert.deepEqual(cheminsDivergents(actionAvec(['packages/*/dist', 'src/generated'], ['packages/*/dist'])), [
    'src/generated',
  ]);
});

const action = readFileSync(new URL('../.github/actions/build-packages/action.yml', import.meta.url), 'utf8');

test("l'action restaure et sauvegarde les mêmes chemins", () => {
  assert.deepEqual(cheminsDivergents(action), []);
});

test("signale une entrée du build qu'aucun motif de la clé ne hache", () => {
  const action = "key: build-${{ hashFiles('scripts/**', 'tsconfig.json') }}";

  assert.deepEqual(entreesNonCouvertes(action, ['scripts/a.mjs', 'tsconfig.json', 'pnpm-workspace.yaml']), [
    'pnpm-workspace.yaml',
  ]);
});

/** Un faux dépôt : chaque clé est un chemin relatif, chaque valeur son contenu. */
const depotAvec = fichiers => {
  const racine = mkdtempSync(join(tmpdir(), 'cle-cache-'));
  for (const [chemin, contenu] of Object.entries(fichiers)) {
    mkdirSync(dirname(join(racine, chemin)), { recursive: true });
    writeFileSync(join(racine, chemin), contenu);
  }

  return racine;
};

test('compte comme entrée un script racine appelé par un script de paquet', () => {
  const racine = depotAvec({
    'packages/storybook/package.json': JSON.stringify({
      scripts: {
        build: 'pnpm run generate:sources && tsc',
        'generate:sources': 'node ../../scripts/generer.mjs',
        test: 'node ../../scripts/autre.mjs',
      },
    }),
    'scripts/generer.mjs': '',
  });

  assert.deepEqual(entreesDuBuild(racine), ['scripts/generer.mjs']);
});

test('suit les imports relatifs des scripts racine', () => {
  const racine = depotAvec({
    'packages/storybook/package.json': JSON.stringify({ scripts: { build: 'node ../../scripts/generer.mjs' } }),
    'scripts/generer.mjs': "import fs from 'node:fs';\nimport { extraire } from './catalogue.mjs';\n",
    'scripts/catalogue.mjs': "import { lire } from './lecture.mjs';\n",
    'scripts/lecture.mjs': '',
  });

  assert.deepEqual(entreesDuBuild(racine), ['scripts/generer.mjs', 'scripts/catalogue.mjs', 'scripts/lecture.mjs']);
});

test('compte comme entrée la config TypeScript dont hérite le build', () => {
  const racine = depotAvec({
    'packages/core/package.json': JSON.stringify({ scripts: { build: 'tsc -p tsconfig.build.json' } }),
    'packages/core/tsconfig.build.json': JSON.stringify({ extends: '../../tsconfig.json' }),
    'tsconfig.json': '{}',
  });

  assert.deepEqual(entreesDuBuild(racine), ['tsconfig.json']);
});

test("la clé de l'action hache toutes les entrées du build", () => {
  const depot = new URL('..', import.meta.url).pathname;

  assert.deepEqual(entreesNonCouvertes(action, entreesDuBuild(depot)), []);
});
