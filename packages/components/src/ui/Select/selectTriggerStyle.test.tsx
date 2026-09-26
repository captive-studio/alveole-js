import { focusBorder } from '@alveole/theme';
import { renderHook } from '@testing-library/react-native';
import { useStyles } from './Select.styles';
import { selectTriggerStyle, type SelectTriggerState } from './selectTriggerStyle';

// Hors web, le selecteur n'a ni focus clavier ni anneau : c'est le panneau ouvert qui dit
// « c'est ici que ca se passe », et le cadre le signale par sa bordure comme les champs.
// Le rendu natif, lui, n'a pas de moteur de mise en page dans jsdom (ADR 0027) : la regle
// se verifie sur la donnee remise au `Pressable`.
const styles = async () => (await renderHook(() => useStyles())).result.current;

const cadre = async (state: Partial<SelectTriggerState>) =>
  (await renderHook(() => selectTriggerStyle(useStyles(), { open: false, ...state }))).result.current;

it('colore la bordure du cadre avec le token de focus a l ouverture', async () => {
  expect((await cadre({ open: true })).borderColor).toBe(focusBorder().borderColor);
});

// Le panneau ouvert est l'etat actif du selecteur : il passe devant l'erreur, et le verdict
// de validation revient a la fermeture.
it('couvre la couleur d erreur tant que le panneau est ouvert, puis la restitue', async () => {
  const ouvert = await cadre({ open: true, error: 'Champ requis' });
  const ferme = await cadre({ error: 'Champ requis' });

  expect({ ouvert: ouvert.borderColor, ferme: ferme.borderColor }).toEqual({
    ouvert: focusBorder().borderColor,
    ferme: (await styles()).inputError.borderColor,
  });
});

it('rend la couleur de succes au cadre ferme', async () => {
  expect((await cadre({ success: 'Enregistré' })).borderColor).toBe((await styles()).inputSuccess.borderColor);
});

// Le panneau ne s'ouvre pas quand le selecteur est desactive, mais le cadre ne doit pas
// prendre l'apparence d'un controle actif meme si l'etat ouvert survenait.
it('ne colore pas la bordure d un selecteur desactive', async () => {
  expect((await cadre({ open: true, disabled: true })).borderColor).toBe((await styles()).inputDisabled.borderColor);
});

// Seul le multiple ajoute `inputInnerMultiple` au cadre, et cet ajout pourrait recouvrir
// l'etat de bordure selon l'ordre des tables.
it('garde la bordure de l etat sur le cadre multiple, qui respire verticalement', async () => {
  const multiple = await cadre({ open: true, multiple: true });

  expect({ bordure: multiple.borderColor, haut: multiple.paddingTop }).toEqual({
    bordure: focusBorder().borderColor,
    haut: (await styles()).inputInnerMultiple.paddingTop,
  });
});

it('n entoure le cadre ouvert d aucun contour ni ombre', async () => {
  const ouvert: Record<string, unknown> = await cadre({ open: true });

  expect(['outlineWidth', 'outlineStyle', 'outlineColor', 'boxShadow'].filter(cle => cle in ouvert)).toEqual([]);
});
