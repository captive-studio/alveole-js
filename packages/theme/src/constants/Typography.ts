import { Platform } from 'react-native';
import { Fonts } from './Font';

export const CustomTypography = {
  'Titres alternatifs': {
    XS: {
      fontFamily: Fonts['Barlow-Bold'],
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: 0,
    },
    SM: {
      fontFamily: Fonts['Barlow-Bold'],
      fontSize: 56,
      lineHeight: 64,
      letterSpacing: 0,
    },
    MD: {
      fontFamily: Fonts['Barlow-Bold'],
      fontSize: 64,
      lineHeight: 72,
      letterSpacing: 0,
    },
    LG: {
      fontFamily: Fonts['Barlow-Bold'],
      fontSize: 72,
      lineHeight: 80,
      letterSpacing: 0,
    },
    XL: {
      fontFamily: Fonts['Barlow-Bold'],
      fontSize: 80,
      lineHeight: 88,
      letterSpacing: 0,
    },
  },

  /** Les titres sont de tailles distinctes selon la platform (Mobile/Web) - Pas de React ici */
  Titres: {
    /** Font size: 18/20 */
    'H6 - XXS': {
      fontFamily: Fonts['Inter-Bold'],
      fontSize: Platform.OS === 'web' ? 20 : 18,
      lineHeight: Platform.OS === 'web' ? 28 : 24,
      letterSpacing: 0,
    },
    /** Font size: 20/22 */
    'H5 - XS': {
      fontFamily: Fonts['Inter-Bold'],
      fontSize: Platform.OS === 'web' ? 22 : 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    /** Font size: 22/24 */
    'H4 - SM': {
      fontFamily: Fonts['Inter-Bold'],
      fontSize: Platform.OS === 'web' ? 24 : 22,
      lineHeight: Platform.OS === 'web' ? 32 : 28,
      letterSpacing: 0,
    },
    /** Font size: 24/28 */
    'H3 - MD': {
      fontFamily: Fonts['Inter-Bold'],
      fontSize: Platform.OS === 'web' ? 28 : 24,
      lineHeight: Platform.OS === 'web' ? 36 : 32,
      letterSpacing: 0,
    },
    /** Font size: 28/32 */
    'H2 - LG': {
      fontFamily: Fonts['Inter-Bold'],
      fontSize: Platform.OS === 'web' ? 32 : 28,
      lineHeight: Platform.OS === 'web' ? 36 : 32,
      letterSpacing: 0,
    },
    /** Font size: 40/48 */
    'H1 - XL': {
      fontFamily: Fonts['Barlow-SemiBold'],
      fontSize: Platform.OS === 'web' ? 40 : 32,
      lineHeight: Platform.OS === 'web' ? 48 : 40,
      letterSpacing: 0,
    },
  },

  'Corps de texte': {
    XS: {
      Regular: {
        fontFamily: Fonts['Inter-Regular'],
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Caps: {
        fontFamily: Fonts['Inter-Regular'],
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      CapsBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      SemiBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      },
    },
    SM: {
      Regular: {
        fontFamily: Fonts['Inter-Regular'],
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Medium: {
        fontFamily: Fonts['Inter-Medium'],
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      SemiBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      Bold: {
        fontFamily: Fonts['Inter-Bold'],
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      CapsBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
    },
    MD: {
      Regular: {
        fontFamily: Fonts['Inter-Regular'],
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      Medium: {
        fontFamily: Fonts['Inter-Medium'],
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      SemiBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      Bold: {
        fontFamily: Fonts['Inter-Bold'],
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
    },
    LG: {
      Regular: {
        fontFamily: Fonts['Inter-Regular'],
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
      Medium: {
        fontFamily: Fonts['Inter-Medium'],
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
      SemiBold: {
        fontFamily: Fonts['Inter-SemiBold'],
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      },
    },
  },
} as const;
