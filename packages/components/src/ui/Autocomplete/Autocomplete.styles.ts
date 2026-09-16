import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const zoneDeSaisie = ({ text, color, spacing }: Theme) =>
  ({
    select: {
      outline: 'none',
      paddingTop: 0,
      paddingBottom: 0,
      color: color.text['default-grey'],
      ...text['Corps de texte'].SM.Regular,
      lineHeight: 16,
      width: '100%',
      borderWidth: 0,
      backgroundColor: 'transparent',
      appearance: 'none',
    },
    inputInner: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('050'),
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      paddingTop: spacing('050'),
      paddingBottom: spacing('050'),
      borderRadius: 6,
      borderWidth: 1,
      borderColor: color.border['default-grey'],
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      width: '100%',
    },
    inputContainer: {
      width: '100%',
    },
    inputDisabled: {
      borderRadius: 6,
      backgroundColor: color.background['disabled-grey'],
    },
    input: {
      display: 'flex',
      flexDirection: 'row',
      outline: 'none',
      color: color.text['default-grey'],
      fontFamily: text['Corps de texte'].SM.Regular.fontFamily,
      fontSize: text['Corps de texte'].SM.Regular.fontSize,
      minHeight: 42,
      flex: 1,
    },
    inputPlaceholder: {
      color: color.text.inverse.muted,
      ...text['Corps de texte'].SM.Regular,
    },
    autocompleteIcon: {
      position: 'absolute',
      right: spacing('100'),
      top: '50%',
      color: color.light.text['default-grey'],
    },
  }) satisfies Table;

const controle = ({ color, spacing }: Theme) =>
  ({
    control: {
      minHeight: spacing('200'),
      flexWrap: 'inherit',
      borderColor: color.border['default-grey'],
      paddingTop: spacing('0375'),
      paddingBottom: spacing('0375'),
      borderRadius: 6,
    },
    controlDisabled: {
      backgroundColor: color.background['disabled-grey'],
    },
  }) satisfies Table;

const valeurs = ({ color, spacing }: Theme) =>
  ({
    multiValue: {
      borderRadius: spacing('025'),
      backgroundColor: color.background.badge.default,
      paddingLeft: spacing('025'),
    },
    multiValueDisabled: {
      backgroundColor: '#FFFFFF',
      borderColor: color.border['default-grey'],
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
    dropdownIndicatorDisabled: {},
    clearIndicator: {
      color: color.text['default-grey'],
      padding: spacing('025'),
    },
  }) satisfies Table;

const listeNative = ({ text, color, spacing }: Theme) =>
  ({
    nativeLabel: {
      ...text.Titres['H6 - XXS'],
      color: color.text['title-grey'],
    },
    nativeValue: {
      ...text['Corps de texte'].SM.Regular,
      color: color.text['default-grey'],
    },
    nativeSimpleValue: {
      ...text['Corps de texte'].SM.SemiBold,
      color: color.text['title-grey'],
    },
    nativeItem: {
      paddingTop: spacing('100'),
      paddingRight: spacing('100'),
      paddingBottom: spacing('050'),
      paddingLeft: spacing('050'),
      backgroundColor: color.background.button.tertiary.default,
    },
    nativeItemText: {
      ...text['Corps de texte'].SM.Regular,
      color: color.text['default-grey'],
    },
    nativeItemTextNew: {
      ...text['Corps de texte'].SM.SemiBold,
      color: color.text['action-high-primary'],
    },
    nativeItemSelected: {
      backgroundColor: color.background.button.tertiary.hover,
    },
  }) satisfies Table;

const panneau = ({ text, color, spacing, radius }: Theme) =>
  ({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: color.alpha(color.light.background['alt-grey'], 0.75),
    },
    modalContent: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: radius('lg'),
      borderTopRightRadius: radius('lg'),
      paddingTop: spacing('100'),
    },
    modalHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: spacing('100'),
    },
    groupHeader: {
      ...text['Corps de texte'].XS.SemiBold,
      color: color.light.text['default-grey'],
      textTransform: 'uppercase',
      paddingTop: spacing('075'),
      paddingBottom: spacing('025'),
      paddingLeft: spacing('050'),
      paddingRight: spacing('100'),
      backgroundColor: color.light.background['disabled-grey'],
    },
    groupHeading: {
      ...text['Corps de texte'].XS.SemiBold,
      backgroundColor: color.light.background['disabled-grey'],
      paddingTop: spacing('050'),
      paddingBottom: spacing('050'),
      color: color.light.text['default-grey'],
      textTransform: 'uppercase',
      marginBottom: 0,
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...zoneDeSaisie(theme),
  ...controle(theme),
  ...valeurs(theme),
  ...listeNative(theme),
  ...panneau(theme),
}));
