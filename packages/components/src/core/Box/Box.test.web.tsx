import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { paletteDuTheme } from '@/__tests__/helpers/paletteDuTheme';
import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Box } from './Box';

const { background } = paletteDuTheme;

// Les tests web et les consommateurs ciblent les elements par leur nom (`sidebar-item`,
// `data-table-cell`...) : le nom de l'element rendu fait partie de l'API de Box.
test("rend un element nomme d'apres son tag", () => {
  const { container } = renderOnDesktop(<Box tag="x" />);

  expect(container.querySelector('x')).not.toBeNull();
});

test('rend un element box par defaut', () => {
  const { container } = renderOnDesktop(<Box />);

  expect(container.querySelector('box')).not.toBeNull();
});

// Box ne se limite pas a ses props de style propres : toute prop de style Tamagui passe.
test('laisse passer une prop de style Tamagui que Box ne declare pas', () => {
  const { container } = renderOnDesktop(<Box cursor="hover:pointer" />);

  expect(container.querySelector('box')?.className).toMatch(/_c-/);
});

// ADR 0031 : Tamagui rend une clause en classe atomique ; une valeur restee inline ne porterait
// aucun etat.
test('rend une clause en objet type en classe Tamagui', () => {
  const { container } = renderOnDesktop(
    <Box backgroundColor={{ default: background['default-grey'], hover: background['alt-grey'] }} />,
  );
  const box = elementDuType(container.querySelector('box'), HTMLElement);

  expect(box.className).toMatch(/_b-/);
  expect(box.style.backgroundColor).toBe('');
});

// ADR 0033 : Box n'accepte que les tokens du theme pour l'espacement, la couleur et le rayon.
// Chaque `@ts-expect-error` echoue a la compilation si le type se rouvre a la valeur brute.
test('refuse les valeurs brutes a la compilation', () => {
  // @ts-expect-error nombre d'espacement
  renderOnDesktop(<Box p={16} />);
  // @ts-expect-error token legacy
  renderOnDesktop(<Box p="050" />);
  // @ts-expect-error couleur brute
  renderOnDesktop(<Box backgroundColor="#f0f0f0" />);
  // @ts-expect-error clause en chaine, qui perd la marque des couleurs du theme
  renderOnDesktop(<Box backgroundColor="#f0f0f0 hover:#000" />);
  // @ts-expect-error rayon brut
  renderOnDesktop(<Box borderRadius={8} />);
});
