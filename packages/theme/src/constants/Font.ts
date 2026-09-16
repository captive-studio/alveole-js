import { Geist_300Light } from '@expo-google-fonts/geist/300Light';
import { Geist_400Regular } from '@expo-google-fonts/geist/400Regular';
import { Geist_500Medium } from '@expo-google-fonts/geist/500Medium';
import { Geist_600SemiBold } from '@expo-google-fonts/geist/600SemiBold';
import { Platform, TextStyle } from 'react-native';

export const FontsMap = {
  'Geist-Light': Geist_300Light,
  'Geist-Regular': Geist_400Regular,
  'Geist-Medium': Geist_500Medium,
  'Geist-Bold': Geist_600SemiBold,
} as const;

// helpers
export type Font = keyof typeof FontsMap;
export const Fonts = Object.fromEntries(Object.keys(FontsMap).map(font => [font, font])) as Record<Font, Font>;

const SANS_SERIF_FALLBACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', sans-serif";

/**
 * La police du code, partout où le design system en affiche : en ligne dans du texte comme
 * en bloc. Aucune fonte n'est embarquée, on prend celle du système : une chasse fixe est
 * attendue lisible par l'utilisateur avant d'être conforme à une identité, et charger une
 * fonte de plus pour du code coûterait plus qu'elle ne rapporte.
 */
export const MonospaceFont = {
  fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
} as const;

export const FontWeightMap: Record<
  Font,
  { family: string; familyWithFallback: string; weight: NonNullable<TextStyle['fontWeight']> }
> = {
  'Geist-Light': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Geist-Regular': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Geist-Medium': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Geist-Bold': { family: 'Geist', familyWithFallback: `Geist, ${SANS_SERIF_FALLBACK}`, weight: '600' },
};

export const fontStyle = (font: Font): { fontFamily: string; fontWeight?: TextStyle['fontWeight'] } => {
  if (Platform.OS !== 'web') return { fontFamily: font };
  const { familyWithFallback, weight } = FontWeightMap[font];
  return { fontFamily: familyWithFallback, fontWeight: weight };
};
