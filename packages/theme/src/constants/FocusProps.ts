import { FOCUS_DATA_SET_KEY } from './Focus';
import { Marques, marques } from './marques';

/**
 * `ring` pose la bague hors de l'element. `inset` la rentre a l'interieur, pour ce qui est a
 * ras d'un bord ou rogne par un parent : cellules de tableau, items de barre laterale.
 */
export type FocusRingVariant = 'ring' | 'inset';

/**
 * Les props par lesquelles un composant demande la bague de focus du kit.
 *
 * `dataSet` est une extension de react-native-web : elle rend des attributs `data-*` sur le
 * web, et n'existe pas dans les types de react-native. Le cast vit donc ici, une fois, plutot
 * que dans chacun des composants qui demandent la bague.
 *
 * Sur le natif la prop est simplement ignoree, ce qui convient : `outline` n'existe pas sur
 * iOS (cf. UnsupportedCSSProperties), et un anneau natif demanderait une vue dessinee en
 * absolu.
 */
export const focusRingProps = (variante: FocusRingVariant = 'ring'): Marques =>
  marques({ [FOCUS_DATA_SET_KEY]: variante });
