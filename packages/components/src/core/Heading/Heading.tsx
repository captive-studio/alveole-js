import { NiveauDeTitre, TitreParNiveau, useTheme } from '@alveole/theme';
import { Typography, TypographyProps } from '../Typography';

export type HeadingLevel = NiveauDeTitre;

export type HeadingProps = Omit<TypographyProps, 'tag'> & {
  /** Balise rendue, qui fixe aussi la taille par defaut. */
  as?: HeadingLevel;
};

export const Heading = ({ as = 'h2', style, color, ...props }: HeadingProps) => {
  const theme = useTheme();
  return (
    <Typography
      tag={as}
      style={[theme.text.Titres[TitreParNiveau[as]], style]}
      color={color ?? theme.color.light.text['title-grey']}
      {...props}
    />
  );
};
