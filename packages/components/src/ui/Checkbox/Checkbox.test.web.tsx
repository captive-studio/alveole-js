import { renderHookOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Checkbox } from './Checkbox';
import { useStyles } from './Checkbox.styles';

test('utilise le rayon de bordure de l echelle du theme sur la case a cocher', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.checkbox.borderRadius).toBe('var(--radius-md)');
});

test('utilise le rayon de bordure de l echelle du theme sur l indicateur coche', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.indicator.borderRadius).toBe('var(--radius-md)');
});

test('utilise le rayon de bordure de l echelle du theme sur la case a cocher sm', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.checkboxSm.borderRadius).toBe('var(--radius-sm)');
});

// Un seul mecanisme de bague dans tout le kit. La case passait par `focusVisibleStyle`, la
// prop declarative de Tamagui : le comportement etait juste, mais elle peignait l'ancien bleu
// `#0379EF` la ou la regle CSS du theme pose `#0A76F6`. Deux bleus voisins pour le meme etat,
// selon que le composant etait bati sur Tamagui ou non.
test('demande la bague de focus au theme plutot que de la peindre elle-meme', () => {
  renderWeb(<Checkbox />);

  expect(screen.getByRole('checkbox').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
