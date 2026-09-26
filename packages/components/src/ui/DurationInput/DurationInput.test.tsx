import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { DurationInput } from './DurationInput';

test('demande un clavier numérique', async () => {
  await renderNative(<DurationInput />);

  expect(screen.getByPlaceholderText('HH:MM').props.inputMode).toBe('numeric');
});

// Une duree peut depasser 23 heures : contrairement a l'heure, un premier chiffre eleve reste tel quel.
test('garde un premier chiffre eleve sans prefixer de zero', async () => {
  await renderNative(<DurationInput />);

  await fireEvent.changeText(screen.getByPlaceholderText('HH:MM'), '5');

  expect(screen.getByDisplayValue('5')).toBeTruthy();
});
