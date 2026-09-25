import { act, fireEvent, renderNative, userEvent, waitFor } from '@/__tests__/helpers/renderNative';
import { focusBorder } from '@alveole/theme';
import { Box } from '../../core/Box';
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

// Le composant annule le rembourrage du cote d'un ornement : `endAdornment` pose
// `paddingRight: 0` sur le conteneur. Ca n'a aucun effet, le conteneur portant deja
// `padding: 0` : les 16 px reels vivent sur le champ enfant, que l'ornement ne touche
// pas. Ce test fige l'apparence reelle, pas l'intention : la corriger deplacerait le
// texte de tous les champs a ornement de toutes les applications, et releve du design.
it('laisse le rembourrage du texte inchange quand un ornement est present', async () => {
  const champ = async (endAdornment?: React.ReactNode) => {
    const view = await renderNative(
      <TextInput value="Bonjour" endAdornment={endAdornment} onChangeText={() => undefined} />,
    );
    return view.getByDisplayValue('Bonjour').props.style;
  };

  expect((await champ(<Box tag="ornement" />)).paddingRight).toBe((await champ()).paddingRight);
});

// Le contour de focus est pose sur le conteneur, pas sur le champ : c'est lui qui porte
// la bordure visible. L'etat est tenu par le composant, pas par la plateforme.
const contour = (view: Awaited<ReturnType<typeof renderNative>>) =>
  view.root?.queryAll(i => i.type === 'View')[0]?.props.style.borderColor;

// `act` et non une lecture directe : `fireEvent` planifie la mise a jour d'etat sans
// vider la file de rendu. Lue tout de suite apres, la bordure est encore celle d'avant,
// et une assertion « elle n'a pas change » passerait sans rien prouver.
const focaliser = async (view: Awaited<ReturnType<typeof renderNative>>, valeur: string) => {
  await act(async () => {
    fireEvent(view.getByDisplayValue(valeur), 'focus');
  });
};

it('colore la bordure du conteneur quand le champ prend le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />);
  const repos = contour(view);

  await focaliser(view, 'Bonjour');

  expect(contour(view)).not.toBe(repos);
});

it('retire le contour quand le champ perd le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />);
  const repos = contour(view);
  await focaliser(view, 'Bonjour');

  await act(async () => {
    fireEvent(view.getByDisplayValue('Bonjour'), 'blur');
  });

  expect(contour(view)).toBe(repos);
});

// Un champ en lecture seule peut recevoir le focus du clavier, mais ne doit pas se
// presenter comme modifiable : le contour de saisie reste absent.
it('ne colore pas la bordure quand le champ est en lecture seule', async () => {
  const view = await renderNative(<TextInput value="Fige" readOnly onChangeText={() => undefined} />);
  const repos = contour(view);

  await focaliser(view, 'Fige');

  expect(contour(view)).toBe(repos);
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

// Le cadre entier, et non sa seule couleur : l'epaisseur et l'absence de contour exterieur
// se lisent sur les memes proprietes.
const cadre = (view: Awaited<ReturnType<typeof renderNative>>) =>
  view.root?.queryAll(i => i.type === 'View')[0]?.props.style;

// Une bordure qui s'epaissirait au focus pousserait le texte du champ d'un pixel a chaque
// fois que le curseur y entre.
it('garde la bordure a 1 px quand le champ prend le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />);

  await focaliser(view, 'Bonjour');

  expect(cadre(view).borderWidth).toBe(1);
});

// Le focus se lit sur la bordure du cadre, pas autour de lui : c'est le double contour que
// l'ADR 0012 supprime. Un `outline` ou une ombre qui reviendrait ici le ferait reapparaitre.
it('n entoure le champ focalise d aucun contour ni ombre', async () => {
  const view = await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />);

  await focaliser(view, 'Bonjour');

  const { outlineWidth, outlineStyle, outlineColor, boxShadow } = cadre(view);
  expect({ outlineWidth, outlineStyle, outlineColor, boxShadow }).toEqual({
    outlineWidth: undefined,
    outlineStyle: undefined,
    outlineColor: undefined,
    boxShadow: undefined,
  });
});

it('colore la bordure du champ en erreur', async () => {
  const repos = contour(await renderNative(<TextInput value="Bonjour" onChangeText={() => undefined} />));
  const view = await renderNative(<TextInput value="Bonjour" error="Trop court" onChangeText={() => undefined} />);

  expect(contour(view)).not.toBe(repos);
});

// Pendant la saisie, c'est le champ actif qu'il faut pouvoir designer sans ambiguite : le
// verdict de validation attend le blur pour reprendre la main.
it('couvre la couleur d erreur tant que le champ a le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" error="Trop court" onChangeText={() => undefined} />);
  const erreur = contour(view);

  await focaliser(view, 'Bonjour');

  expect(contour(view)).toBe(focusBorder().borderColor);
  expect(contour(view)).not.toBe(erreur);
});

it('rend la couleur d erreur au champ quand il perd le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" error="Trop court" onChangeText={() => undefined} />);
  const erreur = contour(view);
  await focaliser(view, 'Bonjour');

  await act(async () => {
    fireEvent(view.getByDisplayValue('Bonjour'), 'blur');
  });

  expect(contour(view)).toBe(erreur);
});

it('rend la couleur de succes au champ quand il perd le focus', async () => {
  const view = await renderNative(<TextInput value="Bonjour" success="Parfait" onChangeText={() => undefined} />);
  const succes = contour(view);
  await focaliser(view, 'Bonjour');

  await act(async () => {
    fireEvent(view.getByDisplayValue('Bonjour'), 'blur');
  });

  expect(contour(view)).toBe(succes);
});

// Un champ desactive garde son apparence de champ hors d'usage : le focus ne la recouvre pas.
it('ne colore pas la bordure quand le champ est desactive', async () => {
  const view = await renderNative(<TextInput value="Fige" disabled onChangeText={() => undefined} />);
  const desactive = contour(view);

  await focaliser(view, 'Fige');

  expect(contour(view)).toBe(desactive);
});

// iOS ne propose les adresses du trousseau qu'a un champ qui se declare courriel.
it('declare a iOS un champ de courriel', async () => {
  const { getByDisplayValue } = await renderNative(
    <TextInput type="email" value="a@b.fr" onChangeText={() => undefined} />,
  );

  expect(getByDisplayValue('a@b.fr').props.textContentType).toBe('emailAddress');
});
