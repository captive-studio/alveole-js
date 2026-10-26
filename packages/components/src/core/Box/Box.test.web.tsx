import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Box } from './Box';

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

// ADR 0031 : Box laisse passer les clauses de Tamagui v3 telles quelles. Tamagui les rend en
// classe atomique ; une valeur restee inline ne porterait aucun etat.
test('rend une clause de survol en classe Tamagui, pas en style inline', () => {
  const { container } = renderOnDesktop(<Box backgroundColor="red hover:blue" />);
  const box = elementDuType(container.querySelector('box'), HTMLElement);

  expect(box.className).toMatch(/_b-/);
  expect(box.style.backgroundColor).toBe('');
});

// Box ne se limite pas a ses props de style propres : toute prop de style Tamagui passe.
test('laisse passer une prop de style Tamagui que Box ne declare pas', () => {
  const { container } = renderOnDesktop(<Box cursor="hover:pointer" />);

  expect(container.querySelector('box')?.className).toMatch(/_c-/);
});

test('rend une clause en objet type en classe Tamagui', () => {
  const { container } = renderOnDesktop(<Box backgroundColor={{ default: 'red', hover: 'var(--x)' }} />);
  const box = elementDuType(container.querySelector('box'), HTMLElement);

  expect(box.className).toMatch(/_b-/);
  expect(box.style.backgroundColor).toBe('');
});
