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

// Le navigateur donne a un input heure une boite plus haute que sa ligne (22 pour 20) : ses
// sous-champs internes ont leur propre retrait. Le champ debordait alors de la hauteur de
// controle.
test('fige la hauteur du champ saisi sur sa ligne', () => {
  renderWeb(<TimeInput label="Heure" />);

  expect(screen.getByLabelText('Heure').style.height).toBe('20px');
});
