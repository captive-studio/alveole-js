import { focusRing } from './Focus';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

describe('focusRing sur le web', () => {
  it('rend un anneau visible', () => {
    expect(focusRing('default').outlineWidth).toBeGreaterThan(0);
  });

  it('contraste l anneau differemment sur un fond plein', () => {
    expect(focusRing('emphasis').outlineColor).not.toBe(focusRing('default').outlineColor);
  });

  // Sans outlineStyle, la valeur CSS par defaut est `none` : largeur et couleur ne
  // dessinent rien du tout.
  it('precise un style de contour, sinon rien ne s affiche', () => {
    expect(focusRing('default').outlineStyle).toBe('solid');
  });

  it('ecarte l anneau du bouton pour le detacher du fond', () => {
    expect(focusRing('default').outlineOffset).toBeGreaterThan(0);
  });
});
