import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Counter.styles';

// Le compteur n'a qu'une taille, et elle tombait deja sur 20 px de haut et 6 px de retrait
// (mesure navigateur) : exactement le cran `sm` de l'echelle. Mais par accident, la hauteur
// venant de la hauteur de ligne et le retrait d'un litteral. Le brancher sur l'echelle ne
// change donc rien a l'ecran, et rend le compteur solidaire des deux autres puces.
it('reprend le cran sm de l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    hauteur: result.current.counter.height,
    retrait: result.current.counter.paddingLeft,
  }).toEqual({ hauteur: 20, retrait: 6 });
});
