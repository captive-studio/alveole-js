import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Checkbox.styles';

// `checkboxFocusStyles` (dans `CheckboxContainer`) valait `baseCheckboxStyles` tel quel : au
// clavier, rien ne distinguait une case focalisee d une case au repos.
//
// `getComputedStyle` ne resout pas `:focus-visible` dans jsdom (verifie hors Tamagui, avec une
// regle CSS ecrite a la main) : ce test verifie le token pose dans la table de styles, pas son
// application reelle au clavier - confirmee separement en navigateur (voir la verification
// visuelle du plan `focus-ring/controles-manquants`).
test('pose un anneau de focus sur la case a cocher', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.checkboxFocused).toEqual({
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '#0379EF',
    outlineOffset: 2,
  });
});
