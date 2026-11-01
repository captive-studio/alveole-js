import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extraireConsommateurs } from './composants-consommateurs.mjs';

const index = "export * from './Select';\n";

test('fait du composant qui cite un token un consommateur de ce token', () => {
  const fichiers = {
    'ui/index.ts': index,
    'ui/Select/Select.tsx': "const bordure = color.light.border['default-grey'];",
  };

  assert.deepEqual(extraireConsommateurs(fichiers), {
    'light.border.default-grey': [{ nom: 'Select', story: null }],
  });
});

test('liste une seule fois un composant dont plusieurs fichiers citent le token', () => {
  const fichiers = {
    'ui/index.ts': "export * from './Select';\nexport * from './Tag';\n",
    'ui/Select/Select.tsx': 'const a = color.light.system.focus;',
    'ui/Select/SelectTrigger.tsx': 'const b = theme.color.light.system.focus;',
    'ui/Tag/Tag.tsx': 'const c = color.light.system.focus;',
  };

  assert.deepEqual(extraireConsommateurs(fichiers)['light.system.focus'], [
    { nom: 'Select', story: null },
    { nom: 'Tag', story: null },
  ]);
});

test('ignore les stories, les tests et les demonstrations', () => {
  const citation = "color.light.text['mention-grey'];";
  const fichiers = {
    'ui/index.ts': index,
    'ui/Select/Select.stories.tsx': citation,
    'ui/Select/Select.stories.sources.ts': citation,
    'ui/Select/Select.test.web.tsx': citation,
    'ui/Select/Select.demo.tsx': citation,
  };

  assert.deepEqual(extraireConsommateurs(fichiers), {});
});

test('ne retient que les composants que le paquet exporte', () => {
  const fichiers = {
    'ui/index.ts': index,
    'ui/Interne/Interne.tsx': "color.light.text['mention-grey'];",
  };

  assert.deepEqual(extraireConsommateurs(fichiers), {});
});

// Le catalogue nomme la page d'un composant par le titre de sa story, pas par son dossier :
// la story de Page s'intitule `Pages`.
test('donne a un consommateur le titre de la story de son dossier', () => {
  const fichiers = {
    'core/index.ts': "export * from './Page';\n",
    'core/Page/Page.tsx': "color.light.background['default-grey'];",
    'core/Page/Page.stories.tsx': "const meta = {\n  title: 'Pages',\n};",
  };

  assert.deepEqual(extraireConsommateurs(fichiers)['light.background.default-grey'], [{ nom: 'Page', story: 'Pages' }]);
});

// Un « sans usage » faux inciterait a supprimer un token qui sert (ADR 0035).
test('echoue sur un token lu par une cle calculee', () => {
  const fichiers = {
    'ui/index.ts': index,
    'ui/Select/Select.tsx': 'const texte = color.light.text[variante];',
  };

  assert.throws(() => extraireConsommateurs(fichiers), /ui\/Select\/Select\.tsx.*color\.light\.text\[variante\]/);
});

// L'ordre de lecture du disque varie d'une machine a l'autre : le fichier genere, lui, ne doit pas.
test('range les consommateurs par nom', () => {
  const fichiers = {
    'ui/index.ts': "export * from './Select';\nexport * from './Tag';\n",
    'ui/Tag/Tag.tsx': 'color.light.system.focus;',
    'ui/Select/Select.tsx': 'color.light.system.focus;',
  };

  assert.deepEqual(
    extraireConsommateurs(fichiers)['light.system.focus'].map(consommateur => consommateur.nom),
    ['Select', 'Tag'],
  );
});
