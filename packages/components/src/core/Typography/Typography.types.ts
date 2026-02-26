import { TextProps } from '@tamagui/core';

export type TypographyBaseStyle = Pick<
  TextProps,
  'textTransform' | 'fontSize' | 'fontStyle' | 'lineHeight' | 'textDecorationLine' | 'color'
>;

export type TypographyAdvancedStyle = {
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

  width?: number | `${string}%`;
  height?: number | `${string}%`;
  minW?: number | `${string}%`;
  maxW?: number | `${string}%`;
  minH?: number | `${string}%`;
  maxH?: number | `${string}%`;

  textAlign?: TextProps['textAlign'];
};

export type TypographyStyle = TypographyBaseStyle & TypographyAdvancedStyle;
