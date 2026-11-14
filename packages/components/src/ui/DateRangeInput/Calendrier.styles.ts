import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, spacingValue, color, text, radius }) => ({
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  choixMois: {
    flexDirection: 'row',
    gap: spacing('1W'),
  },
  titreMois: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['title-grey'],
  },
  grille: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing('1V'),
    width: spacingValue('5W') * 7,
  },
  jour: {
    width: spacingValue('5W'),
    height: spacingValue('5W'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  jourDansPlage: {
    backgroundColor: color.light.background['action-high-primary'],
  },
  jourDebut: {
    borderTopLeftRadius: radius('full'),
    borderBottomLeftRadius: radius('full'),
  },
  jourFin: {
    borderTopRightRadius: radius('full'),
    borderBottomRightRadius: radius('full'),
  },
  texteJour: {
    ...text['Corps de texte'].MD.Regular,
    color: color.light.text['default-grey'],
  },
  texteJourDansPlage: {
    color: color.light.text['inverted-primary'],
  },
}));
