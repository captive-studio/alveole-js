import type { Theme } from '../type';

import {
  Colors,
  CustomPalette,
  CustomTypography,
  enCouleursDuTheme,
  Fonts,
  Grilles,
  Heights,
  Sizes,
  Spacings,
} from '../constants';
import { controlSizesFor } from '../constants/Control';
import { pillSizeFor } from '../constants/Pill';
import { RadiusList } from '../constants/Radius';
import { alpha } from './alphaColor';
import { elevationStyle } from './elevationStyle';
import { typographieBrute } from './typographieBrute';

/**
 * Le theme en valeurs brutes (`6`, `#002764`, `Geist, -apple-system, …`), sans hook ni
 * chargement de police : pour un rendu hors application, un mail par exemple, ou les
 * variables CSS du web ne seraient pas resolues. Meme forme que `useTheme()`, si bien que
 * les fonctions de style des composants s'y appliquent telles quelles. Densite desktop.
 */
export const themeBrut = (): Theme => ({
  spacing: key => Spacings[key],
  spacingValue: key => Spacings[key],
  externalPadding: () => Spacings['3W'],
  radius: key => RadiusList[key],
  control: key => controlSizesFor('desktop')[key],
  pill: pillSizeFor,
  grilles: Grilles,
  variant: 'desktop',
  isVariant: variant => variant === 'desktop',
  color: { _constants: Colors, _rawLight: CustomPalette.light, alpha, ...enCouleursDuTheme(CustomPalette) },
  shadows: elevationStyle,
  text: { ...typographieBrute(CustomTypography), fontSize: Sizes, lineHeight: Heights },
  font: Fonts,
});
