// This file is generated. Do not edit manually.
// Source: src/core/Typography/Typography.stories.tsx

export const TypographyDefault = () => "export const TypographyDefault = () => <Typography>Contenu par défaut</Typography>;";

export const TypographyPaddedWithColor = () => "export const TypographyPaddedWithColor = () => (\n  <Typography p={8} color={'blue'}>\n    Texte avec padding et couleur\n  </Typography>\n);";

export const TypographyStyleItalic = () => "export const TypographyStyleItalic = () => <Typography fontStyle=\"italic\">Texte en italique</Typography>;";

export const TypographyStyleUnderline = () => "export const TypographyStyleUnderline = () => <Typography textDecorationLine=\"underline\">Texte en souligné</Typography>;";

export const TypographyStyleLineThrough = () => "export const TypographyStyleLineThrough = () => <Typography textDecorationLine=\"line-through\">Texte barré</Typography>;";

export const TypographyTransformCapitalize = () => "export const TypographyTransformCapitalize = () => (\n  <Typography textTransform=\"capitalize\">avec une majuscule</Typography>\n);";

export const TypographyTransformUppercase = () => "export const TypographyTransformUppercase = () => <Typography textTransform=\"uppercase\">En majuscule</Typography>;";

export const storySources = {
  TypographyDefault,
  TypographyPaddedWithColor,
  TypographyStyleItalic,
  TypographyStyleUnderline,
  TypographyStyleLineThrough,
  TypographyTransformCapitalize,
  TypographyTransformUppercase,
} as const;

export type StorySourceName = keyof typeof storySources;
