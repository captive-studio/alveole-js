import {
  RNTamaguiTextNonStyleProps,
  styled,
  Text as TamaguiText,
  TamaguiTextElement,
  TextProps as TamaguiTextProps,
} from '@tamagui/core';
import React, { CSSProperties } from 'react';
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
  const { tag, style, textAlign, hoverStyle, ...textProps } = props;
  return (
    <StyledTypography
      ref={ref}
      hoverStyle={hoverStyle as any}
      tag={tag ?? 'typography'}
      style={style}
      textAlign={textAlign}
      {...textProps}
    />
  );
});
