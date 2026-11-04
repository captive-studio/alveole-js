/** Le cran d'une echelle de `Colors` qu'un token reference : `Neutre` et `900`. */
export type NuanceReferencee = { echelle: string; numero: string };

/** Un composant exporte qui cite le token dans son code, et le titre de sa story (ADR 0035). */
export type Consommateur = { nom: string; story: string | null };

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
  /** La phrase d'usage ecrite en JSDoc a cote du token, `null` s'il n'en a pas (ADR 0035). */
  usage?: string | null;
  /** Absent d'un catalogue construit avant leur extraction : l'ecran ne dit alors rien. */
  consommateurs?: Consommateur[];
};

/** Un cran d'une echelle de `Colors`, avec les chemins des tokens qui le citent dans le source. */
export type Nuance = {
  echelle: string;
  numero: string;
  hex: string;
  /** Le cran porte un `@deprecated` dans `Colors`. */
  deprecie: boolean;
  tokens: string[];
  tokensDeprecies: string[];
};

export type CatalogueDesCouleurs = { tokens: TokenSemantique[]; nuances: Nuance[] };
