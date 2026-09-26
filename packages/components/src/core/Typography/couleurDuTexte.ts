import { useStyles } from './Typography.styles';
import type { TypographyStyle } from './Typography.types';

/** La couleur demandee, sinon le gris par defaut du design system. */
export const couleurDuTexte = (styles: ReturnType<typeof useStyles>, color?: TypographyStyle['color']) =>
  color ?? styles.text.color;
