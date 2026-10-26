import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Typography } from './Typography';

// Les tests web et les consommateurs ciblent les textes par leur nom : le nom de l'element
// rendu fait partie de l'API de Typography.
test("rend un element nomme d'apres son tag", () => {
  const { container } = renderOnDesktop(<Typography tag="x">Texte</Typography>);

  expect(container.querySelector('x')).not.toBeNull();
});

test('rend un element typography par defaut', () => {
  const { container } = renderOnDesktop(<Typography>Texte</Typography>);

  expect(container.querySelector('typography')).not.toBeNull();
});

// ADR 0031 : comme Box, Typography laisse passer les clauses de Tamagui v3 telles quelles.
test('rend une clause de survol en classe Tamagui', () => {
  const { container } = renderOnDesktop(<Typography cursor="hover:pointer">Texte</Typography>);

  expect(container.querySelector('typography')?.className).toMatch(/_c-/);
});
