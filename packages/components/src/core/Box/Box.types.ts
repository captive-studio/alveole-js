import { RadiusKey, SpacingKey, ThemeColor } from '@alveole/theme';
import { ViewProps } from '@tamagui/core';
import { SizeStyle } from '../../type/SizeStyle';

// Les anciennes cles numeriques ('050', '100'...) sont depreciees au profit des cles V/W.
type BoxSpacing = Exclude<SpacingKey, `${number}`>;
type BoxMargin = BoxSpacing | `${string}%` | 'auto';

type CouleurDeBox = ThemeColor | 'transparent';
type EtatTamagui = 'default' | 'hover' | 'press' | 'focus' | 'focusVisible' | 'disabled';
// Une couleur du theme, ou une clause en objet (`{ hover: y }`). La clause en chaine
// (`'x hover:y'`) est refusee : interpolee, elle perd la marque des couleurs (ADR 0033).
// Les etats sont nommes : une signature d'index fait exploser le temps de typecheck.
type BoxColor = CouleurDeBox | Partial<Record<EtatTamagui, CouleurDeBox>>;

export type BoxBaseStyle = Pick<
  ViewProps,
  'display' | 'flex' | 'flexWrap' | 'flexDirection' | 'opacity' | 'overflow'
> & {
  justify?: ViewProps['justifyContent'];
};

export type BoxAdvancedStyle = SizeStyle & {
  p?: BoxSpacing;
  pl?: BoxSpacing;
  pr?: BoxSpacing;
  pt?: BoxSpacing;
  pb?: BoxSpacing;

  m?: BoxMargin;
  ml?: BoxMargin;
  mr?: BoxMargin;
  mt?: BoxMargin;
  mb?: BoxMargin;

  backgroundColor?: BoxColor;
  borderWidth?: ViewProps['borderWidth'];
  borderRadius?: RadiusKey;
  borderColor?: BoxColor;
  gap?: BoxSpacing;
};

export type BoxStyle = BoxBaseStyle & BoxAdvancedStyle;
