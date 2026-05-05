import { RNTamaguiTextNonStyleProps, TamaguiTextElement, TextProps as TamaguiTextProps } from '@tamagui/core';
import React, { CSSProperties } from 'react';
import type { TypographyStyle } from './Typography.types';
export type TypographyProps = Pick<TamaguiTextProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'> &
  Omit<RNTamaguiTextNonStyleProps, 'children'> &
  TypographyStyle & {
    children: React.ReactNode;
    hoverStyle?: CSSProperties;
  };
export type TypographyElement = TamaguiTextElement;
export declare const Typography: React.ForwardRefExoticComponent<
  Pick<TamaguiTextProps, 'pressStyle' | 'focusStyle' | 'disabledStyle' | 'exitStyle'> &
    Omit<RNTamaguiTextNonStyleProps, 'children'> &
    import('./Typography.types').TypographyBaseStyle &
    import('./Typography.types').TypographyAdvancedStyle & {
      children: React.ReactNode;
      hoverStyle?: CSSProperties;
    } & React.RefAttributes<TamaguiTextElement>
>;
//# sourceMappingURL=Typography.d.ts.map
