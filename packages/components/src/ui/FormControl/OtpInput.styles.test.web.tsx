import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './OtpInput.styles';

test('utilise le rayon de bordure de l echelle du theme sur la cellule', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.pinCodeContainerStyle.borderRadius).toBe('var(--radius-md)');
});

// La bibliotheque cache la vraie saisie derriere les cellules. Cette saisie prend le focus,
// et le navigateur lui posait son propre contour : mesure en navigateur, un champ clique
// affichait le `1px auto` gris-bleu de Chrome par-dessus des cellules dont la bordure venait
// deja de dire le focus. Deux indicateurs pour un seul etat, dont un qui n'est pas au kit.
// Meme parade que `FormControl`, qui eteint le contour de ses `input` pour la meme raison.
it('eteint le contour que le navigateur pose sur la saisie cachee', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.hiddenInputStyle.outline).toBe('none');
});
