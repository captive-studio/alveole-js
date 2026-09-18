import { isRecord } from './isRecord';

/**
 * Traduit la palette `light` pour le rendu web : chaque couleur (valeur chaine) devient une
 * reference a la variable CSS `--${categorie}-${jeton}`, tandis que les valeurs non-chaines
 * restent inchangees. La forme de la palette est preservee, d'ou la signature generique.
 */
export const toCSSVarPalette = <T extends { light: Record<string, unknown> }>(palette: T): T => {
  const webLight: Record<string, unknown> = {};

  Object.entries(palette.light).forEach(([category, tokens]) => {
    if (!isRecord(tokens)) {
      webLight[category] = tokens;
      return;
    }
    const webTokens: Record<string, unknown> = {};
    Object.entries(tokens).forEach(([token, value]) => {
      webTokens[token] = typeof value === 'string' ? `var(--${category}-${token})` : value;
    });
    webLight[category] = webTokens;
  });

  return { ...palette, light: webLight } as T;
};
