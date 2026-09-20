import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './FormControl.styles';

test('utilise le rayon de bordure de l echelle du theme sur le champ ferme', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.inputInner.borderRadius).toBe('var(--radius-md)');
});

// Le retrait horizontal du texte saisi doit venir de l'echelle de controle, pas d'un
// litteral d'espacement : c'est elle qui aligne un champ sur le bouton pose a cote de lui.
test('retire le texte saisi du bord selon l echelle de controle', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    gauche: result.current.input.paddingLeft,
    droite: result.current.input.paddingRight,
  }).toEqual({ gauche: 12, droite: 12 });
});

test('utilise le rayon de bordure de l echelle du theme sur les coins hauts de la modale', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    hautGauche: result.current.modalContent.borderTopLeftRadius,
    hautDroite: result.current.modalContent.borderTopRightRadius,
  }).toEqual({
    hautGauche: 'var(--radius-lg)',
    hautDroite: 'var(--radius-lg)',
  });
});

test('utilise le rayon de bordure de l echelle du theme sur le champ multiligne de la modale', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.modalInputContainer.borderRadius).toBe('var(--radius-md)');
});
