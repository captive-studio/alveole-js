import { fieldBorderState } from '../FormControl/fieldBorderState';
import type { useStyles } from './Select.styles';

type SelectStyles = ReturnType<typeof useStyles>;

export type SelectControlState = {
  isDisabled: boolean;
  isFocused: boolean;
  error?: string;
  success?: string;
};

/**
 * Le cadre que react-select rend autour du selecteur. Il est sorti du composant parce que
 * c'est une donnee, pas du rendu : la bibliotheque compose ses styles elle-meme, et jsdom
 * n'evalue pas les pseudo-classes qu'elle emet. Ici, la regle se lit et s'eprouve.
 *
 * La bordure suit la priorite commune aux champs (ADR 0012), et rien ne s'ajoute autour du
 * cadre : react-select pose sinon sa propre ombre et son propre contour au focus, qui
 * doubleraient le trait.
 */
export const selectControlStyle = (styles: SelectStyles, state: SelectControlState) => {
  const bordure = fieldBorderState(styles, {
    disabled: state.isDisabled,
    focus: state.isFocused,
    error: state.error,
    success: state.success,
  });

  return {
    ...styles.inputInner,
    ...(state.isDisabled ? styles.inputCursorDisabled : styles.inputCursor),
    ...bordure,
    boxShadow: 'none',
    outline: 'none',
    // react-select repose la bordure de repos au survol. Sans cette reprise, un selecteur
    // actif ou en erreur perd sa couleur des que la souris passe dessus.
    ':hover': { borderColor: bordure.borderColor ?? styles.inputInner.borderColor },
  };
};
