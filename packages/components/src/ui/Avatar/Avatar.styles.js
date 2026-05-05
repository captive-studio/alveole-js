import { makeStyles } from '@alveole/theme';
export const useStyles = makeStyles(({ color, text, radius }) => ({
  avatar: {
    backgroundColor: color.dark.background['contrast-grey'],
  },
  carre: {
    borderRadius: radius('md'),
  },
  fallbackText: {
    ...text['Corps de texte'].MD.Medium,
    color: color.dark.text['default-grey'],
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {},
}));
