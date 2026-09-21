import { makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Platform } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const tableau = ({ color, text, radius, spacing }: Theme) =>
  ({
    table: {
      display: 'flex',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
      borderRadius: radius('md'),
      overflow: 'hidden',
      backgroundColor: color.light.background['default-grey'],
    },
    scrollContent: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minWidth: '100%',
    },
    emptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing('6W'),
    },
    emptyStateLabel: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['mention-grey'],
    },
  }) satisfies Table;

const entete = ({ color, text, spacing }: Theme) =>
  ({
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: color.light.background['alt-grey'],
      borderBottomWidth: 1,
      borderBottomColor: color.light.border['default-grey'],
    },
    headerRowSm: {
      minHeight: 28,
    },
    headerRowMd: {
      minHeight: 32,
    },
    headerRowLg: {
      minHeight: 36,
    },
    // `position: sticky` n'existe pas nativement (RN n'accepte que absolute/relative pour
    // `position`) : sans le garde-fou web, la valeur traverserait telle quelle jusqu'à iOS/Android.
    headerRowSticky: {
      ...(Platform.OS === 'web' ? { position: 'sticky', top: 0, zIndex: 1 } : {}),
    },
    headerCell: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('1V'),
    },
    headerCellSm: {
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
    },
    headerCellMd: {
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    headerCellLg: {
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
    headerLabel: {
      ...text['Corps de texte'].XS.SemiBold,
      color: color.light.text['mention-grey'],
    },
    headerLabelActive: {
      color: color.light.text['default-grey'],
    },
  }) satisfies Table;

const ligne = ({ color }: Theme) =>
  ({
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: color.light.background['default-grey'],
      borderBottomWidth: 1,
      borderBottomColor: color.light.border['default-grey'],
    },
    rowSm: {
      minHeight: 28,
    },
    rowMd: {
      minHeight: 44,
    },
    rowLg: {
      minHeight: 52,
    },
    rowHoverable: {
      cursor: 'pointer',
    },
    rowHover: {
      backgroundColor: color.light.background['alt-grey'],
    },
    rowSelected: {
      backgroundColor: color.light.background['action-low-primary'],
    },
  }) satisfies Table;

const cellule = ({ spacing }: Theme) =>
  ({
    cell: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 0,
    },
    cellSm: {
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
    },
    cellMd: {
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    cellLg: {
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
    cellAlignEnd: {
      justifyContent: 'flex-end',
    },
  }) satisfies Table;

const colonneDeSelection = ({ spacing }: Theme) =>
  ({
    headerSelectionCell: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerSelectionCellSm: {
      width: 40,
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),
    },
    headerSelectionCellMd: {
      width: 44,
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    headerSelectionCellLg: {
      width: 48,
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
    selectionCell: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectionCellSm: {
      width: 40,
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),
    },
    selectionCellMd: {
      width: 44,
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    selectionCellLg: {
      width: 48,
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...tableau(theme),
  ...entete(theme),
  ...ligne(theme),
  ...cellule(theme),
  ...colonneDeSelection(theme),
}));
