import { renderNative } from '@/__tests__/helpers/renderNative';
import { FormControl } from '../FormControl';
import { DateInput } from './DateInput';

// Même contrat que la variante iOS, sur le fichier générique : c'est celui que voient
// Android et toute plateforme sans variante dédiée. Le preset natif résolvant vers
// `.ios.tsx`, ce fichier n'était atteignable par aucun test avant le projet `android`.
test('affiche la date sélectionnée en français', async () => {
  const { getByDisplayValue } = await renderNative(<DateInput type="datetime" value="2025-07-22T14:30" />);

  expect(getByDisplayValue('22 juillet 2025 à 14:30')).toBeTruthy();
});

test("laisse le FormControl seul afficher le message d'erreur", async () => {
  const { getAllByText } = await renderNative(
    <FormControl label="Date" error="Date invalide">
      <DateInput error="Date invalide" />
    </FormControl>,
  );

  expect(getAllByText('Date invalide')).toHaveLength(1);
});
