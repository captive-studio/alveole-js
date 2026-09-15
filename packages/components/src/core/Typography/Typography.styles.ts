import { makeStyles } from '@alveole/theme';

/** Couleur de texte par defaut du design system, surchargeable par la prop `color`. */
export const useStyles = makeStyles(({ color }) => ({
  text: {
    color: color.light.text['default-grey'],
  },
}));
