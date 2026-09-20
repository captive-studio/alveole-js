import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
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

// L'ancre est `opacity: 0` hors survol : atteinte au clavier, on se retrouvait sur un lien
// entierement invisible. Une bague autour de rien ne repare pas ca - le lien doit apparaitre.
// Ici un state React convient, contrairement a la bague : montrer le lien quelle que soit la
// provenance du focus est inoffensif, alors qu'une bague au clic ne l'est pas.
it('fait apparaitre l ancre quand elle prend le focus', () => {
  renderWeb(<AnchorHeading>Variantes</AnchorHeading>);
  const lien = screen.getByRole('link');

  fireEvent.focus(lien);

  expect(lien.style.opacity).toBe('1');
});
