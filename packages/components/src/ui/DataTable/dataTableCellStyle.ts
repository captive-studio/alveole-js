import type { useStyles } from './DataTable.styles';
import { DataTableAlign, DataTableSize } from './DataTable.types';

type DataTableStyles = ReturnType<typeof useStyles>;

export type DataTableCellState = {
  variant: 'header' | 'body';
  size: DataTableSize;
  align: DataTableAlign;
  width?: number;
  noPadding: boolean;
  pressable: boolean;
};

/**
 * L'aspect d'une cellule : son retrait selon la variante et la taille, son alignement, sa
 * largeur fixe ou elastique, et ce que le survol en dit quand elle est cliquable. Ces regles
 * s'empilaient en ternaires dans le rendu, ou elles ne disaient pas leur nom et ou elles
 * faisaient a elles seules toute la complexite du composant.
 */
export const dataTableCellStyle = (
  styles: DataTableStyles,
  { variant, size, align, width, noPadding, pressable }: DataTableCellState,
) => {
  const retrait = {
    header: { sm: styles.headerCellSm, md: styles.headerCellMd, lg: styles.headerCellLg },
    body: { sm: styles.cellSm, md: styles.cellMd, lg: styles.cellLg },
  }[variant][size];

  return {
    tag: variant === 'header' ? ('data-table-header-cell' as const) : ('data-table-cell' as const),
    // Le survol ne repond que la ou il y a quelque chose a presser.
    hover: pressable ? { opacity: 0.8 } : undefined,
    style: [
      variant === 'header' ? styles.headerCell : styles.cell,
      noPadding ? {} : retrait,
      align === 'end' ? styles.cellAlignEnd : {},
      // Une largeur donnee fige la colonne ; sans elle, les cellules se partagent la place.
      width !== undefined ? { width, flex: 'none' as const } : { flex: 1 },
      pressable ? { cursor: 'pointer' } : {},
    ],
  };
};
