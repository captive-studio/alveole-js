import { makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Platform } from 'react-native';

/**
 * Hauteur d'une option. 32 px sur desktop (maquette), 44 pt sur mobile pour
 * respecter les cibles tactiles minimales (HIG Apple / Material).
 */
export const SELECT_ROW_HEIGHT = Platform.OS === 'web' ? 32 : 44;

/**
 * Géométrie relevée sur la maquette (node 3682-5029) : la ligne occupe toute la largeur
 * du panneau, mais le fond de l'option active n'est pas pleine largeur. Il forme une
 * bande arrondie en retrait de 8 px, comme chez Primer.
 */

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const panneau = ({ text, color, spacing, radius, shadows }: Theme) =>
  ({
    // Panneau
    panel: {
      paddingTop: spacing('1W'),
      paddingBottom: spacing('1W'),
      borderRadius: radius('md'),
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['default-grey'],
      overflow: 'hidden',
      ...shadows('lifted'),
    },
    // Message liste vide
    emptyMessage: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['mention-grey'],
      paddingTop: spacing('1W'),
      paddingBottom: spacing('1W'),
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
    // En-tête de groupe
    groupHeader: {
      ...text['Corps de texte'].XS.SemiBold,
      color: color.light.text['mention-grey'],
      textTransform: 'uppercase',
      paddingTop: spacing('3V'),
      paddingBottom: spacing('1V'),
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
  }) satisfies Table;

const ligne = ({ color, spacing, spacingValue, radius }: Theme) =>
  ({
    // Option : conteneur pleine largeur, sans fond propre
    item: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
      minHeight: SELECT_ROW_HEIGHT,
      width: '100%',
      cursor: 'pointer',
    },
    itemDisabled: {
      cursor: 'not-allowed',
    },
    // Bande arrondie portant le fond de l option active
    band: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('1W'),
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
      borderRadius: radius('md'),
    },
    bandHighlighted: {
      backgroundColor: color.light.background['transparent-hover'],
    },
    // Barre d'accent de l'option active, dans la gouttiere laissee par le retrait de la bande (Primer).
    barre: {
      position: 'absolute',
      left: 0,
      top: spacing('1V'),
      bottom: spacing('1V'),
      width: spacingValue('1V'),
      borderRadius: radius('md'),
      backgroundColor: color.light.border['default-primary'],
    },
  }) satisfies Table;

const contenuDeLaLigne = ({ text, color, spacingValue }: Theme) =>
  ({
    itemLabel: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-grey'],
      flex: 1,
    },
    itemLabelDisabled: {
      color: color.light.text['disabled-grey'],
    },
    // Place de la coche, vide sur les options non retenues : les libelles restent alignes.
    placeCoche: {
      width: spacingValue('100'),
      flexShrink: 0,
    },
  }) satisfies Table;

// Visuel de la case a cocher en multi-selection : reprend les tokens de `Checkbox` taille sm
// (voir `Checkbox.styles.ts`) sans en etre une instance, la ligne restant seule pressable.
const caseACocher = ({ color, spacingValue, radius }: Theme) =>
  ({
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      height: spacingValue('100'),
      width: spacingValue('100'),
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color.light.border['action-high-primary'],
      borderRadius: radius('sm'),
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: color.light.background['action-high-primary'],
    },
    checkboxDisabled: {
      borderColor: color.light.border['disabled-grey'],
    },
    checkboxCheckedDisabled: {
      backgroundColor: color.light.background['disabled-grey'],
    },
  }) satisfies Table;

// La puce ne vit pas dans le panneau mais dans le champ fermé, en multi-sélection.
// Elle partage cette table parce qu'elle décrit la même chose : une option retenue.

export const useStyles = makeStyles(theme => ({
  ...panneau(theme),
  ...ligne(theme),
  ...contenuDeLaLigne(theme),
  ...caseACocher(theme),
}));
