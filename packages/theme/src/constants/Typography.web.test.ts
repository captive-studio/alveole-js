import { CustomTypography } from './Typography';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

const famillesDe = (styles: Record<string, { fontFamily: string }>) =>
  Object.values(styles).map(style => style.fontFamily);

describe('la typographie des titres sur le web', () => {
  it('applique la police de titrage a tous les niveaux de titre', () => {
    expect(famillesDe(CustomTypography.Titres).every(famille => famille.includes('Geist'))).toBe(true);
  });

  it('applique la meme police de titrage aux titres alternatifs', () => {
    expect(famillesDe(CustomTypography['Titres alternatifs']).every(famille => famille.includes('Geist'))).toBe(true);
  });
});

// Le gras existe a 12, 14 et 16 px mais pas a 18 : rien ne le justifie, c'est un trou de
// l'echelle. Il s'est vu le jour ou une page a pose sa premiere phrase au cran 18.
test('offre le gras a chaque cran du corps de texte', () => {
  const sansGras = Object.entries(CustomTypography['Corps de texte'])
    .filter(([, graisses]) => !('Bold' in graisses))
    .map(([cran]) => cran);

  expect(sansGras).toEqual([]);
});
