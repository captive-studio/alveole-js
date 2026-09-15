import { renderNative } from '@/__tests__/helpers/renderNative';
import { DateInput } from './DateInput';

// Le nom du mois est la seule partie de l'affichage qui dépende de la locale : les autres
// formats utilisés par DateInput (dd/MM/yyyy, yyyy-MM-dd) s'écrivent pareil dans toutes.
// Ce test tient donc à lui seul le contrat « le design system affiche des dates françaises ».
test('affiche la date sélectionnée en français', async () => {
  const { getByDisplayValue } = await renderNative(<DateInput label="Date" type="datetime" value="2025-07-22T14:30" />);

  expect(getByDisplayValue('22 juillet 2025 à 14:30')).toBeTruthy();
});
