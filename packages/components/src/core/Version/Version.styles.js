import { makeStyles } from '@alveole/theme';
export const useStyles = makeStyles(({ text, color, spacing }) => ({
  container: {
    padding: spacing('075'),
    textAlign: 'center',
    ...text['Corps de texte'].XS.Regular,
    color: color.light.text['mention-grey'],
  },
}));
