import { SpacingKey } from '@alveole/theme';
import { ViewProps } from '@tamagui/core';
export type BoxBaseStyle = Pick<
  ViewProps,
  'display' | 'flex' | 'flexWrap' | 'flexDirection' | 'opacity' | 'overflow'
> & {
  justify?: ViewProps['justifyContent'];
};
export type BoxAdvancedStyle = {
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
  borderRadius?: number;
  borderColor?: any;
  gap?: number | SpacingKey;
  width?: number | `${string}%`;
  height?: number | `${string}%`;
  minW?: number | `${string}%`;
  maxW?: number | `${string}%`;
  minH?: number | `${string}%`;
  maxH?: number | `${string}%`;
};
export type BoxStyle = BoxBaseStyle & BoxAdvancedStyle;
//# sourceMappingURL=Box.types.d.ts.map
