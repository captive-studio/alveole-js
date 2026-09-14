import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    ...text['Corps de texte'].SM.Regular,
  },
  separator: {
    width: 1.5,
    height: 11,
    marginLeft: spacing('1,5V'),
    marginRight: spacing('1,5V'),
    backgroundColor: color.light.text['mention-grey'],
    transform: 'rotate(15deg)',
  },
  current: {
    color: color.light.text['active-grey'],
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
