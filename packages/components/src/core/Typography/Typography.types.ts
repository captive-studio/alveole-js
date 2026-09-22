import { TextProps } from '@tamagui/core';
import { SizeStyle } from '../../type/SizeStyle';

export type TypographyBaseStyle = Pick<
  TextProps,
  'textTransform' | 'fontSize' | 'fontStyle' | 'lineHeight' | 'textDecorationLine' | 'color'
>;

export type TypographyAdvancedStyle = SizeStyle & {
  p?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;

  m?: number | `${string}%` | 'auto';
  ml?: number | `${string}%` | 'auto';
  mr?: number | `${string}%` | 'auto';
  mt?: number | `${string}%` | 'auto';
  mb?: number | `${string}%` | 'auto';

  background?: string;

  textAlign?: TextProps['textAlign'];
};

export type TypographyStyle = TypographyBaseStyle & TypographyAdvancedStyle;
