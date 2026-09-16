import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Button } from './Button';

// `focusRing` ne rend un contour que sur le web : hors web il rend un objet vide, et l'etat
// de focus du bouton n'y est observable par rien. Ces tests vivent donc du cote web.
test("pose l'anneau de focus au focus clavier", () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);
  const bouton = screen.getByRole('button');

  fireEvent.focus(bouton);

  expect(bouton.style.outlineWidth).toBe('2px');
});

test("retire l'anneau de focus quand le bouton perd le focus", () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);
  const bouton = screen.getByRole('button');

  fireEvent.focus(bouton);
  fireEvent.blur(bouton);

  expect(bouton.style.outlineWidth).toBe('');
});

// Le bouton pose son propre `onFocus` pour tenir l'anneau : il doit donc rappeler celui de
// l'appelant, faute de quoi il l'avale silencieusement.
test("relaie le onFocus de l'appelant", () => {
  const onFocus = jest.fn();
  renderWeb(<Button variant="primary" title="Enregistrer" onFocus={onFocus} />);

  fireEvent.focus(screen.getByRole('button'));

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("relaie le onBlur de l'appelant", () => {
  const onBlur = jest.fn();
  renderWeb(<Button variant="primary" title="Enregistrer" onBlur={onBlur} />);

  fireEvent.blur(screen.getByRole('button'));

  expect(onBlur).toHaveBeenCalledTimes(1);
});
