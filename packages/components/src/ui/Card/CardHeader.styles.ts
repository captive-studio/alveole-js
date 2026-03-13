import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, color, text }) => ({
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('1W'),
    width: '100%',
  },
  texte: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  titre: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['title-grey'],
  },
  sousTitre: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
  disabledText: {
    color: color.light.text['disabled-grey'],
  },
}));
