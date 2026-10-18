import { renderWeb } from '@/__tests__/helpers/renderWeb';
import { Header } from './Header';

// Le lavis du survol passe par une clause de Tamagui v3, rendue en classe atomique : sans
// elle, le lien d'identite ne reagit plus au pointeur.
test("pose le lavis de survol du lien d'identite en classe Tamagui", () => {
  const { container } = renderWeb(<Header logo={null} title="Titre" homeHref="/" />);

  expect(container.querySelector('a-pressable')?.className).toMatch(/_b-/);
});
