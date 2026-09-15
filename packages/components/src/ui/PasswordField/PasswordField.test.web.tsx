import { render, screen } from '@/__tests__/helpers/render.web';
import { PasswordField } from './PasswordField';

test("annonce un jeton d'auto-remplissage reconnu par le navigateur", () => {
  render(<PasswordField label="Mot de passe" />);

  expect(screen.getByLabelText('Mot de passe').getAttribute('autocomplete')).toBe('current-password');
});
