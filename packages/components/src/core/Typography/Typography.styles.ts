import { makeStyles, Theme } from '@alveole/theme';

/** Couleur de texte par defaut du design system, surchargeable par la prop `color`. */
export const stylesTexte = ({ color }: Theme) => ({
  text: {
    color: color.light.text['default-grey'],
  },
});

export const useStyles = makeStyles(stylesTexte);
