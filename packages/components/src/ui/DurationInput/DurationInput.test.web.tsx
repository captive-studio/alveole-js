import { fireEvent, renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from '../FormControl';
import { DurationInput, DurationInputProps } from './DurationInput';

const dansUnFormControl = (props: DurationInputProps) => (
  <FormControl label="Durée">
    <DurationInput {...props} />
  </FormControl>
);

test('insère les deux-points et transmet la durée une fois les quatre chiffres saisis', () => {
  const onChange = jest.fn();
  renderOnDesktop(dansUnFormControl({ onChange }));

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '123' } });
  expect(screen.getByLabelText('Durée')).toHaveProperty('value', '12:3');
  expect(onChange).not.toHaveBeenCalled();

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '12:345' } });
  expect(onChange).toHaveBeenCalledWith('12:34');
});

test('transmet la saisie incomplète quand le champ perd le focus', () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  renderOnDesktop(dansUnFormControl({ onChange, onBlur }));

  fireEvent.change(screen.getByLabelText('Durée'), { target: { value: '1' } });
  fireEvent.blur(screen.getByLabelText('Durée'));

  expect(onChange).toHaveBeenCalledWith('1');
  expect(onBlur).toHaveBeenCalled();
});

test('reprend la valeur fournie quand elle change', () => {
  const { rerender } = renderOnDesktop(dansUnFormControl({ value: '01:00' }));

  rerender(dansUnFormControl({ value: '02:30' }));

  expect(screen.getByLabelText('Durée')).toHaveProperty('value', '02:30');
});
