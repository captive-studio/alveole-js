/**
 * Dimensions de la puce : etiquette compacte qui qualifie un objet (Tag, Badge, Counter).
 *
 * Echelle distincte de celle des controles, et non un cran emprunte a `Control` : une puce
 * n'est ni cliquable ni une cible tactile, elle n'a donc aucune raison de suivre le gabarit
 * d'un bouton. Les trois references tranchent dans ce sens : Primer donne a `Label` 20/24 et
 * a `Token` 16/20/24/32, Base a `Tag` 20/24/32/40, tous sous ou au niveau de leur plus petit
 * cran de controle. `Pill.test.ts` fige ce non-croisement.
 *
 * Une seule densite, contrairement a `Control` (ADR 0013) : le dedoublement desktop/mobile
 * existe pour garantir une surface au doigt, ce qu'une puce n'a pas a offrir.
 *
 * Les hauteurs sont explicites, jamais deduites d'un padding et d'une hauteur de ligne :
 * c'est ce qui evite qu'un changement de metrique de police redimensionne tout le kit.
 * Les retraits reprennent ceux du `Label` de Primer, qui partage exactement cette echelle.
 */
export const PillSizes = {
  sm: { height: 20, paddingInline: 6, gap: 4 },
  md: { height: 24, paddingInline: 8, gap: 4 },
} as const;

export type PillSize = { height: number; paddingInline: number; gap: number };
export type PillSizeKey = keyof typeof PillSizes;

/**
 * Pendant de `controlSizesFor`, sans parametre de densite : il n'y a qu'une echelle de puce.
 * La lecture vit ici plutot que dans le constructeur de theme, ou elle ne serait ni relisable
 * a cote de la table ni testable sans monter un theme.
 */
export const pillSizeFor = (key: PillSizeKey): PillSize => PillSizes[key];
