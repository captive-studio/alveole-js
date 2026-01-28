import type { Theme } from '../type';

import { useFonts } from 'expo-font';
import { useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  breakpointToVariant,
  Colors,
  CustomPalette,
  CustomTypography,
  DeepPartial,
  Fonts,
  FontsMap,
  Heights,
  Palette,
  Sizes,
  Spacings,
} from '../constants';
import { RadiusList } from '../constants/Radius';
import { alpha } from './alphaColor';
import { deepMerge } from './deepMerge';
import { elevationStyle } from './elevationStyle';

export type CustomBuilder = {
  color?: DeepPartial<Palette>;
};

export function useThemeBuilder(params: CustomBuilder): Theme & { isReady: boolean } {
  const { width } = useWindowDimensions();

  const [loadedFonts] = useFonts(FontsMap);

  const variant = useMemo(() => breakpointToVariant(width), [width]);

  const mergedPalette = useMemo(() => deepMerge(CustomPalette, params.color) as typeof CustomPalette, [params.color]);

  const isReady = useMemo(
    () => width != null && variant != null && width > 0 && loadedFonts,
    [loadedFonts, variant, width],
  );

  return {
    // Spacings
    spacing: key => Spacings[key],

    // Radius
    radius: key => RadiusList[key],

    // Breakpoints
    variant,
    isVariant: useCallback(match => variant === match, [variant]),

    // Colors
    color: { _constants: Colors, alpha, ...mergedPalette },

    // Shadows
    shadows: elevationStyle,

    // Typographies
    text: {
      ...CustomTypography,
      fontSize: Sizes,
      lineHeight: Heights,
    },

    // Typographies
    font: Fonts,

    // Theme state
    isReady,
  };
}
