import { renderNative, userEvent } from '@/__tests__/helpers/renderNative';
import { PasswordField } from './PasswordField';

// Le bouton d'oeil change de fonction a chaque appui, sans que rien d'autre ne le dise : son
// nom accessible est le seul endroit ou cette bascule existe pour qui n'y voit pas l'icone.
// Un nom fixe serait donc faux la moitie du temps.
it('nomme le bouton d oeil selon ce qu il fera', async () => {
  const view = await renderNative(<PasswordField label="Mot de passe" value="secret" onChange={() => undefined} />);

  expect(view.getByRole('button', { name: 'Afficher le mot de passe' })).toBeTruthy();

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getByRole('button', { name: 'Masquer le mot de passe' })).toBeTruthy();
});
