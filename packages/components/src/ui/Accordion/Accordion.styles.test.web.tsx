import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Accordion.styles';

test('utilise le rayon de bordure de l echelle du theme sur l accordeon arrondi', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.accordionRounded.borderRadius).toBe('var(--radius-lg)');
});
