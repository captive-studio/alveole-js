import type { Colors, CustomTypography, Fonts, Grilles, Palette, Spacing, SpacingKey, Variant } from '../constants';
import type { ControlSize, ControlSizeKey } from '../constants/Control';
import { Radius, RadiusKey } from '../constants/Radius';
import { alpha } from '../helpers/alphaColor';
import { elevationStyle } from '../helpers/elevationStyle';
import type { Typography } from './Typography';

export interface Theme {
  // Spacing
  /** Retourne une CSS variable sur web, un nombre sur native. Ne pas utiliser dans des expressions arithmétiques. */
  spacing: (key: SpacingKey) => string | number;
  /** Retourne toujours la valeur numérique en pixels, indépendamment de la plateforme. À utiliser pour l'arithmétique. */
  spacingValue: (key: SpacingKey) => Spacing;
  /** Padding externe responsive : 100 sur mobile, 150 sur desktop */
  externalPadding: () => string | number;

  // Breakpoints
  variant: Variant;
  isVariant: (variant: Variant) => boolean;

  // Shadows
  shadows: typeof elevationStyle;

  // Radius
  radius: (key: RadiusKey) => Radius;

  // Dimensions des controles, selon la densite d'ecran
  control: (key: ControlSizeKey) => ControlSize;

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
    /** Palette light avec valeurs hex brutes, utilisée par injectVariableCSS */
    _rawLight: Palette['light'];
  } & Palette & {
      alpha: typeof alpha;
    };
}
