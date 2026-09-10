import React from 'react';

export type DataTableAlign = 'start' | 'end';

/** Densité du tableau : influence les paddings des cellules (en-têtes, corps, colonne de sélection). */
export type DataTableSize = 'sm' | 'md' | 'lg';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableSort = {
  columnId: string;
  direction: DataTableSortDirection;
};

export type DataTableColumn<Row> = {
  /** Identifiant unique de la colonne, utilisé pour le tri. */
  id: string;
  header: React.ReactNode;
  renderCell: (row: Row, rowIndex: number) => React.ReactNode;
  align?: DataTableAlign;
  sortable?: boolean;
  /** Largeur fixe en px. Sans valeur, la colonne se répartit l'espace disponible (flex: 1). */
  width?: number;
};
