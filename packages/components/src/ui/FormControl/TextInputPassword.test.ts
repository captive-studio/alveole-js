import { iconeDeLOeil } from './TextInputPassword';

// L'oeil montre l'action et non l'etat : ouvert pour reveler un mot de passe masque, barre
// pour masquer un mot de passe visible.
it.each([
  [true, 'Eye'],
  [false, 'EyeOff'],
])('dessine l oeil selon que le mot de passe est masque (%s)', (masque, icone) => {
  expect(iconeDeLOeil(masque)).toBe(icone);
});
