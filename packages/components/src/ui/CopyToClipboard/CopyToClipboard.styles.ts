import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color }) => ({
  message: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
  copiedIcon: {
    color: color.light.text['default-success'],
  },
}));
