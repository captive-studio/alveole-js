import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { AnchorHeading } from './AnchorHeading';

test("donne au lien d'ancre un nom accessible reprenant le titre de la section", () => {
  renderWeb(<AnchorHeading>Variantes</AnchorHeading>);

  expect(screen.getByRole('link', { name: 'Lien vers la section Variantes' })).toBeTruthy();
});
