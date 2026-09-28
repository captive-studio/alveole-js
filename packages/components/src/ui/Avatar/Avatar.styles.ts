import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius }) => ({
  carre: {
    borderRadius: radius('md'),
  },
  fallback: {
    backgroundColor: color.dark.background['contrast-grey'],
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  fallbackText: {
    ...text['Corps de texte'].MD.Medium,
    color: color.dark.text['default-grey'],
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));
