import {
  RNTamaguiTextNonStyleProps,
  styled,
  Text as TamaguiText,
  TamaguiTextElement,
  TextProps as TamaguiTextProps,
} from '@tamagui/core';
import React, { CSSProperties } from 'react';
import { useStyles } from './Typography.styles';
import type { TypographyStyle } from './Typography.types';

export type TypographyProps = Pick<TamaguiTextProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'> &
  Omit<RNTamaguiTextNonStyleProps, 'children'> &
  TypographyStyle & {
    children: React.ReactNode;
    hoverStyle?: CSSProperties;
  };

const StyledTypography = styled(TamaguiText, { name: 'Typography' });
export type TypographyElement = TamaguiTextElement;

export const Typography = React.forwardRef<TypographyElement, TypographyProps>(function Typography(props, ref) {
  const { tag, style, textAlign, hoverStyle, color, ...textProps } = props;
  const styles = useStyles();
  return (
    <StyledTypography
      ref={ref}
      hoverStyle={hoverStyle as any}
      tag={tag ?? 'typography'}
      style={style}
      textAlign={textAlign}
      // Le defaut vit ici et non dans une regle globale sur `body` : le paquet de theme
      // n'emet que `:root` et les polices (voir docs/adr/0008). Sans cela, le texte
      // retombait sur le noir du theme tamagui au lieu du gris du design system.
      color={color ?? styles.text.color}
      {...textProps}
    />
  );
});
