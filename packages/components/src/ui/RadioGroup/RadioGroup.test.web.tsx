import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './RadioGroup.styles';

// `focusStyle={styles.itemContainerActive}` (dans `RadioInput`) etait identique au style
// actif/presse : rien ne distinguait un bouton radio focalise au clavier d un bouton
// simplement selectionne.
//
// `getComputedStyle` ne resout pas `:focus-visible` dans jsdom : ce test verifie le token pose
// dans la table de styles, pas son application reelle au clavier - confirmee separement en
// navigateur (voir la verification visuelle du plan `focus-ring/controles-manquants`).
test('pose un anneau de focus sur le bouton radio', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.itemContainerFocused).toEqual({
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '#0379EF',
    outlineOffset: 2,
  });
});
