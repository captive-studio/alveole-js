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
