import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { NumberField } from './NumberField';

test('associe le libellé au champ', () => {
  renderWeb(<NumberField label="Quantité" />);

  expect(screen.getByLabelText('Quantité')).toBeTruthy();
});

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderWeb(<NumberField label="Libellé" hint="Indice" error="Erreur" />);

  expect(screen.getByText('Libellé')).toBeTruthy();
  expect(screen.getByText('Indice')).toBeTruthy();
  expect(screen.getByText('Erreur')).toBeTruthy();
});
