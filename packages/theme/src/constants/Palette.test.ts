import { CustomPalette } from './Palette';

// La palette `light` est un arbre regulier categorie -> jeton -> couleur : c'est ce qui
// permet de la traduire en variables CSS avec un type de sortie exact, sans assertion.
it('ne porte que des couleurs sous chaque categorie de la palette light', () => {
  const jetonsImbriques = Object.entries(CustomPalette.light).flatMap(([categorie, jetons]) =>
    Object.entries(jetons)
      .filter(([, valeur]) => typeof valeur !== 'string')
      .map(([jeton]) => `${categorie}.${jeton}`),
  );

  expect(jetonsImbriques).toEqual([]);
});
