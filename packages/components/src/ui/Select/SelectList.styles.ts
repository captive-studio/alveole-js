import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

/**
 * Hauteur d'une option. 32 px sur desktop (maquette), 44 pt sur mobile pour
 * respecter les cibles tactiles minimales (HIG Apple / Material).
 */
export const SELECT_ROW_HEIGHT = Platform.OS === 'web' ? 32 : 44;

/** Hauteur de la pastille bleue signalant l'option sélectionnée. */
const INDICATOR_HEIGHT = SELECT_ROW_HEIGHT - 8;

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

  // Option
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    minHeight: SELECT_ROW_HEIGHT,
    width: '100%',
    cursor: 'pointer',
  },
  itemHighlighted: {
    backgroundColor: color.light.background['transparent-hover'],
  },
  itemDisabled: {
    cursor: 'not-allowed',
  },
  itemLabel: {
    ...text['Corps de texte'].MD.Regular,
    color: color.light.text['default-grey'],
    flex: 1,
  },
  itemLabelDisabled: {
    color: color.light.text['disabled-grey'],
  },

  // Indicateur de sélection : barre verticale collée au bord gauche
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: spacingValue('1V'),
    display: 'flex',
    justifyContent: 'center',
  },
  indicatorContent: {
    width: '100%',
    height: INDICATOR_HEIGHT,
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
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
  },

  // Message liste vide
  emptyMessage: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['mention-grey'],
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
  },
}));
