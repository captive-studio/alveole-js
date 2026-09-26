import { SpacingKey } from '@alveole/theme';
import { ViewProps } from '@tamagui/core';
import { SizeStyle } from '../../type/SizeStyle';

export type BoxBaseStyle = Pick<
  ViewProps,
  'display' | 'flex' | 'flexWrap' | 'flexDirection' | 'opacity' | 'overflow'
> & {
  justify?: ViewProps['justifyContent'];
};

export type BoxAdvancedStyle = SizeStyle & {
  p?: number | SpacingKey;
  pl?: number | SpacingKey;
  pr?: number | SpacingKey;
  pt?: number | SpacingKey;
  pb?: number | SpacingKey;

  m?: number | `${string}%` | SpacingKey | 'auto';
  ml?: number | `${string}%` | SpacingKey | 'auto';
  mr?: number | `${string}%` | SpacingKey | 'auto';
  mt?: number | `${string}%` | SpacingKey | 'auto';
  mb?: number | `${string}%` | SpacingKey | 'auto';

  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number | string;
  borderColor?: string;
  gap?: number | SpacingKey;
};

export type BoxStyle = BoxBaseStyle & BoxAdvancedStyle;
