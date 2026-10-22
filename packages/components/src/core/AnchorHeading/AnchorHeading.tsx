import type { HeadingLevel } from '../Heading';
import type { TypographyProps } from '../Typography';
import { Typography } from '../Typography';

export type AnchorHeadingProps = {
  children: React.ReactNode;
  style?: TypographyProps['style'];
  color?: TypographyProps['color'];
  /** Sur le web, rend un `Heading` : vraie balise, taille et couleur de titre. */
  as?: HeadingLevel;
  scrollMarginTop?: number;
};

export const AnchorHeading = ({ children, style, color }: AnchorHeadingProps) => (
  <Typography style={style} color={color}>
    {children}
  </Typography>
);
