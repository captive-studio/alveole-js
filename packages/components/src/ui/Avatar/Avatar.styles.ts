import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text }) => ({
  avatar: {
    backgroundColor: color.background['open-bleu-captive'],
  },
  fallbackText: {
    ...text['Corps de texte'].MD.Regular,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {},
}));
