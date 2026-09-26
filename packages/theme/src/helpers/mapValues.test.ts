import { mapValues } from './mapValues';

// Les parcours du theme transforment chaque valeur d'un objet sans toucher a ses cles : c'est
// ce qui permet a `Theme` de garder des cles connues sur un arbre reecrit pour le web.
it('applique la transformation a chaque valeur en gardant les cles', () => {
  expect(mapValues({ sm: 4, md: 6 }, valeur => valeur * 2)).toEqual({ sm: 8, md: 12 });
});
