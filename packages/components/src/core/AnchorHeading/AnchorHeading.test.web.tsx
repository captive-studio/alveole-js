import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { AnchorHeading } from './AnchorHeading';

test("donne au lien d'ancre un nom accessible reprenant le titre de la section", () => {
  renderWeb(<AnchorHeading>Variantes</AnchorHeading>);

  expect(screen.getByRole('link', { name: 'Lien vers la section Variantes' })).toBeTruthy();
});

// L'ancre de section est un `<a>` brut : elle gardait le contour `1px auto` du navigateur au
// milieu de composants qui montrent tous la bague du kit.
it('demande la bague de focus au theme', () => {
  renderWeb(<AnchorHeading>Variantes</AnchorHeading>);

  expect(screen.getByRole('link').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
