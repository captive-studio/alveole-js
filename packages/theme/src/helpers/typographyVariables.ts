import { sanitizeCSSKey } from './sanitizeCSSKey';

/** Couple `${famille}__${poids}` vers la cle de police du catalogue. */
export type FontCatalogue = Map<string, string>;

const resolveFontKey = (fontFamily: string, fontWeight: string, catalogue: FontCatalogue): string | undefined => {
  const byFamilyAndWeight = catalogue.get(`${fontFamily}__${fontWeight}`);
  if (byFamilyAndWeight) return byFamilyAndWeight;

  // Hors web, `fontStyle` pose la cle du catalogue directement dans `fontFamily`.
  return Array.from(catalogue.values()).find(key => key === fontFamily);
};

export const fontVariableLines = (
  prefix: string,
  fontFamily: string,
  fontWeight: string,
  catalogue: FontCatalogue,
): string[] => {
  const fontKey = resolveFontKey(fontFamily, fontWeight, catalogue);

  if (fontKey) {
    return [
      `${prefix}-font-family: var(--font-${fontKey}-family);`,
      `${prefix}-font-weight: var(--font-${fontKey}-weight);`,
    ];
  }

  return [`${prefix}-font-family: ${fontFamily};`, ...(fontWeight ? [`${prefix}-font-weight: ${fontWeight};`] : [])];
};

export type TypographyMetrics = {
  fontSize: number;
  lineHeight?: unknown;
  letterSpacing?: unknown;
  textTransform?: unknown;
};

export const metricVariableLines = (prefix: string, metrics: TypographyMetrics): string[] => [
  `${prefix}-font-size: ${metrics.fontSize}px;`,
  ...(typeof metrics.lineHeight === 'number' ? [`${prefix}-line-height: ${metrics.lineHeight}px;`] : []),
  ...(typeof metrics.letterSpacing === 'number' && metrics.letterSpacing !== 0
    ? [`${prefix}-letter-spacing: ${metrics.letterSpacing}px;`]
    : []),
  ...(typeof metrics.textTransform === 'string' ? [`${prefix}-text-transform: ${metrics.textTransform};`] : []),
];

const isRecord = (node: unknown): node is Record<string, unknown> => typeof node === 'object' && node !== null;

/**
 * Traduit l'arbre des jetons typographiques en declarations CSS. Chaque feuille est
 * reconnue a son `fontSize` : au-dessus, ce sont des regroupements dont le nom se
 * concatene pour former celui de la variable.
 */
export const typographyVariableLines = (
  typography: unknown,
  catalogue: FontCatalogue,
  path: string[] = [],
): string[] => {
  if (!isRecord(typography)) return [];

  if (typeof typography.fontSize !== 'number') {
    return Object.entries(typography).flatMap(([key, value]) =>
      typographyVariableLines(value, catalogue, [...path, key]),
    );
  }

  const prefix = `  --typography-${path.map(sanitizeCSSKey).join('-')}`;

  return [
    ...(typeof typography.fontFamily === 'string'
      ? fontVariableLines(
          prefix,
          typography.fontFamily,
          typeof typography.fontWeight === 'string' ? typography.fontWeight : '',
          catalogue,
        )
      : []),
    ...metricVariableLines(prefix, typography as TypographyMetrics),
  ];
};
