import { focusBorder, makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Platform } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ text, color, spacing }: Theme) =>
  ({
    formControl: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing('025'),
      width: '100%',
    },
    // Label
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      ...text['Corps de texte'].SM.Medium,
      color: color.text['default-grey'],
    },
    labelDisabled: {
      color: color.text['disabled-grey'],
    },
    // Hint
    hintContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    hint: {
      ...text['Corps de texte'].XS.Regular,
      color: color.text.mention,
    },
    hintDisabled: {
      color: color.text['disabled-grey'],
    },
    optionalText: {
      ...text['Corps de texte'].SM.Medium,
      color: color.light.text['mention-grey'],
      marginLeft: spacing('025'),
    },
  }) satisfies Table;

const champ = ({ text, color, spacing, control, radius }: Theme) =>
  ({
    // Input
    inputContainer: {
      width: '100%',
    },
    inputInner: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('050'),
      padding: 0,
      borderRadius: radius('md'),
      borderWidth: 1,
      borderColor: color.border['default-grey'],
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      width: '100%',
      // Meme hauteur que le bouton md (`control('md').height`) : les deux partagent la
      // meme echelle de controle, comme chez Primer. Un bouton pose a cote d'un champ
      // s'alignait avant que le champ ne reste a 42 pendant que le bouton passait a 32.
      minHeight: control('md').height,
    },
    input: {
      display: 'flex',
      flexDirection: 'row',
      outline: 'none',
      color: color.text['default-grey'],
      fontFamily: text['Corps de texte'].SM.Regular.fontFamily,
      fontSize: text['Corps de texte'].SM.Regular.fontSize,
      // (control('md').height - lineHeight 20) / 2, comme pour l'onglet inactif de Tabs.
      marginTop: Platform.OS === 'web' ? spacing('1,5V') : spacing('025'),
      marginBottom: Platform.OS === 'web' ? spacing('1,5V') : spacing('025'),
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      minHeight: Platform.OS === 'web' ? undefined : control('md').height,
      flex: 1,
    },
    inputFileText: {
      color: color.text['default-grey'],
      ...text['Corps de texte'].SM.Regular,
    },
    inputWeb: {
      borderWidth: 0,
      borderStyle: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      lineHeight: 'auto',
    },
  }) satisfies Table;

const etatDuChamp = ({ color }: Theme) =>
  ({
    // Le champ actif ne recoit pas d'anneau : c'est sa propre bordure qui change de couleur,
    // selon la definition commune du theme (ADR 0012).
    inputFocused: focusBorder(),
    inputError: {
      borderColor: color.border['plain-error'],
    },
    inputSuccess: {
      borderColor: color.border['plain-success'],
    },
    inputDisabled: {
      // La bordure seule ne suffisait pas : elle ne differe de celle d'un champ actif que d'un
      // cran de la rampe de gris. C'est le fond qui dit qu'on n'ecrit pas ici.
      backgroundColor: color.background['disabled-grey'],
      borderColor: color.border['disabled-grey'],
    },
  }) satisfies Table;

const panneau = ({ text, color, spacing, radius }: Theme) =>
  ({
    // Modal (multiline)
    modalOverlay: {
      flex: 1,
      backgroundColor: color.alpha(color.background['alt-grey'], 0.75),
    },
    modalSheet: {
      width: '100%',
      flex: 1,
    },
    modalContent: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: radius('lg'),
      borderTopRightRadius: radius('lg'),
      padding: spacing('150'),
      paddingTop: spacing('075'),
      paddingBottom: spacing('075'),
    },
    modalHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing('100'),
    },
    modalHeaderLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalHeaderRight: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalFooter: {
      marginTop: spacing('100'),
    },
    modalInputContainer: {
      borderRadius: radius('md'),
      borderWidth: 1,
      borderColor: color.border['default-grey'],
      backgroundColor: '#FFFFFF',
      minHeight: 200,
    },
    modalInput: {
      ...text['Corps de texte'].SM.Regular,
      color: color.text['default-grey'],
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      paddingTop: spacing('100'),
      paddingBottom: spacing('100'),
      minHeight: 180,
      flex: 1,
    },
  }) satisfies Table;

const message = ({ text, color, spacing }: Theme) =>
  ({
    // Caption
    caption: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('025'),
      alignItems: 'flex-start',
      marginTop: spacing('050'),
      width: '100%',
    },
    captionIcon: {
      flexShrink: 0,
      marginTop: 2,
    },
    captionText: {
      ...text['Corps de texte'].XS.Regular,
      flex: 1,
      flexShrink: 1,
      minWidth: 0,
    },
    errorText: {
      color: color.danger,
    },
    successText: {
      color: color.success,
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...coque(theme),
  ...champ(theme),
  ...etatDuChamp(theme),
  ...panneau(theme),
  ...message(theme),
}));
