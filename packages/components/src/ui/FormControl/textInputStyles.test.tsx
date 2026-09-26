import { focusBorder } from '@alveole/theme';
import { renderHook } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { useStyles } from './FormControl.styles';
import { inputFrameStyle, inputTextStyle, type InputFrameState } from './textInputStyles';

// Le cadre des champs rendu en jsdom ne valait que ce que le style declare disait
// (ADR 0027) : la regle se verifie sur la donnee remise au `Box`, le rendu dans le
// navigateur (apps/docs/e2e/focus.spec.ts).
const styles = async () => (await renderHook(() => useStyles())).result.current;

const cadre = async (state: Partial<InputFrameState>) =>
  (await renderHook(() => inputFrameStyle(useStyles(), { focus: false, ...state }))).result.current;

// Pendant la saisie, c'est le champ actif qu'il faut pouvoir designer sans ambiguite ; le
// verdict de validation attend le blur pour reprendre la main.
it('couvre la couleur d erreur tant que le champ a le focus', async () => {
  expect((await cadre({ focus: true, error: 'Trop court' })).borderColor).toBe(focusBorder().borderColor);
});

it('rend la couleur d erreur au champ hors focus', async () => {
  expect((await cadre({ error: 'Trop court' })).borderColor).toBe((await styles()).inputError.borderColor);
});

it('rend la couleur de succes au champ hors focus', async () => {
  expect((await cadre({ success: 'Parfait' })).borderColor).toBe((await styles()).inputSuccess.borderColor);
});

// Sans fond distinct, un champ desactive ne se reconnait qu'a son libelle pali. Le focus ne
// recouvre pas cette apparence : le champ reste hors d'usage quoi qu'il arrive.
it('grise le fond et la bordure d un champ desactive, meme au focus', async () => {
  const { backgroundColor, borderColor } = await cadre({ disabled: true, focus: true });

  expect({ backgroundColor, borderColor }).toEqual((await styles()).inputDisabled);
});

// Une bordure qui s'epaissirait pousserait le texte d'un pixel a chaque focus, et un contour
// ou une ombre autour du cadre redonnerait le double trait que l'ADR 0012 supprime.
it('garde la bordure a 1 px au focus, sans contour ni ombre autour du cadre', async () => {
  const focalise: Record<string, unknown> = await cadre({ focus: true });

  expect({
    epaisseur: focalise.borderWidth,
    autour: ['outlineWidth', 'outlineStyle', 'outlineColor', 'boxShadow'].filter(cle => cle in focalise),
  }).toEqual({ epaisseur: 1, autour: [] });
});

// `endAdornment` pose `paddingRight: 0` sur le cadre, qui porte deja `padding: 0` : le
// retrait reel vit sur le texte, que l'ornement ne touche pas. Ce test fige l'apparence
// reelle, pas l'intention : la corriger deplacerait le texte de tous les champs a
// ornement de toutes les applications, et releve du design.
it('laisse le retrait du texte inchange quand un ornement est present', async () => {
  const texte = async (endAdornment?: string) =>
    StyleSheet.flatten((await renderHook(() => inputTextStyle(useStyles(), { endAdornment }))).result.current);

  expect((await texte('ornement')).paddingRight).toBe((await texte()).paddingRight);
});

it('garde la bordure de repos hors focus et hors validation', async () => {
  expect((await cadre({})).borderColor).toBe((await styles()).inputInner.borderColor);
});
