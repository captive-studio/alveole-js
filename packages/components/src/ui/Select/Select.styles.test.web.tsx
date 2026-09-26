import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Select.styles';

// La hauteur venait deja de l'echelle de controle, le retrait restait un litteral
// d'espacement, si bien qu'un champ et un bouton accoles n'avaient pas le meme creux
// interne. L'alignement rendu, lui, se mesure dans le navigateur (apps/docs/e2e/select.spec.ts).
test('aligne le retrait horizontal du champ sur l echelle de controle', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    gauche: result.current.inputInner.paddingLeft,
    droite: result.current.inputInner.paddingRight,
  }).toEqual({ gauche: 12, droite: 12 });
});

test('utilise le rayon de bordure de l echelle du theme sur le champ ferme', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.inputInner.borderRadius).toBe('var(--radius-md)');
});
