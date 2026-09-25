import { act, renderOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Button } from '../Button';
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
  const champ = screen.getByDisplayValue('Fige') as HTMLInputElement;

  expect({ disabled: champ.disabled, readOnly: champ.readOnly }).toEqual({ disabled: true, readOnly: false });
});

// Sans fond distinct, un champ desactive ne se reconnait qu'a son libelle pali : le cadre, le
// fond et la valeur restent ceux d'un champ ou l'on peut ecrire. Primer et Atlassian grisent
// le champ lui-meme, parce que c'est lui qui est hors d'usage, pas son intitule.
test('grise le fond d un champ desactive', () => {
  renderWeb(<TextInput value="Fige" disabled onChangeText={() => undefined} />);
  const cadre = screen.getByDisplayValue('Fige').parentElement!;

  expect(window.getComputedStyle(cadre).backgroundColor).toBe('rgb(230, 234, 241)');
});

// Le cadre porte la bordure ; le champ lui-meme n'est qu'un texte sans contour.
const cadre = (valeur: string) => screen.getByDisplayValue(valeur).parentElement!;

// `HTMLElement.focus()` est exactement ce que produisent le clic, le toucher et la touche
// Tab : le navigateur les fait tous converger vers le meme evenement, et le composant n'en
// ecoute qu'un. Distinguer les trois ici ne testerait que jsdom.
const focaliser = (valeur: string) => act(() => screen.getByDisplayValue(valeur).focus());

const flouter = (valeur: string) => act(() => screen.getByDisplayValue(valeur).blur());

test('colore la bordure du cadre avec le token de focus, sans l epaissir', () => {
  renderWeb(<TextInput value="Bonjour" onChangeText={() => undefined} />);

  focaliser('Bonjour');

  const style = window.getComputedStyle(cadre('Bonjour'));
  expect({ couleur: style.borderTopColor, epaisseur: style.borderTopWidth }).toEqual({
    couleur: 'rgb(10, 118, 246)',
    epaisseur: '1px',
  });
});

// Amendement de l'ADR 0016 : le cadre focalise porte un anneau, mais encastre - il se dessine
// a l'interieur, donc il ne pousse rien et ne redonne pas le double cadre que l'ADR 0012
// supprime. C'est le traitement de Primer sur son `TextInputWrapper`. L'ombre, elle, reste
// proscrite : un `boxShadow` deborderait au-dela du cadre.
test('encastre l anneau du cadre focalise, et n y pose aucune ombre', () => {
  renderWeb(<TextInput value="Bonjour" onChangeText={() => undefined} />);

  focaliser('Bonjour');

  const style = window.getComputedStyle(cadre('Bonjour'));
  expect({ ecart: style.outlineOffset, ombre: style.boxShadow }).toEqual({ ecart: '-2px', ombre: '' });
});

// Pendant la saisie, c'est le champ actif qu'il faut pouvoir designer sans ambiguite ; le
// verdict de validation attend le blur pour reprendre la main.
test('couvre la couleur d erreur tant que le champ a le focus, puis la restitue', () => {
  renderWeb(<TextInput value="Bonjour" error="Trop court" onChangeText={() => undefined} />);
  const erreur = window.getComputedStyle(cadre('Bonjour')).borderTopColor;

  focaliser('Bonjour');
  const pendantLeFocus = window.getComputedStyle(cadre('Bonjour')).borderTopColor;
  flouter('Bonjour');

  expect({ pendantLeFocus, apresLeBlur: window.getComputedStyle(cadre('Bonjour')).borderTopColor }).toEqual({
    pendantLeFocus: 'rgb(10, 118, 246)',
    apresLeBlur: erreur,
  });
});

// Un champ en lecture seule reste atteignable au clavier, mais ne doit pas se presenter
// comme modifiable.
test('ne colore pas la bordure d un champ en lecture seule', () => {
  renderWeb(<TextInput value="Fige" readOnly onChangeText={() => undefined} />);
  const repos = window.getComputedStyle(cadre('Fige')).borderTopColor;

  focaliser('Fige');

  expect(window.getComputedStyle(cadre('Fige')).borderTopColor).toBe(repos);
});

// Le bouton est passe a `control('md').height` (32px) ; le champ etait reste a 42px en dur.
// Un bouton pose a cote d'un champ ne s'alignait plus. Voir plan harmonise/champs-boutons.
test('aligne la hauteur du champ sur celle du bouton md', () => {
  const { container } = renderOnDesktop(
    <>
      <TextInput />
      <Button variant="primary" title="Enregistrer" />
    </>,
  );

  const champ = container.querySelector('form-control-text-input-inner');
  const bouton = screen.getByRole('button');

  expect(getComputedStyle(champ as Element).minHeight).toBe(getComputedStyle(bouton).height);
});
