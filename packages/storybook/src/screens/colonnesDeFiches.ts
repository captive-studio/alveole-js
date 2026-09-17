/**
 * Les paliers de la grille de fiches. Ils sont exprimes en largeur minimale : la premiere
 * entree qui tient decide du nombre de colonnes.
 */
const PALIERS = [
  { aPartirDe: 1200, colonnes: 3 },
  { aPartirDe: 768, colonnes: 2 },
];

/** L'espace entre deux colonnes, en pixels. Il vaut le `gap` de la rangee de cartes. */
const GOUTTIERE = 16;

/**
 * La largeur d'une carte, en CSS. Une seule colonne prend toute la place ; au-dela, la rangee
 * retranche les gouttieres avant de partager, et il y en a une de moins que de colonnes.
 */
export const largeurDeColonne = (largeurDeFenetre: number): string => {
  const { colonnes } = PALIERS.find(palier => largeurDeFenetre >= palier.aPartirDe) ?? { colonnes: 1 };

  if (colonnes === 1) return '100%';

  return `calc((100% - ${GOUTTIERE * (colonnes - 1)}px) / ${colonnes})`;
};
