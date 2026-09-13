/**
 * Dimensions partagees par tous les controles (bouton, champ, selecteur, puce).
 *
 * Elles sont fixees ici plutot que derivees d'un padding et d'une hauteur de ligne :
 * c'est ce qui garantit qu'un bouton et un champ places cote a cote s'alignent.
 * L'echelle suit les primitives de Primer, ou `md` est le cran par defaut.
 */
export const ControlSizes = {
  xs: { height: 24, paddingInline: 8, gap: 4 },
  sm: { height: 28, paddingInline: 8, gap: 8 },
  md: { height: 32, paddingInline: 12, gap: 8 },
  lg: { height: 40, paddingInline: 16, gap: 8 },
  xl: { height: 48, paddingInline: 16, gap: 8 },
} as const;

export type ControlSizeKey = keyof typeof ControlSizes;
