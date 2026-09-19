import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Switch.styles';

// Aucune prop de focus n existait sur `Switch` : au clavier, rien ne distinguait un
// interrupteur focalise d un interrupteur au repos.
//
// `getComputedStyle` ne resout pas `:focus-visible` dans jsdom : ce test verifie le token pose
// dans la table de styles, pas son application reelle au clavier - confirmee separement en
// navigateur (voir la verification visuelle du plan `focus-ring/controles-manquants`).
test('pose un anneau de focus sur l interrupteur', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.switchButtonFocused).toEqual({
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '#0379EF',
    outlineOffset: 2,
  });
});
