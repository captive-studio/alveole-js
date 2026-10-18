import {
  RNTamaguiTextNonStyleProps,
  styled,
  Text as TamaguiText,
  TamaguiTextElement,
  TextProps as TamaguiTextProps,
} from '@tamagui/core';
import React from 'react';
import { Platform } from 'react-native';
import { couleurDuTexte } from './couleurDuTexte';
import { useStyles } from './Typography.styles';
import type { TypographyStyle } from './Typography.types';

// Comme Box : les props de style de Tamagui passent telles quelles, clauses comprises
// (ADR 0031) ; seules celles dont Alveole fixe le sens restent les siennes.
export type TypographyProps = Omit<TamaguiTextProps, keyof TypographyStyle | 'children' | 'tag' | 'style'> &
  Omit<RNTamaguiTextNonStyleProps, 'children' | 'tag'> &
  TypographyStyle & {
    children: React.ReactNode;
    // Possede ici et non herite de Tamagui, qui retire `tag` en v2 : le passage a Tamagui
    // se fait en un seul endroit, dans le rendu ci-dessous.
    tag?: string;
  };

const StyledTypography = styled(TamaguiText, { name: 'Typography' });
export type TypographyElement = TamaguiTextElement;

export const Typography = React.forwardRef<TypographyElement, TypographyProps>(function Typography(props, ref) {
  const { tag, style, textAlign, color, ...textProps } = props;
  const styles = useStyles();
  return (
    <StyledTypography
      ref={ref}
      render={tag ?? 'typography'}
      style={style}
      textAlign={textAlign}
      // Le defaut vit ici et non dans une regle globale sur `body` : le paquet de theme
      // n'emet que `:root` et les polices (voir docs/adr/0009). Sans cela, le texte
      // retombait sur le noir du theme tamagui au lieu du gris du design system.
      color={couleurDuTexte(styles, color)}
      // Tamagui v2 remet la police de l'app sur chaque vue, hauteur de ligne comprise : sans
      // cran explicite, un texte prenait celle de la police par defaut au lieu de la hauteur
      // normale du navigateur qu'il heritait en v1. Le natif n'herite pas du CSS.
      lineHeight={Platform.OS === 'web' ? 'normal' : undefined}
      {...textProps}
    />
  );
});
