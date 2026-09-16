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
import { Radius, RadiusList } from '../constants/Radius';
import { alpha } from './alphaColor';
import { deepMerge } from './deepMerge';
import { elevationStyle } from './elevationStyle';
import { sanitizeCSSKey } from './sanitizeCSSKey';

export type CustomBuilder = {
  color?: DeepPartial<Palette>;
};

const toCSSVarPalette = (palette: typeof CustomPalette): typeof CustomPalette => {
  if (Platform.OS !== 'web') return palette;

  const light = palette.light as Record<string, Record<string, unknown>>;
  const webLight: Record<string, Record<string, unknown>> = {};

  Object.entries(light).forEach(([category, tokens]) => {
    if (typeof tokens !== 'object' || tokens === null) {
      webLight[category] = tokens as Record<string, unknown>;
      return;
    }
    webLight[category] = {};
    Object.entries(tokens).forEach(([token, value]) => {
      webLight[category][token] = typeof value === 'string' ? `var(--${category}-${token})` : value;
    });
  });

  return { ...palette, light: webLight } as typeof CustomPalette;
};

const toCSSVarTypography = (node: Record<string, unknown>, path: string[] = []): Record<string, unknown> => {
  if (typeof (node as Record<string, unknown>).fontSize === 'number') {
    const prefix = path.map(sanitizeCSSKey).join('-');
    const result: Record<string, unknown> = { ...node };
    result.fontFamily = `var(--typography-${prefix}-font-family)`;
    result.fontWeight = `var(--typography-${prefix}-font-weight)`;
    result.fontSize = `var(--typography-${prefix}-font-size)`;
    result.lineHeight = `var(--typography-${prefix}-line-height)`;
    if (typeof node.letterSpacing === 'number' && node.letterSpacing !== 0) {
      result.letterSpacing = `var(--typography-${prefix}-letter-spacing)`;
    }
    if (typeof node.textTransform === 'string') {
      result.textTransform = `var(--typography-${prefix}-text-transform)`;
    }
    return result;
  }
  const result: Record<string, unknown> = {};
  Object.entries(node).forEach(([key, value]) => {
    result[key] =
      typeof value === 'object' && value !== null
        ? toCSSVarTypography(value as Record<string, unknown>, [...path, key])
        : value;
  });
  return result;
};

export function useThemeBuilder(params: CustomBuilder): Theme & { isReady: boolean } {
  const { width } = useWindowDimensions();

  // Sur web, les fonts sont chargées via @font-face (generateFontFaceCSS), pas via expo-font,
  // pour éviter une double source (fichiers locaux vs Google Fonts) et un chargement redondant.
  const [loadedFonts] = useFonts(Platform.OS === 'web' ? {} : FontsMap);

  const variant = useMemo(() => breakpointToVariant(width), [width]);

  const rawMergedPalette = useMemo(
    () => deepMerge(CustomPalette, params.color) as typeof CustomPalette,
    [params.color],
  );

  const mergedPalette = useMemo(() => toCSSVarPalette(rawMergedPalette), [rawMergedPalette]);

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
    () =>
      Platform.OS === 'web'
        ? toCSSVarTypography(CustomTypography as unknown as Record<string, unknown>)
        : CustomTypography,
    [],
  );

  return {
    // Spacings
    spacing: key => (Platform.OS === 'web' ? `var(--spacing-${sanitizeCSSKey(key)})` : Spacings[key]),
    spacingValue: key => Spacings[key],
    externalPadding,

    // Radius
    radius: key => (Platform.OS === 'web' ? `var(--radius-${key})` : RadiusList[key]) as Radius,

    // Dimensions des controles : la densite suit la largeur d'ecran, comme externalPadding
    control: key => controlSizesFor(variant)[key],

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
    } as unknown as Theme['text'],

    // Typographies
    font: Fonts,

    // Theme state
    isReady,
  };
}
