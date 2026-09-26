import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Button } from './Button';

// Deux tests ont disparu d'ici : ils posaient un `fireEvent.focus` et attendaient un
// `outlineWidth` de 2 px en style inline. Ils figeaient le defaut plutot que la regle :
// `fireEvent.focus` ne dit pas d'ou vient le focus, si bien qu'ils passaient au vert pour un
// comportement qui, en navigateur, affichait aussi la bague au clic a la souris. Le test qui
// les remplace est en bas de ce fichier ; l'apparence de la bague, elle, se verifie en
// navigateur, jsdom ne resolvant pas `:focus-visible`.
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

// Les trois references bloquent l'interaction pendant le chargement : Primer retire son
// `onClick` et pose `aria-disabled`, Atlassian desactive le bouton, Base remplace son contenu.
// Ici le bouton restait cliquable, et un second clic relancait l'operation (constate en
// navigateur). Le `accessibilityState` pose par le composant n'y changeait rien : cette version
// de react-native-web l'ignore, et n'en rend aucun attribut.
test('se declare desactive pendant le chargement', () => {
  renderWeb(<Button variant="primary" title="Enregistrer" isLoading />);

  expect(screen.getByRole('button').getAttribute('aria-disabled')).toBe('true');
});

// Meme cause que le test precedent : `accessibilityState` ne produit aucun attribut ici, si
// bien que `expanded` - dont c'est la seule raison d'etre face a `selected` - ne posait rien
// dans le DOM. Le test natif qui le couvrait interroge les props de la vue React Native, pas
// le document, et restait vert.
test('pose aria-expanded quand il commande un panneau deplie', () => {
  renderWeb(<Button variant="tertiary" title="Filtres" expanded />);

  expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('true');
});

// Le bouton ne peint plus sa bague : il la demande au CSS du theme, qui la pose sur
// `:focus-visible`. C'est la seule facon de ne la montrer qu'au clavier : `Pressable` de
// react-native-web n'expose qu'un `focused` brut, sans notion de modalite, si bien que
// l'ancien state React affichait aussi la bague au clic (constate en navigateur).
test('demande la bague de focus au theme plutot que de la peindre lui-meme', () => {
  renderWeb(<Button variant="primary" title="Enregistrer" />);

  expect(screen.getByRole('button').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
