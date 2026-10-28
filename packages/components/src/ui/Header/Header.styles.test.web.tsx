import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Header.styles';

// La barre du haut se détache du contenu blanc par le fond secondaire, comme une zone de
// chrome : le contenu reste la surface la plus claire de la page.
test('pose la barre sur le fond secondaire', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.container.backgroundColor).toBe('var(--background-alt-grey)');
});
