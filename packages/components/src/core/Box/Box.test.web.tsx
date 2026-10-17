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
