/** Le cran d'une echelle de `Colors` qu'un token reference : `Neutre` et `900`. */
export type NuanceReferencee = { echelle: string; numero: string };

/**
 * Un token semantique de `CustomPalette`, tel que l'extraction le lit dans le source du theme
 * (ADR 0035). La nuance est `null` pour une valeur ecrite en dur, comme `transparent`.
 */
export type TokenSemantique = {
  chemin: string;
  famille: string;
  nuance: NuanceReferencee | null;
  hex: string;
  deprecie: boolean;
  remplacant: string | null;
};

export type CatalogueDesCouleurs = { tokens: TokenSemantique[] };
