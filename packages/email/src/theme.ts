import { themeBrut, type StyleValue } from '@alveole/theme';
import type { CSSProperties } from 'react';

/** Le theme Alveole en valeurs : un client mail ne resout pas les variables CSS. */
export const theme = themeBrut();

type Cran = Pick<StyleValue, 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'textTransform'>;

/** Un cran typographique du theme en style inline : la hauteur de ligne en pixels, pas en ratio. */
export const typo = ({ fontFamily, fontWeight, fontSize, lineHeight, textTransform }: Cran): CSSProperties => ({
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight: typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight,
  textTransform,
});
