import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { DateRangeInput } from './DateRangeInput';

const octobre = { debut: new Date(2026, 9, 14), fin: new Date(2026, 9, 22) };

test('applique la plage choisie, sans heure', () => {
  const onApply = jest.fn();
  renderWeb(<DateRangeInput value={octobre} onApply={onApply} />);

  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('10'));
  fireEvent.click(screen.getByText('Appliquer'));

  expect(onApply).toHaveBeenCalledWith({ debut: new Date(2026, 9, 3), fin: new Date(2026, 9, 10) });
});

test('un seul jour choisi fait une plage d un jour', () => {
  const onApply = jest.fn();
  renderWeb(<DateRangeInput onApply={onApply} onCancel={jest.fn()} />);
  expect(screen.getByText('Appliquer').closest('[aria-disabled="true"], [disabled]')).toBeTruthy();

  fireEvent.click(screen.getByText('15'));
  fireEvent.click(screen.getByText('Appliquer'));

  const { debut, fin } = onApply.mock.calls[0][0];
  expect(debut).toEqual(fin);
});

test('les fleches changent le mois affiche dans la liste des mois', () => {
  renderWeb(<DateRangeInput value={octobre} onApply={jest.fn()} />);

  fireEvent.click(screen.getByLabelText('Mois suivant'));

  expect(screen.getByText('Novembre')).toBeTruthy();
});
