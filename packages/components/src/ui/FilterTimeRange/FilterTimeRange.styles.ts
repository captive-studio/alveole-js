import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, spacingValue, color, text }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1V'),
    padding: spacing('1W'),
    width: spacingValue('12W') * 3,
  },
  titre: {
    ...text['Corps de texte'].SM.Medium,
    color: color.light.text['title-grey'],
    paddingBottom: spacing('1V'),
  },
  adornment: {
    paddingLeft: spacing('1W'),
  },
}));
