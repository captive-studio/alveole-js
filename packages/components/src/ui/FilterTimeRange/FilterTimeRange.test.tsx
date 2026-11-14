import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { FilterTimeRange } from './FilterTimeRange';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/tamaguiSheetMock').mockTamaguiSheet());

test('sur mobile, ouvre les plages dans un BottomSheet et y choisit une plage', async () => {
  const onChange = jest.fn();
  await renderNative(
    <FilterTimeRange title="Période" value={{ type: 'relative', duree: '14d' }} onChange={onChange} />,
  );
  expect(screen.queryByText('7 derniers jours')).toBeNull();

  await fireEvent.press(screen.getByText('14D'));
  await fireEvent.press(screen.getByText('7 derniers jours'));

  expect(onChange).toHaveBeenCalledWith({ type: 'relative', duree: '7d' });
});

test('le titre n est porte qu une fois, par le BottomSheet', async () => {
  await renderNative(<FilterTimeRange title="Période" onChange={jest.fn()} />);

  await fireEvent.press(screen.getAllByText('Période')[0]);

  expect(screen.getAllByText('Période')).toHaveLength(2);
});
