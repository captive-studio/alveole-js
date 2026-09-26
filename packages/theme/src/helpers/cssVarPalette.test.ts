import { toCSSVarPalette } from './cssVarPalette';

// Sur web, une couleur de la palette n'est plus une valeur hex mais une reference a la
// variable CSS du theme, nommee `--${categorie}-${jeton}`. La transformation ne touche
// que la palette `light`, seule portee par le rendu web.
describe('toCSSVarPalette', () => {
  it('remplace une couleur par une reference a sa variable CSS', () => {
    const palette = { light: { fond: { primaire: '#ffffff' } } };

    expect(toCSSVarPalette(palette).light.fond.primaire).toBe('var(--fond-primaire)');
  });
});
