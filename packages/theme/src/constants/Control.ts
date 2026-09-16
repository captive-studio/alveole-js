/**
 * Dimensions partagees par tous les controles (bouton, champ, selecteur, puce).
 *
 * Elles sont fixees ici plutot que derivees d'un padding et d'une hauteur de ligne :
 * c'est ce qui garantit qu'un bouton et un champ places cote a cote s'alignent.
 *
 * Deux echelles plutot qu'une (ADR 0013) : les outils professionnels sont compacts,
 * l'usage au doigt demande de la place. `tablet` se range avec `mobile`, un iPad etant
 * tactile. L'echelle desktop suit les primitives de Primer.
 */
const DESKTOP = {
  xs: { height: 24, paddingInline: 8, gap: 4 },
  sm: { height: 28, paddingInline: 8, gap: 8 },
  md: { height: 32, paddingInline: 12, gap: 8 },
  lg: { height: 40, paddingInline: 16, gap: 8 },
  xl: { height: 48, paddingInline: 16, gap: 8 },
} as const;

/** Reprend les hauteurs actuelles du kit : aucune rupture visuelle sur telephone. */
const MOBILE = {
  xs: { height: 28, paddingInline: 8, gap: 8 },
  sm: { height: 32, paddingInline: 12, gap: 8 },
  md: { height: 40, paddingInline: 16, gap: 8 },
  lg: { height: 48, paddingInline: 24, gap: 8 },
  xl: { height: 56, paddingInline: 24, gap: 8 },
} as const;

export const ControlSizes = { desktop: DESKTOP, mobile: MOBILE } as const;

export type ControlDensite = keyof typeof ControlSizes;
export type ControlSizeKey = keyof typeof DESKTOP;
