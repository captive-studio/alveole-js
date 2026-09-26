import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { FormControl } from '../FormControl';
import { TimeInput } from './TimeInput';

test("laisse le FormControl seul afficher le message d'erreur", async () => {
  const { getAllByText } = await renderNative(
    <FormControl label="Heure" error="Heure invalide">
      <TimeInput error="Heure invalide" />
    </FormControl>,
  );

  expect(getAllByText('Heure invalide')).toHaveLength(1);
});

test('préfixe un zéro quand le premier chiffre ne peut pas commencer une heure', async () => {
  await renderNative(<TimeInput />);

  await fireEvent.changeText(screen.getByPlaceholderText('HH:MM'), '5');

  expect(screen.getByDisplayValue('05:')).toBeTruthy();
});

test('ouvre le pavé numérique du téléphone', async () => {
  await renderNative(<TimeInput />);

  expect(screen.getByPlaceholderText('HH:MM').props.keyboardType).toBe('number-pad');
});
