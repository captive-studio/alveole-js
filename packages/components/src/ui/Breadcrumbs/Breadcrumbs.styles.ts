import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing('1V'),
    ...text['Corps de texte'].XS.Regular,
  },
  separator: {
    color: color.light.text['mention-grey'],
  },
  current: {
    color: color.light.text['active-grey'],
  },
  link: {
    color: color.light.text['mention-grey'],
    textDecoration: 'underline',
    ...text['Corps de texte'].XS.Regular,
    transitionProperty: 'text-decoration',
    transitionDuration: '0.1s',
    transitionTimingFunction: 'ease-in-out',
  },
  linkHover: {
    textDecoration: 'none',
  },
}));
