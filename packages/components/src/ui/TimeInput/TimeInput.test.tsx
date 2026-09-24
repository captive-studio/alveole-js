import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { TimeInput } from './TimeInput';

test('entoure le champ de son libellé, de son indice et de son message d erreur', async () => {
  const { getByText } = await renderNative(<TimeInput label="Heure" hint="Au format HH:MM" error="Heure invalide" />);

  expect(getByText('Heure')).toBeTruthy();
  expect(getByText('Au format HH:MM')).toBeTruthy();
  expect(getByText('Heure invalide')).toBeTruthy();
});

test('préfixe un zéro quand le premier chiffre ne peut pas commencer une heure', async () => {
  await renderNative(<TimeInput label="Heure" />);

  await fireEvent.changeText(screen.getByPlaceholderText('HH:MM'), '5');

  expect(screen.getByDisplayValue('05:')).toBeTruthy();
});

test('ouvre le pavé numérique du téléphone', async () => {
  await renderNative(<TimeInput label="Heure" />);

  expect(screen.getByPlaceholderText('HH:MM').props.keyboardType).toBe('number-pad');
});
