import type { Colors, CustomPalette, CustomTypography, Fonts, Spacing, SpacingKey, Variant } from '../constants';
import { Radius, RadiusKey } from '../constants/Radius';
import { alpha } from '../helpers/alphaColor';
import { elevationStyle } from '../helpers/elevationStyle';
import type { Typography } from './Typography';

export interface Theme {
  // Spacing
  spacing: (key: SpacingKey) => Spacing;

  // Breakpoints
  variant: Variant;
  isVariant: (variant: Variant) => boolean;

  // Shadows
  shadows: typeof elevationStyle;

  // Radius
  radius: (key: RadiusKey) => Radius;

  // Typographies
  text: Typography & typeof CustomTypography;

  // Fonts
  font: typeof Fonts;

  // Colors
  color: {
    /** @deprecated Utiliser la palette */
    _constants: typeof Colors;
  } & typeof CustomPalette & {
      alpha: typeof alpha;
    };
}
