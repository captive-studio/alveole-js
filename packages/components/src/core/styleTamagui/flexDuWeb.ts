import { Platform } from 'react-native';

// react-native-web rendait `flex: n` en `n 1 0%` ; Tamagui v3 le rend en `n 1 0px` sur le web.
// Dans un parent de hauteur indefinie, la base en pixels ecrase la boite a zero, la base en
// pourcentage lui rend la hauteur de son contenu : Alveole retablit la seconde.
export const flexDuWeb = (flex: number) =>
  Platform.OS === 'web' ? { flexGrow: flex, flexShrink: 1, flexBasis: '0%' } : { flex };

const flexDuStyle = (style: unknown): unknown => {
  if (Array.isArray(style))
    return style.reduce<unknown>((dernier, element) => flexDuStyle(element) ?? dernier, undefined);
  if (style && typeof style === 'object' && 'flex' in style) return style.flex;
  return undefined;
};

// Le style d'un appelant de Box peut porter `flex: n` : la correction passe apres lui.
export const correctionFlexDuWeb = (style: unknown) => {
  const flex = flexDuStyle(style);
  if (Platform.OS !== 'web' || typeof flex !== 'number' || flex <= 0) return undefined;
  return flexDuWeb(flex);
};
