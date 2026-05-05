import type {
  Colors,
  CustomPalette,
  CustomTypography,
  Fonts,
  Grilles,
  Spacing,
  SpacingKey,
  Variant,
} from '../constants';
import { Radius, RadiusKey } from '../constants/Radius';
import { alpha } from '../helpers/alphaColor';
import { elevationStyle } from '../helpers/elevationStyle';
import type { Typography } from './Typography';
export interface Theme {
  spacing: (key: SpacingKey) => Spacing;
  /** Padding externe responsive : 100 sur mobile, 150 sur desktop */
  externalPadding: () => Spacing;
  variant: Variant;
  isVariant: (variant: Variant) => boolean;
  shadows: typeof elevationStyle;
  radius: (key: RadiusKey) => Radius;
  grilles: typeof Grilles;
  text: Typography & typeof CustomTypography;
  font: typeof Fonts;
  color: {
    /** @deprecated Utiliser la palette */
    _constants: typeof Colors;
  } & typeof CustomPalette & {
      alpha: typeof alpha;
    };
}
//# sourceMappingURL=Theme.d.ts.map
