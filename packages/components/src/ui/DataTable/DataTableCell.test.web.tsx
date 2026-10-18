import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { DataTableCell } from './DataTableCell';

// Le survol passe par une clause de Tamagui v3, rendue en classe atomique : sans elle, une
// cellule cliquable ne reagit plus au pointeur.
test("pose l'opacite de survol d'une cellule cliquable en classe Tamagui", () => {
  const { container } = renderOnDesktop(<DataTableCell onPress={() => {}}>A</DataTableCell>);

  expect(container.querySelector('data-table-cell')?.className).toMatch(/_o-/);
});
