import type { TypographyProps } from '../Typography';
import { Typography } from '../Typography';

export type AnchorHeadingProps = {
  children: string;
  style?: TypographyProps['style'];
  scrollMarginTop?: number;
};

export const AnchorHeading = ({ children, style }: AnchorHeadingProps) => (
  <Typography style={style}>{children}</Typography>
);
