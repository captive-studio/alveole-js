/**
 * Les largeurs de la grille du design system : colonne de 78, gouttière de 24.
 * Une clé de n colonnes vaut donc n * 78 + (n - 1) * 24, jusqu'à 1200 pour 12 colonnes.
 */
export const Grilles = {
  /** @experimental */
  '2 colonnes': 180,
  /** @experimental */
  '3 colonnes': 282,
  /** @experimental */
  '4 colonnes': 384,
  /** @experimental */
  '6 colonnes': 588,
  /** @experimental */
  '7 colonnes': 690,
  /** @experimental */
  '8 colonnes': 792,
  /** @experimental */
  '9 colonnes': 894,
  /** @experimental */
  '12 colonnes': 1200,
} as const;

// helpers
export type GrilleKey = keyof typeof Grilles;
export type GrilleValue = (typeof Grilles)[GrilleKey];
