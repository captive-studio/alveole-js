import { fieldBorderState, type FieldBorderState } from '../FormControl/fieldBorderState';
import type { useStyles } from './Select.styles';

type SelectStyles = ReturnType<typeof useStyles>;

/** Hors web, c'est le panneau ouvert qui tient lieu de focus. */
export type SelectTriggerState = Omit<FieldBorderState, 'focus'> & { open: boolean; multiple?: boolean };

/**
 * Le cadre du selecteur natif, pendant de `selectControlStyle` : une donnee plutot que du
 * rendu, pour que la regle se lise et s'eprouve sans moteur de mise en page (ADR 0027).
 * L'etat de bordure vient en dernier : rien ne doit le recouvrir.
 */
export const selectTriggerStyle = (styles: SelectStyles, { open, multiple, ...state }: SelectTriggerState) => ({
  ...styles.inputInner,
  ...(multiple ? styles.inputInnerMultiple : {}),
  ...fieldBorderState(styles, { ...state, focus: open }),
});
