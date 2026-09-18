import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useStyles } from './FormControl.styles';

type Styles = ReturnType<typeof useStyles>;

export type InputFrameState = {
  // `disabled` et `multiline` viennent de TextInputProps, qui autorise `null` en plus
  // de `undefined`.
  disabled?: boolean | null;
  focus: boolean;
  error?: string;
  success?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  multiline?: boolean | null;
};

/**
 * La couleur de la bordure du cadre, un seul etat a la fois. Un champ desactive le reste
 * quoi qu'il arrive ; sinon le focus passe devant l'erreur et le succes, pour que le champ
 * ou l'on ecrit soit identifiable sans ambiguite, et le verdict de validation revient au
 * blur (ADR 0012).
 */
const etatDuCadre = (styles: Styles, state: InputFrameState) => {
  if (state.disabled) return styles.inputDisabled;
  if (state.focus) return styles.inputFocused;
  if (state.error) return styles.inputError;
  if (state.success) return styles.inputSuccess;
  return {};
};

/**
 * Le cadre visible du champ : bordure, fond, et etat. Les deux composants de saisie, celui
 * qui ecrit sur place et le miroir qui ouvre une modale, doivent presenter exactement le
 * meme cadre : sans ce point unique, la modale et la saisie inline divergeraient au premier
 * ajustement.
 *
 * Les deux annulations de rembourrage liees aux ornements n'ont aucun effet visible, le
 * cadre portant deja `padding: 0` et les 16 px reels vivant sur le champ enfant. Elles
 * sont conservees telles quelles : les retirer ne changerait rien, les corriger
 * deplacerait le texte de tous les champs a ornement. Cf. le test qui fige ce constat.
 */
export const inputFrameStyle = (styles: Styles, state: InputFrameState) => ({
  ...styles.inputInner,
  ...etatDuCadre(styles, state),
  ...(state.endAdornment ? { paddingRight: 0 } : {}),
  ...(state.startAdornment ? { paddingLeft: 0 } : {}),
  ...(state.multiline ? { paddingTop: 8 } : {}),
});

/** Centrer le texte n'a de sens qu'encadre des deux cotes, sinon il fuit vers l'ornement. */
export const inputTextStyle = (
  styles: Styles,
  { startAdornment, endAdornment }: Pick<InputFrameState, 'startAdornment' | 'endAdornment'>,
) =>
  ({
    ...styles.input,
    ...(startAdornment && endAdornment ? { textAlign: 'center' } : {}),
  }) as StyleProp<TextStyle>;
