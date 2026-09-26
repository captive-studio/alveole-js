import { isRecord } from './isRecord';
import { sanitizeCSSKey } from './sanitizeCSSKey';

const traduitArbre = (node: unknown, path: string[] = []): unknown => {
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
    return result;
  }

  return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, traduitArbre(value, [...path, key])]));
};

/**
 * Traduit l'arbre des jetons typographiques pour le rendu web : chaque feuille (reconnue a
 * son `fontSize` numerique) voit ses metriques remplacees par des references aux variables
 * CSS du theme, dont le nom vient du chemin dans l'arbre. La forme de l'arbre est preservee.
 *
 * Seconde assertion toleree, a la frontiere avec React Native : le `TextStyle` natif exige
 * des nombres la ou react-native-web accepte une variable CSS. Un type honnete
 * (`string | number`) serait refuse par chaque style `Text` des applications. Elle est
 * exemptee de la regle par un override de la config ESLint, pas par une directive.
 */
export const toCSSVarTypography = traduitArbre as <T>(node: T) => T;
