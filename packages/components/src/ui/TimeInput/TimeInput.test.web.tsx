import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { TimeInput } from './TimeInput';

test('associe le libellé au champ', () => {
  renderWeb(<TimeInput label="Heure de rendez-vous" />);

  expect(screen.getByLabelText('Heure de rendez-vous')).toBeTruthy();
});

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderWeb(<TimeInput label="Heure" hint="Au format HH:MM" error="Heure invalide" />);

  expect(screen.getByText('Heure')).toBeTruthy();
  expect(screen.getByText('Au format HH:MM')).toBeTruthy();
  expect(screen.getByText('Heure invalide')).toBeTruthy();
});
