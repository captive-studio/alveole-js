import { render, screen } from '@/__tests__/helpers/render.web';
import { AnchorHeading } from './AnchorHeading';

test("donne au lien d'ancre un nom accessible reprenant le titre de la section", () => {
  render(<AnchorHeading>Variantes</AnchorHeading>);

  expect(screen.getByRole('link', { name: 'Lien vers la section Variantes' })).toBeTruthy();
});
