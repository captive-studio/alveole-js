import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { versStyleNatif } from '../../core/styleNatif/versStyleNatif';
import { Typography } from '../../core/Typography';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSize, DataTableSort } from './DataTable.types';
import { DataTableHeaderRow } from './DataTableHeaderRow';
import { DataTableRows } from './DataTableRows';
import { useDataTableState } from './useDataTableState';

export type DataTableProps<Row> = {
  columns: DataTableColumn<Row>[];
  data: Row[];
  keyExtractor: (row: Row, index: number) => string;

  /** Densité du tableau : influence les paddings des cellules. @default 'sm' */
  size?: DataTableSize;

  selectable?: boolean;
  /** Contrôlé : clés des lignes sélectionnées. Sans valeur, la sélection est gérée en interne. */
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;

  /** Contrôlé : colonne/direction de tri actives. Sans valeur, le tri est géré en interne (non appliqué aux données, voir `onSortChange`). */
  sort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;

  onRowPress?: (row: Row, index: number) => void;

  /**
   * Masque la ligne d'en-têtes de colonnes (labels, icônes de tri, case "tout sélectionner").
   * Le tri reste utilisable via `sort`/`onSortChange` piloté depuis l'extérieur (ex. un menu).
   */
  hideHeader?: boolean;

  /**
   * Épingle la ligne d'en-têtes en haut de son ascendant scrollable pendant le défilement
   * vertical (web uniquement — sans effet natif, où le `DataTable` ne possède pas son propre
   * scroll). Nécessite que le tableau soit placé dans un conteneur qui défile verticalement
   * (le `DataTable` ne fournit que le scroll horizontal des colonnes).
   */
  stickyHeader?: boolean;

  renderNoContent?: () => React.ReactNode;

  /** Rendu en bas du tableau, typiquement un <DataTableFooter/> avec compteur + <DataTablePagination/>. */
  footer?: React.ReactNode;
};

export const DataTable = <Row,>(props: DataTableProps<Row>) => {
  const {
    columns,
    data,
    size = 'md',
    selectable = false,
    onRowPress,
    hideHeader = false,
    stickyHeader = false,
    renderNoContent,
    footer,
  } = props;

  const styles = useStyles();

  const { rowKeys, selectedKeys, sort, allSelected, someSelected, toggleAll, toggleRow, handleHeaderPress } =
    useDataTableState({ ...props, selectable });

  return (
    <Box tag="data-table" style={styles.table}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={versStyleNatif<StyleProp<ViewStyle>>(styles.scrollContent)}
      >
        {!hideHeader && (
          <DataTableHeaderRow
            columns={columns}
            sort={sort}
            size={size}
            selectable={selectable}
            allSelected={allSelected}
            someSelected={someSelected}
            sticky={stickyHeader}
            onToggleAll={toggleAll}
            onHeaderPress={handleHeaderPress}
          />
        )}

        <DataTableRows
          data={data}
          rowKeys={rowKeys}
          columns={columns}
          selectable={selectable}
          selectedKeys={selectedKeys}
          size={size}
          hasFooter={Boolean(footer)}
          onRowSelectedChange={toggleRow}
          onRowPress={onRowPress}
        />
      </ScrollView>

      {data.length === 0 && (
        <Box tag="data-table-empty" style={styles.emptyState}>
          {renderNoContent ? renderNoContent() : <Typography style={styles.emptyStateLabel}>Aucune donnée</Typography>}
        </Box>
      )}

      {footer}
    </Box>
  );
};
