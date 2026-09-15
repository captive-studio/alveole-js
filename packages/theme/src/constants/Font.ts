import { Geist_300Light } from '@expo-google-fonts/geist/300Light';
import { Geist_400Regular } from '@expo-google-fonts/geist/400Regular';
import { Geist_500Medium } from '@expo-google-fonts/geist/500Medium';
import { Geist_600SemiBold } from '@expo-google-fonts/geist/600SemiBold';
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Platform, TextStyle } from 'react-native';

export const FontsMap = {
  // Geist
  'Geist-Light': Geist_300Light,
  'Geist-Regular': Geist_400Regular,
  'Geist-Medium': Geist_500Medium,
  'Geist-Bold': Geist_600SemiBold,
  // Inter
  'Inter-Light': Inter_300Light,
  'Inter-Regular': Inter_400Regular,
  'Inter-Medium': Inter_500Medium,
  'Inter-Bold': Inter_600SemiBold,
} as const;

// helpers
export type Font = keyof typeof FontsMap;
export const Fonts = Object.fromEntries(Object.keys(FontsMap).map(font => [font, font])) as Record<Font, Font>;

const SANS_SERIF_FALLBACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', sans-serif";

export const FontWeightMap: Record<
  Font,
  { family: string; familyWithFallback: string; weight: NonNullable<TextStyle['fontWeight']> }
> = {
  'Geist-Light': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Geist-Regular': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Geist-Medium': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Geist-Bold': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '600' },
  'Inter-Light': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Inter-Regular': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Inter-Medium': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Inter-Bold': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '600' },
};

export const fontStyle = (font: Font): { fontFamily: string; fontWeight?: TextStyle['fontWeight'] } => {
  if (Platform.OS !== 'web') return { fontFamily: font };
  const { familyWithFallback, weight } = FontWeightMap[font];
  return { fontFamily: familyWithFallback, fontWeight: weight };
};
