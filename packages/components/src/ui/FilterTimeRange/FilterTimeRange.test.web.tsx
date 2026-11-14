import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FilterTimeRange } from './FilterTimeRange';

const ouvrir = (onChange = jest.fn()) => {
  renderWeb(<FilterTimeRange title="Période" value={{ type: 'relative', duree: '14d' }} onChange={onChange} />);
  fireEvent.click(screen.getByText('14D'));
  return onChange;
};

test('choisit une plage predefinie', () => {
  const onChange = ouvrir();

  fireEvent.click(screen.getByText('7 derniers jours'));

  expect(onChange).toHaveBeenCalledWith({ type: 'relative', duree: '7d' });
});

test('accepte une plage libre saisie', () => {
  const onChange = ouvrir();
  const champ = screen.getByPlaceholderText('Plage libre : 2h, 4d, 8w…');

  fireEvent.change(champ, { target: { value: '4D' } });
  fireEvent.keyDown(champ, { key: 'Enter', code: 'Enter' });

  expect(onChange).toHaveBeenCalledWith({ type: 'relative', duree: '4d' });
});

test('Date absolue ouvre le calendrier, Retour ramene aux plages', () => {
  ouvrir();

  fireEvent.click(screen.getByText('Date absolue'));
  expect(screen.getByText('Appliquer')).toBeTruthy();

  fireEvent.click(screen.getByText('Retour'));
  expect(screen.getByText('Dernière heure')).toBeTruthy();
});
