import { useTheme } from '@alveole/theme';
import { Typography, TypographyProps } from '../Typography';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Omit<TypographyProps, 'tag'> & {
  /** Balise rendue, qui fixe aussi la taille par defaut. */
  as?: HeadingLevel;
};

const STYLE_PAR_NIVEAU = {
  h1: 'H1 - XL',
  h2: 'H2 - LG',
  h3: 'H3 - MD',
  h4: 'H4 - SM',
  h5: 'H5 - XS',
  h6: 'H6 - XXS',
} as const;

export const Heading = ({ as = 'h2', style, color, ...props }: HeadingProps) => {
  const theme = useTheme();
  return (
    <Typography
      tag={as}
      style={[theme.text.Titres[STYLE_PAR_NIVEAU[as]], style]}
      color={color ?? theme.color.light.text['title-grey']}
      {...props}
    />
  );
};
