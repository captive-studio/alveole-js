import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, spacingValue, color, text, radius }) => ({
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  choixMois: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing('1W'),
  },
  selectMois: {
    flex: 3,
  },
  selectAnnee: {
    flex: 2,
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
