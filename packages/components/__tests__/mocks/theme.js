jest.mock('@alveole/theme', () => {
  // Le theme reel, que le mock ne fait que completer : un export ajoute au theme arrive ici
  // sans qu'il faille le recopier.
  const actual = jest.requireActual('../../../theme/src');
  const { Colors, CustomPalette, Grilles, Heights, RadiusList, Sizes, Spacings } = actual;
  // Ces modules ne sont pas exportes par l'index du theme.
  const { controlSizesFor } = jest.requireActual('../../../theme/src/constants/Control');
  const { PillSizes } = jest.requireActual('../../../theme/src/constants/Pill');
  const { alpha } = jest.requireActual('../../../theme/src/helpers/alphaColor');
  const { darken } = jest.requireActual('../../../theme/src/helpers/darkenColor');

  const text = {
    'Corps de texte': {
      XS: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
        Bold: { fontFamily: 'Inter-Bold', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
        CapsBold: {
          fontFamily: 'Inter-Bold',
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0,
          textTransform: 'uppercase',
        },
        SemiBold: { fontFamily: 'Inter-Bold', fontSize: 12, lineHeight: 20, letterSpacing: 0 },
      },
      SM: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        Medium: { fontFamily: 'Inter-Medium', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        Bold: { fontFamily: 'Inter-Bold', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
        CapsBold: {
          fontFamily: 'Inter-Bold',
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0,
          textTransform: 'uppercase',
        },
        SemiBold: { fontFamily: 'Inter-Bold', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
      },
      MD: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
        Medium: { fontFamily: 'Inter-Medium', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
        SemiBold: { fontFamily: 'Inter-Bold', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      },
      LG: {
        Regular: { fontFamily: 'Inter-Regular', fontSize: 18, lineHeight: 28, letterSpacing: 0 },
        Medium: { fontFamily: 'Inter-Medium', fontSize: 18, lineHeight: 28, letterSpacing: 0 },
        SemiBold: { fontFamily: 'Inter-Bold', fontSize: 18, lineHeight: 28, letterSpacing: 0 },
      },
    },
    // Les titres manquaient : tout composant qui en pose un plantait au rendu, ce qui
    // rendait `Autocomplete` et ses voisins intestables. Tailles reprises du theme web.
    Titres: {
      'H6 - XXS': { fontFamily: 'Geist-Bold', fontSize: 20, lineHeight: 28, letterSpacing: 0 },
      'H5 - XS': { fontFamily: 'Geist-Bold', fontSize: 22, lineHeight: 30, letterSpacing: 0 },
      'H4 - SM': { fontFamily: 'Geist-Bold', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
      'H3 - MD': { fontFamily: 'Geist-Bold', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
      'H2 - LG': { fontFamily: 'Geist-Bold', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
      'H1 - XL': { fontFamily: 'Geist-Bold', fontSize: 40, lineHeight: 48, letterSpacing: 0 },
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
    control: key => controlSizesFor('desktop')[key],
    // Densite unique, contrairement a `control` : aucun choix de variante a faire ici.
    pill: key => PillSizes[key],
    radius: key => RadiusList[key],
    shadows: () => ({}),
    spacing: key => Spacings[key],
    spacingValue: key => Spacings[key],
    text,
    variant: 'desktop',
  };

  return {
    ...actual,
    makeStyles: stylesFn => () => stylesFn(testTheme),
    useTheme: () => testTheme,
  };
});
