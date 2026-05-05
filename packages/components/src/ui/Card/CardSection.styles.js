import { makeStyles } from '@alveole/theme';
export const useStyles = makeStyles(({ spacing, color, text }) => ({
  cardSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1W'),
    width: '100%',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1V'),
  },
  titleIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    ...text['Corps de texte'].SM.Medium,
    color: color.light.text['title-grey'],
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1V'),
  },
  descriptionIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  descriptionText: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
  disabledText: {
    color: color.light.text['disabled-grey'],
  },
}));
