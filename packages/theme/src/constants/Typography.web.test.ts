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
