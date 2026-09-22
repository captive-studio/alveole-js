import { fireEvent, renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { DurationInput } from './DurationInput';

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderOnDesktop(<DurationInput label="Durée" hint="Au format HH:MM" error="Durée invalide" />);

  expect(screen.getByText('Durée')).toBeTruthy();
  expect(screen.getByText('Au format HH:MM')).toBeTruthy();
  expect(screen.getByText('Durée invalide')).toBeTruthy();
});

test('insère les deux-points et transmet la durée une fois les quatre chiffres saisis', () => {
  const onChange = jest.fn();
  renderOnDesktop(<DurationInput label="Durée" onChange={onChange} />);

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '123' } });
  expect(screen.getByLabelText('Durée')).toHaveProperty('value', '12:3');
  expect(onChange).not.toHaveBeenCalled();

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '12:345' } });
  expect(onChange).toHaveBeenCalledWith('12:34');
});

test('transmet la saisie incomplète quand le champ perd le focus', () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  renderOnDesktop(<DurationInput label="Durée" onChange={onChange} onBlur={onBlur} />);

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '1' } });
  fireEvent.blur(screen.getByLabelText('Durée'));

  expect(onChange).toHaveBeenCalledWith('1');
  expect(onBlur).toHaveBeenCalled();
});

test('reprend la valeur fournie quand elle change', () => {
  const { rerender } = renderOnDesktop(<DurationInput label="Durée" value="01:00" />);

  rerender(<DurationInput label="Durée" value="02:30" />);

  expect(screen.getByLabelText('Durée')).toHaveProperty('value', '02:30');
});
