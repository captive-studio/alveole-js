import type { Theme } from '../type';

import { useFonts } from 'expo-font';
import { useCallback, useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import {
  breakpointToVariant,
  Colors,
  CustomPalette,
  CustomTypography,
  DeepPartial,
  Fonts,
  FontsMap,
  Grilles,
  Heights,
  Palette,
  Sizes,
  Spacings,
} from '../constants';
import { controlSizesFor } from '../constants/Control';
import { pillSizeFor } from '../constants/Pill';
import { RadiusList } from '../constants/Radius';
import { alpha } from './alphaColor';
import { toCSSVarPalette } from './cssVarPalette';
import { toCSSVarTypography } from './cssVarTypography';
import { deepMerge } from './deepMerge';
import { elevationStyle } from './elevationStyle';
import { sanitizeCSSKey } from './sanitizeCSSKey';

export type CustomBuilder = {
  color?: DeepPartial<Palette>;
};

export function useThemeBuilder(params: CustomBuilder): Theme & { isReady: boolean } {
  const { width } = useWindowDimensions();

  // Sur web, les fonts sont chargées via @font-face (generateFontFaceCSS), pas via expo-font,
  // pour éviter une double source (fichiers locaux vs Google Fonts) et un chargement redondant.
  const [loadedFonts] = useFonts(Platform.OS === 'web' ? {} : FontsMap);

  const variant = useMemo(() => breakpointToVariant(width), [width]);

  const rawMergedPalette = useMemo(() => deepMerge(CustomPalette, params.color), [params.color]);

  const mergedPalette = useMemo(
    () => (Platform.OS === 'web' ? toCSSVarPalette(rawMergedPalette) : rawMergedPalette),
    [rawMergedPalette],
  );

  const isReady = useMemo(
    () => width != null && variant != null && width > 0 && loadedFonts,
    [loadedFonts, variant, width],
  );

  const externalPadding = useCallback(
    () =>
      Platform.OS === 'web'
        ? `var(--spacing-${sanitizeCSSKey(variant === 'mobile' ? '2W' : '3W')})`
        : variant === 'mobile'
          ? Spacings['2W']
          : Spacings['3W'],
    [variant],
  );

  const webTypography = useMemo(
    () => (Platform.OS === 'web' ? toCSSVarTypography(CustomTypography) : CustomTypography),
    [],
  );

  return {
    // Spacings
    spacing: key => (Platform.OS === 'web' ? `var(--spacing-${sanitizeCSSKey(key)})` : Spacings[key]),
    spacingValue: key => Spacings[key],
    externalPadding,

    // Radius
    radius: key => (Platform.OS === 'web' ? (`var(--radius-${key})` as const) : RadiusList[key]),

    // Dimensions des controles : la densite suit la largeur d'ecran, comme externalPadding
    control: key => controlSizesFor(variant)[key],

    // Dimensions des puces : une seule densite, une puce n'etant pas une cible tactile
    pill: pillSizeFor,

    // Grilles
    grilles: Grilles,

    // Breakpoints
    variant,
    isVariant: useCallback(match => variant === match, [variant]),

    // Colors
    color: { _constants: Colors, _rawLight: rawMergedPalette.light, alpha, ...mergedPalette },

    // Shadows
    shadows: elevationStyle,

    // Typographies
    text: {
      ...webTypography,
      fontSize: Sizes,
      lineHeight: Heights,
    },

    // Typographies
    font: Fonts,

    // Theme state
    isReady,
  };
}
