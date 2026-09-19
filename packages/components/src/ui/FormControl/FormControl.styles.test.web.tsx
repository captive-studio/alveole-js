import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './FormControl.styles';

test('utilise le rayon de bordure de l echelle du theme sur le champ ferme', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.inputInner.borderRadius).toBe('var(--radius-md)');
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
