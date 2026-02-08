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
  '7 colonnes': 792,
  /** @experimental */
  '9 colonnes': 894,
} as const;

// helpers
export type GrilleKey = keyof typeof Grilles;
export type GrilleValue = (typeof Grilles)[GrilleKey];
