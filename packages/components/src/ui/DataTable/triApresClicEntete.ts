import { DataTableSort } from './DataTable.types';

/**
 * Calcule le tri suivant au clic sur l'en-tête d'une colonne : ascendant sur une nouvelle
 * colonne, puis descendant, puis retiré, en cycle sur la colonne déjà triée.
 */
export const triApresClicEntete = (sort: DataTableSort | null, columnId: string): DataTableSort | null => {
  if (sort?.columnId === columnId) {
    return sort.direction === 'asc' ? { columnId, direction: 'desc' } : null;
  }
  return { columnId, direction: 'asc' };
};
