import { makeStyles } from '@alveole/theme';
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
export const useStyles = makeStyles(({ text, color, spacing, spacingValue, radius, shadows }) => ({
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

  // Message liste vide
  emptyMessage: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['mention-grey'],
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
  },
}));
