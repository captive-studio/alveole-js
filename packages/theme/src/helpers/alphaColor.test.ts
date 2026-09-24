import { alpha } from './alphaColor';

describe('alpha', () => {
  it('rend une couleur hexadecimale en rgba avec son opacite', () => {
    expect(alpha('#336699', 0.5)).toBe('rgba(51, 102, 153, 0.5)');
  });

  it('double chaque chiffre d une couleur hexadecimale courte', () => {
    expect(alpha('#369', 1)).toBe('rgba(51, 102, 153, 1)');
  });

  it('refuse une couleur qui n est pas hexadecimale', () => {
    expect(() => alpha('#12345', 1)).toThrow('Invalid hex color');
  });

  // Sur le web, le theme rend des variables CSS : on ne peut pas les decomposer en canaux.
  it('melange une variable CSS avec du transparent', () => {
    expect(alpha('var(--primaire)', 0.25)).toBe('color-mix(in srgb, var(--primaire) 25%, transparent)');
  });
});
