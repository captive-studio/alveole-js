import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extraireCatalogueDesCouleurs } from './catalogue-des-couleurs.mjs';

const echelles = `export const Colors = {
  Neutre: {
    50: '#161616',
    900: '#DDDDDD',
  },
};`;

test('rend un token avec son chemin, sa famille, sa nuance et son hex', () => {
  const palette = `export const CustomPalette = {
  light: {
    border: {
      'default-grey': Colors['Neutre']['900'],
    },
  },
} as const;`;

  assert.deepEqual(extraireCatalogueDesCouleurs({ palette, echelles }).tokens, [
    {
      chemin: 'light.border.default-grey',
      famille: 'light / border',
      nuance: { echelle: 'Neutre', numero: '900' },
      hex: '#DDDDDD',
      deprecie: false,
      remplacant: null,
    },
  ]);
});

// Cinq hex sont partages entre echelles dans le theme : seule la reference ecrite rattache un
// token a sa nuance (ADR 0035).
test('rattache a la nuance ecrite meme quand une autre echelle porte le meme hex', () => {
  const echellesPartagees = `export const Colors = {
  Blanc: { 1000: '#FFFFFF' },
  Neutre: { 1000: '#FFFFFF' },
};`;
  const palette = `export const CustomPalette = {
  light: { background: { 'default-grey': Colors.Neutre['1000'] } },
} as const;`;

  const [token] = extraireCatalogueDesCouleurs({ palette, echelles: echellesPartagees }).tokens;

  assert.deepEqual(token.nuance, { echelle: 'Neutre', numero: '1000' });
});

test('rend un token deprecie avec le texte de son remplacant', () => {
  const palette = `export const CustomPalette = {
  /** @deprecated Utiliser light.text['title-grey'] */
  titre: Colors['Neutre']['50'],
} as const;`;

  const [token] = extraireCatalogueDesCouleurs({ palette, echelles }).tokens;

  assert.equal(token.deprecie, true);
  assert.equal(token.remplacant, "Utiliser light.text['title-grey']");
});

// Dans le theme, des groupes entiers sont deprecies sans que chaque feuille le repete.
test('herite la deprecation du groupe le plus proche qui la porte', () => {
  const palette = `export const CustomPalette = {
  /** @deprecated Utiliser light.background */
  button: {
    primary: { default: Colors['Neutre']['50'] },
  },
} as const;`;

  const [token] = extraireCatalogueDesCouleurs({ palette, echelles }).tokens;

  assert.equal(token.remplacant, 'Utiliser light.background');
});

test('rend une valeur ecrite en dur sans nuance', () => {
  const palette = `export const CustomPalette = {
  light: { background: { 'transparent-hover': 'rgba(0, 0, 0, 0.04)' } },
} as const;`;

  const [token] = extraireCatalogueDesCouleurs({ palette, echelles }).tokens;

  assert.equal(token.nuance, null);
  assert.equal(token.hex, 'rgba(0, 0, 0, 0.04)');
});

// Une ligne vide ou fausse dans la doc serait pire qu'un build en echec (ADR 0035).
test('echoue en nommant le token quand son ecriture n est pas reconnue', () => {
  const palette = `export const CustomPalette = {
  light: { text: { 'title-grey': titre, 'mention-grey': assombrir(Colors['Neutre']['50']) } },
} as const;`;

  assert.throws(() => extraireCatalogueDesCouleurs({ palette, echelles }), /light\.text\.title-grey/);
});

test('echoue en nommant le token quand sa nuance n existe pas', () => {
  const palette = `export const CustomPalette = {
  light: { text: { 'title-grey': Colors['Neutre']['999'] } },
} as const;`;

  assert.throws(() => extraireCatalogueDesCouleurs({ palette, echelles }), /light\.text\.title-grey/);
});

test('lit CustomPalette meme quand une autre constante la precede', () => {
  const palette = `const opacite = { voile: 'rgba(0, 0, 0, 0.5)' };
export const CustomPalette = {
  light: { border: { 'default-grey': Colors['Neutre']['900'] } },
} as const;`;

  const [token] = extraireCatalogueDesCouleurs({ palette, echelles }).tokens;

  assert.equal(token.chemin, 'light.border.default-grey');
});

// Un spread cache ses tokens a l'extraction : le build echoue en nommant le groupe.
test('echoue en nommant le groupe quand il etale un autre objet', () => {
  const palette = `export const CustomPalette = {
  light: { text: { ...textesCommuns } },
} as const;`;

  assert.throws(() => extraireCatalogueDesCouleurs({ palette, echelles }), /light\.text/);
});

// La page des nuances liste, sous chaque cran, les tokens qui le citent : actifs et deprecies
// comptent a part, et une nuance que rien ne cite ressort avec deux listes vides.
test('rend chaque nuance avec ses tokens actifs et deprecies', () => {
  const palette = `export const CustomPalette = {
  light: { border: { 'default-grey': Colors['Neutre']['900'] } },
  /** @deprecated Utiliser light.border['default-grey'] */
  bordure: Colors['Neutre']['900'],
} as const;`;

  assert.deepEqual(extraireCatalogueDesCouleurs({ palette, echelles }).nuances, [
    { echelle: 'Neutre', numero: '50', hex: '#161616', tokens: [], tokensDeprecies: [] },
    {
      echelle: 'Neutre',
      numero: '900',
      hex: '#DDDDDD',
      tokens: ['light.border.default-grey'],
      tokensDeprecies: ['bordure'],
    },
  ]);
});
