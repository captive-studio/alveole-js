import { renderNative } from '@/__tests__/helpers/renderNative';
import { TextInput } from '../FormControl';
import { DateInput } from './DateInput';

// Le rendu natif ne garde que les elements hotes : le TextInput du kit n'y figure pas, et
// l'erreur qu'il recoit ne se lirait que sur la couleur de son cadre. Cette couleur est tenue
// au niveau 1 (FormControl/textInputStyles.test.tsx, ADR 0027) ; ici, le contrat : l'erreur
// arrive jusqu'au champ qui la dessine. La doublure n'est posee que dans ce fichier, pour
// que les autres tests de DateInput gardent le vrai rendu.
jest.mock('../FormControl', () => ({ ...jest.requireActual('../FormControl'), TextInput: jest.fn(() => null) }));

test("transmet l'erreur au champ qu'il affiche", async () => {
  await renderNative(<DateInput value="2025-07-22" error="Date invalide" />);

  expect(jest.mocked(TextInput)).toHaveBeenCalledWith(expect.objectContaining({ error: 'Date invalide' }), undefined);
});
