import { Platform } from 'react-native';
import { fontStyle } from './Font';

const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

export const isMobile = Platform.OS !== 'web' || userAgent.includes('iPhone') || userAgent.includes('Android');

export const CustomTypography = {
  'Titres alternatifs': {
    XS: {
      ...fontStyle('Geist-Bold'),
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: 0,
    },
    SM: {
      ...fontStyle('Geist-Bold'),
      fontSize: 56,
      lineHeight: 64,
      letterSpacing: 0,
    },
    MD: {
      ...fontStyle('Geist-Bold'),
      fontSize: 64,
      lineHeight: 72,
      letterSpacing: 0,
    },
    LG: {
      ...fontStyle('Geist-Bold'),
      fontSize: 72,
      lineHeight: 80,
      letterSpacing: 0,
    },
    XL: {
      ...fontStyle('Geist-Bold'),
      fontSize: 80,
      lineHeight: 88,
      letterSpacing: 0,
    },
  },

  /** Les titres sont de tailles distinctes selon la platform (Mobile/Web) - Pas de React ici */
  Titres: {
    /** Font size: 18/20 */
    'H6 - XXS': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 20 : 18,
      lineHeight: !isMobile ? 28 : 24,
      letterSpacing: 0,
    },
    /** Font size: 20/22 */
    'H5 - XS': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 22 : 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    /** Font size: 22/24 */
    'H4 - SM': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 24 : 22,
      lineHeight: !isMobile ? 32 : 28,
      letterSpacing: 0,
    },
    /** Font size: 24/28 */
    'H3 - MD': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 28 : 24,
      lineHeight: !isMobile ? 36 : 32,
      letterSpacing: 0,
    },
    /** Font size: 28/32 */
    'H2 - LG': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 32 : 28,
      lineHeight: !isMobile ? 36 : 32,
      letterSpacing: 0,
    },
    /** Font size: 40/48 */
    'H1 - XL': {
      ...fontStyle('Geist-Bold'),
      fontSize: !isMobile ? 40 : 32,
      lineHeight: !isMobile ? 48 : 40,
      letterSpacing: 0,
    },
  },

  'Corps de texte': {
    XS: {
      Regular: {
        ...fontStyle('Geist-Regular'),
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Bold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Caps: {
        ...fontStyle('Geist-Regular'),
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      CapsBold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      /**
       * @deprecated Utiliser `Bold`. `SemiBold` est un alias strict de `Bold` : les deux
       * appliquent `fontStyle('Geist-Bold')`, qui charge `Geist_600SemiBold` et rend un
       * `font-weight: 600`. Le nom laisse croire à une graisse intermédiaire qui n'existe
       * pas dans la palette Geist du thème (300 / 400 / 500 / 600).
       */
      SemiBold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      },
    },
    SM: {
      Regular: {
        ...fontStyle('Geist-Regular'),
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Medium: {
        ...fontStyle('Geist-Medium'),
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      /**
       * @deprecated Utiliser `Bold`. `SemiBold` est un alias strict de `Bold` : les deux
       * appliquent `fontStyle('Geist-Bold')`, qui charge `Geist_600SemiBold` et rend un
       * `font-weight: 600`. Le nom laisse croire à une graisse intermédiaire qui n'existe
       * pas dans la palette Geist du thème (300 / 400 / 500 / 600).
       */
      SemiBold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Bold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      CapsBold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
    },
    MD: {
      Regular: {
        ...fontStyle('Geist-Regular'),
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      Medium: {
        ...fontStyle('Geist-Medium'),
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      /**
       * @deprecated Utiliser `Bold`. `SemiBold` est un alias strict de `Bold` : les deux
       * appliquent `fontStyle('Geist-Bold')`, qui charge `Geist_600SemiBold` et rend un
       * `font-weight: 600`. Le nom laisse croire à une graisse intermédiaire qui n'existe
       * pas dans la palette Geist du thème (300 / 400 / 500 / 600).
       */
      SemiBold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      Bold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
    },
    LG: {
      Regular: {
        ...fontStyle('Geist-Regular'),
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
      Medium: {
        ...fontStyle('Geist-Medium'),
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
      /**
       * @deprecated Utiliser `Bold`. `SemiBold` est un alias strict de `Bold` : les deux
       * appliquent `fontStyle('Geist-Bold')`, qui charge `Geist_600SemiBold` et rend un
       * `font-weight: 600`. Le nom laisse croire à une graisse intermédiaire qui n'existe
       * pas dans la palette Geist du thème (300 / 400 / 500 / 600).
       */
      Bold: {
        ...fontStyle('Geist-Bold'),
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
    },
  },
} as const;
