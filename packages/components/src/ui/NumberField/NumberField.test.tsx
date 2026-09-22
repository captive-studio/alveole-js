import { renderNative, screen } from '@/__tests__/helpers/renderNative';
import { NumberField } from './NumberField';

test('entoure le champ de son libellé, de son indice et de son message d erreur', async () => {
  await renderNative(<NumberField label="Libellé" hint="Indice" error="Erreur" />);

  expect(screen.getByText('Libellé')).toBeTruthy();
  expect(screen.getByText('Indice')).toBeTruthy();
  expect(screen.getByText('Erreur')).toBeTruthy();
});
