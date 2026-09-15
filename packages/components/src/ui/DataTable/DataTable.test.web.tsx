import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { DataTable } from './DataTable';

const rows = [{ id: 'r1', nom: 'Ada' }];
const columns = [{ id: 'nom', header: 'Nom', renderCell: (row: (typeof rows)[number]) => row.nom }];

test('nomme la case à cocher qui sélectionne toutes les lignes', () => {
  renderWeb(<DataTable selectable columns={columns} data={rows} keyExtractor={row => row.id} />);

  expect(screen.getByRole('checkbox', { name: 'Tout sélectionner' })).toBeTruthy();
});

test('nomme la case à cocher de chaque ligne par son rang', () => {
  renderWeb(<DataTable selectable columns={columns} data={rows} keyExtractor={row => row.id} />);

  expect(screen.getByRole('checkbox', { name: 'Sélectionner la ligne 1' })).toBeTruthy();
});
