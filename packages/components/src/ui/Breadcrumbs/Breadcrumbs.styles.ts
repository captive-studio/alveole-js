import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing('1V'),
    ...text['Corps de texte'].SM.Regular,
  },
  separator: {
    width: 1.5,
    height: 11,
    marginLeft: spacing('1V'),
    marginRight: spacing('1V'),
    backgroundColor: color.light.text['mention-grey'],
    transform: 'rotate(15deg)',
  },
  current: {
    color: color.light.text['default-grey'],
  },
  link: {
    color: color.light.text['default-info'],
    textDecoration: 'none',
    ...text['Corps de texte'].SM.Regular,
    transitionProperty: 'text-decoration',
    transitionDuration: '0.1s',
    transitionTimingFunction: 'ease-in-out',
  },
  linkHover: {
    textDecoration: 'underline',
  },
}));
