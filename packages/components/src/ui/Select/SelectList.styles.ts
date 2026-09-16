import { makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Platform } from 'react-native';

/**
 * Hauteur d'une option. 32 px sur desktop (maquette), 44 pt sur mobile pour
 * respecter les cibles tactiles minimales (HIG Apple / Material).
 */
export const SELECT_ROW_HEIGHT = Platform.OS === 'web' ? 32 : 44;

/**
 * Géométrie relevée sur la maquette (node 3682-5029) : la ligne occupe toute la largeur
 * du panneau, mais le fond de survol et de sélection n'est pas pleine largeur. Il forme
 * une bande arrondie en retrait de 16 px, et la barre de sélection vit dans la gouttière
 * ainsi dégagée : 8 px de marge, 4 px de barre, 4 px d'écart avant la bande.
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

const ligne = ({ color, spacing, radius }: Theme) =>
  ({
    // Option : conteneur pleine largeur, sans fond propre
    item: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      minHeight: SELECT_ROW_HEIGHT,
      width: '100%',
      cursor: 'pointer',
    },
    itemDisabled: {
      cursor: 'not-allowed',
    },
    // Bande arrondie portant le fond de survol et de sélection
    band: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('1W'),
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
      borderRadius: radius('sm'),
    },
    bandHighlighted: {
      backgroundColor: color.light.background['transparent-hover'],
    },
  }) satisfies Table;

const contenuDeLaLigne = ({ text, color, spacing, spacingValue, radius }: Theme) =>
  ({
    itemLabel: {
      ...text['Corps de texte'].MD.Regular,
      color: color.light.text['default-grey'],
      flex: 1,
    },
    itemLabelDisabled: {
      color: color.light.text['disabled-grey'],
    },
    // Indicateur de sélection : barre verticale dans la gouttière, à gauche de la bande
    indicator: {
      position: 'absolute',
      left: spacing('1W'),
      top: 0,
      bottom: 0,
      width: spacingValue('1V'),
      display: 'flex',
      justifyContent: 'center',
    },
    indicatorContent: {
      width: '100%',
      height: spacingValue('3W'),
      borderRadius: radius('sm'),
      backgroundColor: color.light.border['default-primary'],
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...panneau(theme), ...ligne(theme), ...contenuDeLaLigne(theme) }));
