import { grayscaleStyle, makeStyles } from '@alveole/theme';

// La carte ne coupe plus son contenu : le média, toujours en tête, arrondit lui-même ses
// coins du haut pour suivre ceux de la carte.
export const useStyles = makeStyles(({ radius }) => ({
  cardMedia: {
    overflow: 'hidden',
    borderTopLeftRadius: radius('md'),
    borderTopRightRadius: radius('md'),
  },
  disabled: grayscaleStyle,
}));
