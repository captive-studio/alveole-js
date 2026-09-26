import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { TextInput } from './TextInput';

// `openModal` ne vaut que hors web : le navigateur sait deja agrandir une zone de texte,
// et une modale y prendrait la place d'une saisie qui marche. Le champ reste donc
// saisissable sur place, sans miroir ni modale, meme marque `openModal`.
test('ignore openModal sur le web et laisse le champ saisissable', () => {
  renderWeb(<TextInput value="Bonjour" multiline openModal onChangeText={() => undefined} />);

  expect(screen.getAllByDisplayValue('Bonjour')).toHaveLength(1);
  expect(screen.queryByRole('button')).toBeNull();
});

// Un champ desactive doit l'etre pour le clavier et pour les technologies d'assistance, pas
// seulement pour l'oeil. `readOnly` le laisse focusable et soumis avec le formulaire : il dit
// « on ne peut pas modifier », la ou `disabled` dit « ce champ ne participe pas ».
test('desactive vraiment un champ desactive, au lieu de le figer en lecture seule', () => {
  renderWeb(<TextInput value="Fige" disabled onChangeText={() => undefined} />);
  const champ = elementDuType(screen.getByDisplayValue('Fige'), HTMLInputElement);

  expect({ disabled: champ.disabled, readOnly: champ.readOnly }).toEqual({ disabled: true, readOnly: false });
});

// ADR 0026 : un courriel n'a pas de comportement propre, il n'a donc pas de composant. Le
// `type` suffit, comme chez Base et Primer, et le navigateur en tire clavier et validation.
test('declare au navigateur un champ de courriel', () => {
  renderWeb(<TextInput type="email" value="a@b.fr" onChangeText={() => undefined} />);

  expect(screen.getByDisplayValue('a@b.fr').getAttribute('type')).toBe('email');
});

test('propose au navigateur les courriels deja connus', () => {
  renderWeb(<TextInput type="email" value="a@b.fr" onChangeText={() => undefined} />);

  expect(screen.getByDisplayValue('a@b.fr').getAttribute('autocomplete')).toBe('email');
});

test('ne corrige ni ne capitalise un courriel', () => {
  renderWeb(<TextInput type="email" value="a@b.fr" onChangeText={() => undefined} />);
  const champ = screen.getByDisplayValue('a@b.fr');

  expect([champ.getAttribute('autocorrect'), champ.getAttribute('autocapitalize')]).toEqual(['off', 'none']);
});

// ADR 0026 : le mot de passe est un `type` du champ texte, comme chez Base, et non un composant.
test('masque la saisie d un mot de passe', () => {
  renderWeb(<TextInput type="password" value="secret" onChangeText={() => undefined} />);

  expect(screen.getByDisplayValue('secret').getAttribute('type')).toBe('password');
});

test("annonce un jeton d'auto-remplissage de mot de passe reconnu par le navigateur", () => {
  renderWeb(<TextInput type="password" value="secret" onChangeText={() => undefined} />);

  expect(screen.getByDisplayValue('secret').getAttribute('autocomplete')).toBe('current-password');
});

test('ne capitalise pas un mot de passe', () => {
  renderWeb(<TextInput type="password" value="secret" onChangeText={() => undefined} />);

  expect(screen.getByDisplayValue('secret').getAttribute('autocapitalize')).toBe('none');
});
