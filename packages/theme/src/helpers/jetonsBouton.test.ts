import { CustomPalette, RadiusList } from '../constants';
import { couleursDeBouton, dimensionsDeBouton } from './jetonsBouton';
import { themeBrut } from './themeBrut';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

const theme = themeBrut();
const { background, text, border } = CustomPalette.light;

describe('les jetons du bouton', () => {
  it('lit les couleurs de chaque etat dans la palette', () => {
    expect(couleursDeBouton(theme, 'danger', 'repos')).toEqual({
      fond: background['action-high-error'],
      texte: text['inverted-grey'],
      bordure: border['plain-error'],
    });
    expect(couleursDeBouton(theme, 'secondary', 'desactive').bordure).toBe(border['disabled-grey']);
  });

  it('rend transparents le fond et la bordure absents de la table', () => {
    expect(couleursDeBouton(theme, 'tertiary', 'repos')).toMatchObject({ fond: 'transparent', bordure: 'transparent' });
  });

  it('donne a chaque taille son controle, son rayon et son libelle', () => {
    expect(dimensionsDeBouton(theme, 'sm')).toMatchObject({ height: 28, paddingInline: 8, rayon: RadiusList.sm });
    expect(dimensionsDeBouton(theme, 'lg').typo.fontSize).toBe(16);
  });
});
