import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { DataTableRow } from './DataTableRow';

const ligne = (props: { onPress?: () => void; selected?: boolean }) => (
  <DataTableRow row={{}} rowIndex={0} rowKey="r1" columns={[]} {...props} />
);

// Tamagui v3 abandonne la clause d'une propriete que `style` pose aussi : le fond doit porter
// repos et survol sur sa seule prop, jamais en inline.
test("ne pose pas le fond d'une ligne cliquable en inline, pour que le survol le change", () => {
  const { container } = renderOnDesktop(ligne({ onPress: () => {} }));
  const element = elementDuType(container.querySelector('data-table-row'), HTMLElement);

  expect(element.style.backgroundColor).toBe('');
  expect(element.className).toMatch(/_b-/);
});
