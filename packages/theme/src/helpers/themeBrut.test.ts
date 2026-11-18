import { CustomPalette } from '../constants';
import { themeBrut } from './themeBrut';

jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

describe('le theme brut', () => {
  const theme = themeBrut();

  it('rend des valeurs, pas des variables CSS', () => {
    expect(theme.radius('md')).toBe(6);
    expect(theme.spacing('2W')).toBe(16);
    expect(theme.color.light.background['action-high-primary']).toBe(
      CustomPalette.light.background['action-high-primary'],
    );
  });

  it('donne a la typographie sa famille avec repli et son poids, meme hors web', () => {
    const { fontFamily, fontWeight } = theme.text['Corps de texte'].MD.Medium;
    expect(fontFamily).toMatch(/^Geist, .*sans-serif$/);
    expect(fontWeight).toBe('500');
  });

  it('prend la densite desktop des controles', () => {
    expect(theme.control('md')).toEqual({ height: 32, paddingInline: 12, gap: 8 });
  });
});
