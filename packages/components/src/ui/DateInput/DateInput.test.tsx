import { renderNative } from '@/__tests__/helpers/renderNative';
import { FormControl } from '../FormControl';
import { DateInput } from './DateInput';

// Le nom du mois est la seule partie de l'affichage qui dépende de la locale : les autres
// formats utilisés par DateInput (dd/MM/yyyy, yyyy-MM-dd) s'écrivent pareil dans toutes.
// Ce test tient donc à lui seul le contrat « le design system affiche des dates françaises ».
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
