import { fieldBorderState } from '../FormControl/fieldBorderState';
import type { useStyles } from './SelectMultiple.styles';

type SelectMultipleStyles = ReturnType<typeof useStyles>;

export type SelectMultipleControlState = {
  isDisabled: boolean;
  isFocused: boolean;
  error?: string;
  success?: string;
};

/**
 * Le cadre que react-select rend autour du selecteur multiple. Il est sorti du composant
 * parce que c'est une donnee, pas du rendu : la bibliotheque compose ses styles elle-meme,
 * et jsdom n'evalue ni les pseudo-classes qu'elle emet ni le raccourci `outline` de ses
 * classes. Ici, la regle se lit et s'eprouve.
 */
export const selectMultipleControlStyle = (styles: SelectMultipleStyles, state: SelectMultipleControlState) => {
  // Les noms de la table locale sont traduits vers ceux de la regle commune : la priorite
  // des etats est partagee avec les champs et le selecteur simple, la table ne l'est pas.
  const bordure = fieldBorderState(
    {
      inputFocused: styles.controlFocused,
      inputError: styles.controlError,
      inputSuccess: styles.controlSuccess,
      inputDisabled: styles.controlDisabled,
    },
    { disabled: state.isDisabled, focus: state.isFocused, error: state.error, success: state.success },
  );

  return {
    ...styles.control,
    ...bordure,
    // react-select pose sa propre ombre et son propre contour au focus : les deux
    // doubleraient la bordure, que l'ADR 0012 veut seule a porter l'etat actif.
    boxShadow: 'none',
    outline: 'none',
    // react-select repose la bordure de repos au survol. Sans cette reprise, un selecteur
    // actif ou en erreur perd sa couleur des que la souris passe dessus.
    ':hover': { borderColor: bordure.borderColor ?? styles.control.borderColor },
  };
};
