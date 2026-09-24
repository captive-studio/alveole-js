import { CustomTypography, focusBorder, makeStyles, StyleValue, useTheme } from '@alveole/theme';
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
      gap: spacing('1V'),
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
    requiredMarker: {
      ...text['Corps de texte'].SM.Medium,
      color: color.light.text['mention-grey'],
      marginLeft: spacing('1V'),
    },
  }) satisfies Table;

const EPAISSEUR_DE_BORDURE = 1;
// La valeur brute et non celle du theme : sur web, le theme rend une variable CSS, sur
// laquelle aucun calcul de marge n'est possible.
const LIGNE_SAISIE = CustomTypography['Corps de texte'].SM.Regular.lineHeight;
// En pixels et non sans unite : un `<input>` DOM brut (nombre, date, heure) lirait 20 comme
// un multiple de la taille de police.
const LIGNE_SAISIE_EN_PIXELS = `${LIGNE_SAISIE}px`;

const champ = ({ text, color, spacing, control, radius }: Theme) => {
  // Le cadre n'a qu'un plancher : c'est la ligne saisie, ses marges et la bordure qui
  // fixent sa hauteur reelle. Sur web, les marges sont donc deduites de la hauteur de
  // controle ; le natif, lui, tient sa hauteur par le `minHeight` de l'input.
  const margeVerticale =
    Platform.OS === 'web' ? (control('md').height - LIGNE_SAISIE - 2 * EPAISSEUR_DE_BORDURE) / 2 : spacing('1V');

  return {
    // Input
    inputContainer: {
      width: '100%',
    },
    inputInner: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('1W'),
      padding: 0,
      borderRadius: radius('md'),
      borderWidth: EPAISSEUR_DE_BORDURE,
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
      marginTop: margeVerticale,
      marginBottom: margeVerticale,
      // Le meme retrait horizontal que le bouton md : c'est l'echelle de controle qui
      // l'accorde, desktop (12) comme mobile (16), et non un litteral d'espacement.
      paddingLeft: control('md').paddingInline,
      paddingRight: control('md').paddingInline,
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
      lineHeight: LIGNE_SAISIE_EN_PIXELS,
      // Les sous-champs d'un input date ou heure grandissent sa boite au-dela de la ligne.
      height: LIGNE_SAISIE,
      // Et l'input nombre recoit du navigateur 1px de retrait vertical en plus.
      paddingTop: 0,
      paddingBottom: 0,
    },
  } satisfies Table;
};

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
      padding: spacing('3W'),
      paddingTop: spacing('3V'),
      paddingBottom: spacing('3V'),
    },
    modalHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing('2W'),
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
      marginTop: spacing('2W'),
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
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
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
      gap: spacing('1V'),
      alignItems: 'flex-start',
      marginTop: spacing('1W'),
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
