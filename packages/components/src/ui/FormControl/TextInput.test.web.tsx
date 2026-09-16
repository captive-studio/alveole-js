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
