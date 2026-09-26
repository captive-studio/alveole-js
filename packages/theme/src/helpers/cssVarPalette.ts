import { mapValues } from './mapValues';

/**
 * Traduit la palette `light` pour le rendu web : chaque couleur devient une reference a la
 * variable CSS `--${categorie}-${jeton}`. Les cles sont preservees, d'ou la signature generique.
 */
export const toCSSVarPalette = <T extends { light: Record<string, Record<string, string>> }>(palette: T) => ({
  ...palette,
  light: mapValues(palette.light, (jetons, categorie) =>
    mapValues(jetons, (_couleur, jeton) => `var(--${categorie}-${jeton})`),
  ),
});
