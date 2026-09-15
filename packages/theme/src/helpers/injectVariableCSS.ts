import { Colors, CustomPalette, Spacings } from '../constants';
import { Elevations } from '../constants/Elevation';
import { FontWeightMap } from '../constants/Font';
import { RadiusList } from '../constants/Radius';
import { CustomTypography } from '../constants/Typography';
import { Theme } from '../type';
import { sanitizeCSSKey } from './sanitizeCSSKey';

const buildColorVarMap = (constants: Theme['color']['_constants']): Map<string, string> => {
  const map = new Map<string, string>();
  Object.entries(constants).forEach(([name, shades]) => {
    Object.entries(shades as Record<string, string>).forEach(([variant, value]) => {
      if (typeof value === 'string') {
        map.set(value, `--color-${name}-${variant}`);
      }
    });
  });
  return map;
};

const generateSemanticTokenLines = (
  category: string,
  tokens: Record<string, unknown>,
  colorVarMap: Map<string, string>,
): string[] => {
  const lines: string[] = [];
  Object.entries(tokens).forEach(([token, value]) => {
    if (typeof value !== 'string') return;
    const varRef = colorVarMap.get(value);
    lines.push(`  --${category}-${token}: ${varRef ? `var(${varRef})` : value};`);
  });
  return lines;
};

export const generateCSSVariables = (theme: Theme): string => {
  const lines: string[] = [];
  const colorVarMap = buildColorVarMap(theme.color._constants);

  // Couleurs palette
  Object.entries(theme.color._constants).forEach(([key, colors]) => {
    Object.entries(colors).forEach(([variant, value]) => {
      lines.push(`  --color-${key}-${variant}: ${value};`);
    });
  });

  // Spacing
  Object.entries(Spacings).forEach(([key, value]) => {
    lines.push(`  --spacing-${sanitizeCSSKey(key)}: ${value}px;`);
  });

  // Radius
  Object.entries(RadiusList).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value}px;`);
  });

  // Elevations
  Object.entries(Elevations).forEach(([key, value]) => {
    lines.push(`  --elevation-${key}: ${value.web};`);
  });

  // Font base variables + reverse map pour les tokens typographiques
  const fontReverseMap = new Map<string, string>();
  Object.entries(FontWeightMap).forEach(([key, { familyWithFallback, weight }]) => {
    fontReverseMap.set(`${familyWithFallback}__${weight}`, key);
    lines.push(`  --font-${key}-family: ${familyWithFallback};`);
    lines.push(`  --font-${key}-weight: ${weight};`);
  });

  // Semantic tokens typographiques (--typography-{...}-font-size, etc.)
  collectTypographyLines([], CustomTypography, fontReverseMap, lines);

  // Semantic tokens light (--{category}-{token}: var(--color-...))
  const light = theme.color._rawLight as Record<string, Record<string, unknown>>;
  Object.entries(light).forEach(([category, tokens]) => {
    if (typeof tokens !== 'object' || tokens === null) return;
    lines.push(...generateSemanticTokenLines(category, tokens, colorVarMap));
  });

  const rootBlock = `:root {\n${lines.join('\n')}\n}`;

  return rootBlock;
};

const collectTypographyLines = (
  path: string[],
  node: unknown,
  fontReverseMap: Map<string, string>,
  lines: string[],
): void => {
  if (typeof node !== 'object' || node === null) return;
  const obj = node as Record<string, unknown>;

  if (typeof obj.fontSize === 'number') {
    const prefix = `  --typography-${path.map(sanitizeCSSKey).join('-')}`;

    if (typeof obj.fontFamily === 'string') {
      const weight = typeof obj.fontWeight === 'string' ? obj.fontWeight : '';
      const fontKey =
        fontReverseMap.get(`${obj.fontFamily}__${weight}`) ??
        (obj.fontFamily in FontWeightMap ? obj.fontFamily : undefined);
      if (fontKey) {
        lines.push(`${prefix}-font-family: var(--font-${fontKey}-family);`);
        lines.push(`${prefix}-font-weight: var(--font-${fontKey}-weight);`);
      } else {
        lines.push(`${prefix}-font-family: ${obj.fontFamily};`);
        if (weight) lines.push(`${prefix}-font-weight: ${weight};`);
      }
    }

    lines.push(`${prefix}-font-size: ${obj.fontSize}px;`);
    if (typeof obj.lineHeight === 'number') {
      lines.push(`${prefix}-line-height: ${obj.lineHeight}px;`);
    }
    if (typeof obj.letterSpacing === 'number' && obj.letterSpacing !== 0) {
      lines.push(`${prefix}-letter-spacing: ${obj.letterSpacing}px;`);
    }
    if (typeof obj.textTransform === 'string') {
      lines.push(`${prefix}-text-transform: ${obj.textTransform};`);
    }
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    collectTypographyLines([...path, key], value, fontReverseMap, lines);
  });
};

export const injectVariableCSS = (theme: Theme) => {
  if (typeof document === 'undefined') return;

  const styleId = 'theme-css-variables';
  const oldStyle = document.getElementById(styleId);
  if (oldStyle) oldStyle.remove();

  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.innerHTML = generateCSSVariables(theme);

  document.head.appendChild(styleTag);
};

export const generateFontFaceCSS = (): string => {
  const weightsByFamily = new Map<string, Set<string>>();
  Object.values(FontWeightMap).forEach(({ family, weight }) => {
    if (!weightsByFamily.has(family)) weightsByFamily.set(family, new Set());
    weightsByFamily.get(family)?.add(String(weight));
  });

  const families = Array.from(weightsByFamily.entries())
    .map(([family, weights]) => `family=${family.replace(/ /g, '+')}:wght@${Array.from(weights).sort().join(';')}`)
    .join('&');

  return `@import url('https://fonts.googleapis.com/css2?${families}&display=swap');`;
};

const DefaultTheme = {
  color: {
    _constants: Colors,
    _rawLight: CustomPalette.light,
  },
} as Theme;

/**
 * Le CSS que le paquet emet sur le web, en morceaux ordonnes. Les deux assembleurs
 * (le `<style>` de WebThemeStyles et le `dist/default.css` du script de build) passent
 * par ici : sans ce point unique, la liste serait tenue en phase a la main dans deux
 * fichiers dont l'un est un script que personne ne relit.
 */
export const generateThemeCSSParts = (theme: Theme = DefaultTheme): string[] => [
  generateFontFaceCSS(),
  generateCSSVariables(theme),
];
