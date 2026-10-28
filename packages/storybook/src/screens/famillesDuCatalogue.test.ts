import { famillesDuCatalogue } from './famillesDuCatalogue';

const token = (chemin: string, famille: string) => ({
  chemin,
  famille,
  nuance: null,
  hex: 'transparent',
  deprecie: false,
  remplacant: null,
});

// `primary`, `danger`... sont declares a la racine de la palette : sans titre, leur section
// s'afficherait sans en-tete.
it('titre « racine » les tokens declares au premier niveau de la palette', () => {
  expect(famillesDuCatalogue({ tokens: [token('primary', '')] }).map(famille => famille.titre)).toEqual(['racine']);
});

it('range les tokens par famille dans l ordre ou le theme les declare', () => {
  const familles = famillesDuCatalogue({
    tokens: [
      token('light.text.a', 'light / text'),
      token('light.border.b', 'light / border'),
      token('light.text.c', 'light / text'),
    ],
  });

  expect(familles.map(({ titre, tokens }) => [titre, tokens.map(t => t.chemin)])).toEqual([
    ['light / text', ['light.text.a', 'light.text.c']],
    ['light / border', ['light.border.b']],
  ]);
});
