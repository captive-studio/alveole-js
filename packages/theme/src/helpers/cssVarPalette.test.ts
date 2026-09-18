import { toCSSVarPalette } from './cssVarPalette';

// Sur web, une couleur de la palette n'est plus une valeur hex mais une reference a la
// variable CSS du theme, nommee `--${categorie}-${jeton}`. La transformation ne touche
// que la palette `light`, seule portee par le rendu web.
describe('toCSSVarPalette', () => {
  it('remplace une couleur par une reference a sa variable CSS', () => {
    const palette = { light: { fond: { primaire: '#ffffff' } } };

    expect(toCSSVarPalette(palette).light.fond.primaire).toBe('var(--fond-primaire)');
  });

  // Toutes les valeurs d'un jeton ne sont pas des couleurs : une opacite numerique, par
  // exemple, n'a pas de variable `--categorie-jeton` et doit traverser intacte.
  it('laisse intactes les valeurs de jeton non-chaines', () => {
    const palette = { light: { fond: { opacite: 0.5 } } };

    expect(toCSSVarPalette(palette).light.fond.opacite).toBe(0.5);
  });

  // La palette peut porter, a cote des categories de jetons, des entrees qui ne sont pas des
  // objets (un nom de theme, un drapeau). Faute d'etre une categorie, elle traverse intacte.
  it('laisse intactes les entrees de palette qui ne sont pas des categories', () => {
    const palette = { light: { fond: { primaire: '#fff' }, nom: 'clair' } };

    expect(toCSSVarPalette(palette).light.nom).toBe('clair');
  });
});
