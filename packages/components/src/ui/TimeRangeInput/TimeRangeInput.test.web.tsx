import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { TimeRangeInput } from './TimeRangeInput';

const octobre = {
  type: 'absolue',
  debut: new Date('2026-10-14T00:00:00Z'),
  fin: new Date('2026-10-22T23:59:00Z'),
  utc: true,
} as const;

test('applique la plage choisie au calendrier, heures comprises, en UTC', () => {
  const onApply = jest.fn();
  renderWeb(<TimeRangeInput value={octobre} onApply={onApply} />);

  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('10'));
  fireEvent.click(screen.getByText('Appliquer'));

  expect(onApply).toHaveBeenCalledWith({
    type: 'absolue',
    debut: new Date('2026-10-03T00:00:00Z'),
    fin: new Date('2026-10-10T23:59:00Z'),
    utc: true,
  });
});

test('ne montre Retour que si on peut revenir en arriere', () => {
  const onCancel = jest.fn();
  const { rerender } = renderWeb(<TimeRangeInput value={octobre} onApply={jest.fn()} />);
  expect(screen.queryByText('Retour')).toBeNull();

  rerender(<TimeRangeInput value={octobre} onApply={jest.fn()} onCancel={onCancel} />);
  fireEvent.click(screen.getByText('Retour'));

  expect(onCancel).toHaveBeenCalled();
});

test('change de mois avec les fleches', () => {
  renderWeb(<TimeRangeInput value={octobre} onApply={jest.fn()} />);

  fireEvent.click(screen.getByLabelText('Mois suivant'));

  expect(screen.getByText('Novembre')).toBeTruthy();
});
