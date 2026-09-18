import { isRecord } from './isRecord';
import { sanitizeCSSKey } from './sanitizeCSSKey';

/**
 * Traduit l'arbre des jetons typographiques pour le rendu web : chaque feuille (reconnue a
 * son `fontSize` numerique) voit ses metriques remplacees par des references aux variables
 * CSS du theme, dont le nom vient du chemin dans l'arbre. La forme de l'arbre est preservee,
 * d'ou la signature generique : ce que `Theme['text']` attend, la fonction le rend.
 */
export const toCSSVarTypography = <T>(node: T, path: string[] = []): T => {
  if (!isRecord(node)) return node;

  if (typeof node.fontSize === 'number') {
    const prefix = path.map(sanitizeCSSKey).join('-');
    const result: Record<string, unknown> = { ...node };
    result.fontFamily = `var(--typography-${prefix}-font-family)`;
    result.fontWeight = `var(--typography-${prefix}-font-weight)`;
    result.fontSize = `var(--typography-${prefix}-font-size)`;
    result.lineHeight = `var(--typography-${prefix}-line-height)`;
    if (typeof node.letterSpacing === 'number' && node.letterSpacing !== 0) {
      result.letterSpacing = `var(--typography-${prefix}-letter-spacing)`;
    }
    if (typeof node.textTransform === 'string') {
      result.textTransform = `var(--typography-${prefix}-text-transform)`;
    }
    return result as T;
  }

  const result: Record<string, unknown> = {};
  Object.entries(node).forEach(([key, value]) => {
    result[key] = toCSSVarTypography(value, [...path, key]);
  });
  return result as T;
};
