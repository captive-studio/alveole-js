import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

/** Le champ fermé : sa boîte, et ce qui la marque selon l'état. */
const champ = ({ color, spacing }: Theme) =>
  ({
    pickerContainer: {},
    inputContainer: {
      width: '100%',
    },
    inputInner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('1W'),
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      minHeight: 42,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['default-grey'],
      width: '100%',
    },
    inputError: {
      borderColor: color.light.border['plain-error'],
    },
    inputSuccess: {
      borderColor: color.light.border['plain-success'],
    },
    inputDisabled: {
      borderColor: color.light.border['disabled-grey'],
    },
    /** Web uniquement : `cursor` n'appartient pas aux styles React Native. */
    inputCursor: {
      cursor: 'pointer',
    },
    inputCursorDisabled: {
      cursor: 'not-allowed',
    },
    /** Sur natif l'anneau de focus n'existe pas : on marque le focus par la bordure. */
    inputFocused: {
      borderColor: color.light.system.focus,
    },
  }) satisfies Table;

/** Ce que le champ fermé affiche : une valeur en mono, une trame de puces en multi. */
const contenuDuChamp = ({ text, color, spacing }: Theme) =>
  ({
    value: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-grey'],
      flex: 1,
    },
    valuePlaceholder: {
      color: color.light.text['mention-grey'],
    },
    valueDisabled: {
      color: color.light.text['disabled-grey'],
    },
    /** Les puces repassent à la ligne : le champ s'aligne en haut et respire verticalement. */
    inputInnerMultiple: {
      alignItems: 'flex-start',
      paddingTop: spacing('1V'),
      paddingBottom: spacing('1V'),
    },
    tagList: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing('1V'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...champ(theme), ...contenuDuChamp(theme) }));
