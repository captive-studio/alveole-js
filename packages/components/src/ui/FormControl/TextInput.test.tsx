import { fireEvent, renderNative, userEvent, waitFor } from '@/__tests__/helpers/renderNative';
import { TextInput } from './TextInput';

it('rend un champ de saisie editable', async () => {
  const { getByDisplayValue } = await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />);

  expect(getByDisplayValue('Bonjour')).toBeTruthy();
});

// Hors web, un champ multiligne marque `openModal` n'est plus saisissable sur place :
// il devient un miroir en lecture seule qu'on presse pour ouvrir une modale, ou vit la
// vraie saisie. Le second champ portant la meme valeur signale la modale ouverte.
//
// `userEvent.press` et non `fireEvent.press` : sur ce Pressable, le second ne declenche
// rien du tout et n'emet aucun avertissement. Le test resterait vert en n'ayant jamais
// ouvert la modale.
it('ouvre la modale de saisie quand on presse un champ multiligne', async () => {
  const view = await renderNative(<TextInput value="Bonjour" multiline openModal onChangeText={() => undefined} />);
  expect(view.getAllByDisplayValue('Bonjour')).toHaveLength(1);

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getAllByDisplayValue('Bonjour')).toHaveLength(2);
});

// Le miroir reste pressable meme desactive : c'est le gestionnaire qui refuse d'ouvrir.
// Sans ce garde, un champ desactive offrirait quand meme une saisie dans la modale.
it('n ouvre pas la modale quand le champ est desactive', async () => {
  const view = await renderNative(
    <TextInput value="Bonjour" multiline openModal disabled onChangeText={() => undefined} />,
  );

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getAllByDisplayValue('Bonjour')).toHaveLength(1);
});

// Valider ferme la modale et rend la main a l'appelant. Le second champ disparait avec
// elle : c'est le signe que la fermeture a bien eu lieu, et pas seulement l'appel.
it('ferme la modale et previent l appelant quand on valide', async () => {
  const onModalSubmit = jest.fn();
  const view = await renderNative(
    <TextInput
      value="Bonjour"
      multiline
      openModal
      modalSubmitLabel="Valider"
      onModalSubmit={onModalSubmit}
      onChangeText={() => undefined}
    />,
  );
  const user = userEvent.setup();
  await user.press(view.getByRole('button'));
  // `onShow` est un rappel de la couche native, que Jest ne declenche jamais. Sans lui,
  // le composant considere la modale jamais prete et la validation reste verrouillee.
  fireEvent(view.root!.queryAll(i => String(i.type) === 'Modal')[0], 'show');

  await user.press(view.getByText('Valider'));

  expect(onModalSubmit).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(view.getAllByDisplayValue('Bonjour')).toHaveLength(1));
});

// Le bouton de validation existe des l'ouverture demandee, alors que la modale n'est pas
// encore a l'ecran : la couche native ne l'a pas signalee. Valider a cet instant viserait
// un champ qui n'existe pas encore, et l'appelant recevrait une valeur qu'il n'a pas vue.
it('ignore la validation tant que la modale n est pas affichee', async () => {
  const onModalSubmit = jest.fn();
  const view = await renderNative(
    <TextInput
      value="Bonjour"
      multiline
      openModal
      modalSubmitLabel="Valider"
      onModalSubmit={onModalSubmit}
      onChangeText={() => undefined}
    />,
  );
  const user = userEvent.setup();
  await user.press(view.getByRole('button'));

  await user.press(view.getByText('Valider'));

  expect(onModalSubmit).not.toHaveBeenCalled();
});

// iOS ne propose les adresses du trousseau qu'a un champ qui se declare courriel.
it('declare a iOS un champ de courriel', async () => {
  const { getByDisplayValue } = await renderNative(
    <TextInput type="email" value="a@b.fr" onChangeText={() => undefined} />,
  );

  expect(getByDisplayValue('a@b.fr').props.textContentType).toBe('emailAddress');
});

// Le bouton d'oeil change de fonction a chaque appui, sans que rien d'autre ne le dise : son
// nom accessible est le seul endroit ou cette bascule existe pour qui n'y voit pas l'icone.
// Un nom fixe serait donc faux la moitie du temps.
it('nomme le bouton d oeil selon ce qu il fera', async () => {
  const view = await renderNative(<TextInput type="password" value="secret" onChangeText={() => undefined} />);

  expect(view.getByRole('button', { name: 'Afficher le mot de passe' })).toBeTruthy();

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getByRole('button', { name: 'Masquer le mot de passe' })).toBeTruthy();
});

// iOS ne propose le trousseau qu'a un champ qui se declare mot de passe.
it('declare a iOS un champ de mot de passe', async () => {
  const { getByDisplayValue } = await renderNative(
    <TextInput type="password" value="secret" onChangeText={() => undefined} />,
  );

  expect(getByDisplayValue('secret').props.textContentType).toBe('password');
});

const champDeTelephone = async () => {
  const { getByDisplayValue } = await renderNative(
    <TextInput type="tel" value="0612345678" onChangeText={() => undefined} />,
  );

  return getByDisplayValue('0612345678').props;
};

// Un numero se tape au pave numerique, pas au clavier complet.
it('ouvre le pave telephonique pour un champ de telephone', async () => {
  expect((await champDeTelephone()).keyboardType).toBe('phone-pad');
});

// Le navigateur et Android ne proposent le numero de l'utilisateur qu'a un champ qui le demande.
it('demande l autocompletion du numero pour un champ de telephone', async () => {
  expect((await champDeTelephone()).autoComplete).toBe('tel');
});

// iOS ne propose le numero de la fiche contact qu'a un champ qui se declare telephone.
it('declare a iOS un champ de telephone', async () => {
  expect((await champDeTelephone()).textContentType).toBe('telephoneNumber');
});

// Un numero n'est pas un mot : la correction ne ferait que le deformer.
it('ne corrige pas un champ de telephone', async () => {
  expect((await champDeTelephone()).autoCorrect).toBe(false);
});
