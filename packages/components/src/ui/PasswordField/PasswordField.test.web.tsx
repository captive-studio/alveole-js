import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { PasswordField } from './PasswordField';

test("annonce un jeton d'auto-remplissage reconnu par le navigateur", () => {
  renderWeb(<PasswordField label="Mot de passe" />);

  expect(screen.getByLabelText('Mot de passe').getAttribute('autocomplete')).toBe('current-password');
});
