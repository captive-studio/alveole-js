import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { focusBorder, useTheme } from '@alveole/theme';
import { FieldBorderState } from '../FormControl/fieldBorderState';
import { cadrePrix } from './cadrePrix';
import { useStyles } from './PriceInput.styles';

// Le trait du montant tient lieu de cadre : il prend les jetons d'etat des autres champs,
// dans la priorite de l'ADR 0012, verifiee sur la donnee remise au `Box` (ADR 0027).
const trait = (state: FieldBorderState) =>
  renderHookOnDesktop(() => cadrePrix(useStyles(), state)).result.current.borderBottomColor;

const bordure = () => renderHookOnDesktop(() => useTheme().color.light.border).result.current;

it('passe le trait au jeton d erreur hors focus', () => {
  expect(trait({ error: 'Montant requis' })).toBe(bordure()['plain-error']);
});

it('passe le trait au jeton de succes hors focus', () => {
  expect(trait({ success: 'Enregistré' })).toBe(bordure()['plain-success']);
});

it('passe le trait au jeton desactive, meme au focus', () => {
  expect(trait({ disabled: true, focus: true })).toBe(bordure()['disabled-grey']);
});

// Pendant la saisie, c'est le champ actif qu'il faut designer sans ambiguite ; le verdict de
// validation attend le blur pour reprendre la main.
it('couvre l erreur par la couleur de focus tant que le champ a le focus', () => {
  expect(trait({ error: 'Montant requis', focus: true })).toBe(focusBorder().borderColor);
});
