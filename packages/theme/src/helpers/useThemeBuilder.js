import { useFonts } from 'expo-font';
import { useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  breakpointToVariant,
  Colors,
  CustomPalette,
  CustomTypography,
  Fonts,
  FontsMap,
  Grilles,
  Heights,
  Sizes,
  Spacings,
} from '../constants';
import { RadiusList } from '../constants/Radius';
import { alpha } from './alphaColor';
import { deepMerge } from './deepMerge';
import { elevationStyle } from './elevationStyle';
export function useThemeBuilder(params) {
  const { width } = useWindowDimensions();
  const [loadedFonts] = useFonts(FontsMap);
  const variant = useMemo(() => breakpointToVariant(width), [width]);
  const mergedPalette = useMemo(() => deepMerge(CustomPalette, params.color), [params.color]);
  const isReady = useMemo(
    () => width != null && variant != null && width > 0 && loadedFonts,
    [loadedFonts, variant, width],
  );
  const externalPadding = useCallback(() => (variant === 'mobile' ? Spacings['2W'] : Spacings['3W']), [variant]);
  return {
    // Spacings
    spacing: key => Spacings[key],
    externalPadding,
    // Radius
    radius: key => RadiusList[key],
    // Grilles
    grilles: Grilles,
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
