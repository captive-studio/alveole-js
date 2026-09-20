import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { FieldBorderState, fieldBorderState } from './fieldBorderState';
import { useStyles } from './FormControl.styles';

type Styles = ReturnType<typeof useStyles>;

export type InputFrameState = FieldBorderState & {
  // `multiline` vient de TextInputProps, qui autorise `null` en plus de `undefined`.
  focus: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  multiline?: boolean | null;
};

/**
 * Le cadre visible du champ : bordure, fond, et etat. Les deux composants de saisie, celui
 * qui ecrit sur place et le miroir qui ouvre une modale, doivent presenter exactement le
 * meme cadre : sans ce point unique, la modale et la saisie inline divergeraient au premier
 * ajustement.
 *
 * Les deux annulations de rembourrage liees aux ornements n'ont aucun effet visible, le
 * cadre portant deja `padding: 0` et le retrait reel vivant sur le champ enfant, ou il
 * suit l'echelle de controle (`control('md').paddingInline`, 12 desktop / 16 mobile). Elles
 * sont conservees telles quelles : les retirer ne changerait rien, les corriger
 * deplacerait le texte de tous les champs a ornement. Cf. le test qui fige ce constat.
 */
export const inputFrameStyle = (styles: Styles, state: InputFrameState) => ({
  ...styles.inputInner,
  ...fieldBorderState(styles, state),
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
