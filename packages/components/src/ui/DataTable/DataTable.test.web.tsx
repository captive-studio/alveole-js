import { render, screen } from '@/__tests__/helpers/render.web';
import { DataTable } from './DataTable';

const rows = [{ id: 'r1', nom: 'Ada' }];
const columns = [{ id: 'nom', header: 'Nom', renderCell: (row: (typeof rows)[number]) => row.nom }];

test('nomme la case à cocher qui sélectionne toutes les lignes', () => {
  render(<DataTable selectable columns={columns} data={rows} keyExtractor={row => row.id} />);

  expect(screen.getByRole('checkbox', { name: 'Tout sélectionner' })).toBeTruthy();
});

test('nomme la case à cocher de chaque ligne par son rang', () => {
  render(<DataTable selectable columns={columns} data={rows} keyExtractor={row => row.id} />);

  expect(screen.getByRole('checkbox', { name: 'Sélectionner la ligne 1' })).toBeTruthy();
});
