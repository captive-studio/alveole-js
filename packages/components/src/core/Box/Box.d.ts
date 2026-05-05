import { RNTamaguiViewNonStyleProps, TamaguiElement, ViewProps as TamaguiViewProps } from '@tamagui/core';
import React, { CSSProperties } from 'react';
import { BoxStyle } from './Box.types';
export type BoxProps = Pick<TamaguiViewProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'> &
  RNTamaguiViewNonStyleProps &
  BoxStyle & {
    hoverStyle?: CSSProperties;
  };
export type BoxElement = TamaguiElement;
export declare const Box: React.ForwardRefExoticComponent<
  Pick<import('tamagui').StackProps, 'pressStyle' | 'focusStyle' | 'disabledStyle' | 'exitStyle'> &
    RNTamaguiViewNonStyleProps &
    Pick<import('tamagui').StackProps, 'opacity' | 'display' | 'flex' | 'flexDirection' | 'flexWrap' | 'overflow'> & {
      justify?: TamaguiViewProps['justifyContent'];
    } & import('./Box.types').BoxAdvancedStyle & {
      hoverStyle?: CSSProperties;
    } & React.RefAttributes<TamaguiElement>
>;
//# sourceMappingURL=Box.d.ts.map
