import type { StatusBarStyle } from 'react-native';
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

export type ThemeStatusBarOptions = {
  barStyle: StatusBarStyle;
  backgroundColor: string;
};

export type ThemeStatusBarApi = {
  setStatusBar: (options: Partial<ThemeStatusBarOptions>) => void;
  resetStatusBar: () => void;
};

export interface ThemeBase {
  // Spacing
  spacing: (key: SpacingKey) => Spacing;
  /** Padding externe responsive : 100 sur mobile, 150 sur desktop */
  externalPadding: () => Spacing;

  // Breakpoints
  variant: Variant;
  isVariant: (variant: Variant) => boolean;

  // Shadows
  shadows: typeof elevationStyle;

  // Radius
  radius: (key: RadiusKey) => Radius;

  // Grilles
  grilles: typeof Grilles;

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

export type Theme = ThemeBase & ThemeStatusBarApi;
