/* global jest */

jest.mock('@alveole/theme', () => {
  const { Colors } = jest.requireActual('../../../theme/src/constants/Color');
  const { CustomPalette } = jest.requireActual('../../../theme/src/constants/Palette');
  const { RadiusList } = jest.requireActual('../../../theme/src/constants/Radius');
  const { Grilles } = jest.requireActual('../../../theme/src/constants/Grille');
  const { isSpacingKey } = jest.requireActual('../../../theme/src/helpers/isSpacingKey');
  const { Sizes, Heights } = jest.requireActual('../../../theme/src/constants/Sizes');
  const { Spacings } = jest.requireActual('../../../theme/src/constants/Spacing');
  const { alpha } = jest.requireActual('../../../theme/src/helpers/alphaColor');
  const { darken } = jest.requireActual('../../../theme/src/helpers/darkenColor');

  const text = {
    'Corps de texte': {
      XS: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
        Bold: { fontFamily: 'Inter-Bold', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
        CapsBold: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0,
          textTransform: 'uppercase',
        },
        SemiBold: { fontFamily: 'Inter-SemiBold', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
      },
      SM: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        Medium: { fontFamily: 'Inter-Medium', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        Bold: { fontFamily: 'Inter-Bold', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        CapsBold: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0,
          textTransform: 'uppercase',
        },
        SemiBold: { fontFamily: 'Inter-SemiBold', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
      },
      MD: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
        Medium: { fontFamily: 'Inter-Medium', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
        SemiBold: { fontFamily: 'Inter-SemiBold', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      },
    },
    fontSize: Sizes,
    lineHeight: Heights,
  };

  const testTheme = {
    color: { _constants: Colors, alpha, darken, ...CustomPalette },
    externalPadding: () => Spacings['2W'],
    font: {},
    grilles: Grilles,
    isVariant: variant => variant === 'desktop',
    radius: key => RadiusList[key],
    shadows: () => ({}),
    spacing: key => Spacings[key],
    text,
    variant: 'desktop',
  };

  return {
    Colors,
    isSpacingKey,
    makeStyles: stylesFn => () => stylesFn(testTheme),
    Spacings,
  };
});
