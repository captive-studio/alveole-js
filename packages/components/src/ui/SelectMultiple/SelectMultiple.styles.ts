import { focusBorder, makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

/** Le champ ferme : sa boite, et ce qui la marque selon l'etat. */
const champ = ({ color, spacing }: Theme) =>
  ({
    select: {
      flex: 1,
      outline: 'none',
      paddingTop: 0,
      paddingBottom: 0,
      color: color.text['default-grey'],
      width: '100%',
      borderWidth: 0,
      backgroundColor: 'transparent',
      appearance: 'none',
    },
    inputContainer: {
      width: '100%',
    },
    inputDisabled: {
      borderRadius: 6,
      borderColor: color.background['disabled-grey'],
    },
    control: {
      minHeight: spacing('200'),
      flexWrap: 'inherit',
      borderColor: color.border['default-grey'],
    },
    controlDisabled: {
      borderColor: color.background['disabled-grey'],
    },
    /**
     * Le selecteur actif ne recoit pas d'anneau : c'est sa propre bordure qui change de
     * couleur, selon la definition commune du theme (ADR 0012).
     */
    controlFocused: focusBorder(),
    // La legende sous le champ disait seule l'erreur et le succes ; le cadre les porte
    // aussi, comme dans toutes les autres familles de champs.
    controlError: {
      borderColor: color.border['plain-error'],
    },
    controlSuccess: {
      borderColor: color.border['plain-success'],
    },
  }) satisfies Table;

/** Ce que le champ ferme affiche : une trame de puces retirables. */
const contenuDuChamp = ({ color, spacing }: Theme) =>
  ({
    valueContainer: {
      minHeight: 38,
      paddingLeft: spacing('100'),
    },
    multiValue: {
      borderRadius: spacing('025'),
      backgroundColor: color.background.badge.default,
      paddingLeft: spacing('025'),
    },
    multiValueDisabled: {
      backgroundColor: '#FFFFFF',
      borderColor: color.border['plain-grey'],
      borderWidth: 1,
      borderRadius: spacing('025'),
      borderStyle: 'solid',
      paddingLeft: spacing('025'),
      paddingRight: spacing('025'),
    },
    multiValueRemoveHover: {
      backgroundColor: color.background.button.secondary.hover,
      cursor: 'pointer',
    },
    multiValueRemoveDisabled: {
      display: 'none',
    },
    dropdownIndicator: {
      padding: spacing('025'),
    },
    clearIndicator: {
      padding: spacing('025'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...champ(theme), ...contenuDuChamp(theme) }));
