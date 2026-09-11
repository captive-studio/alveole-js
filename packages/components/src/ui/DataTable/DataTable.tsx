import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Typography } from '../../core';
import { CheckboxContainer, CheckboxIndicator } from '../Checkbox';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSize, DataTableSort } from './DataTable.types';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableRow } from './DataTableRow';

const headerSelectionCellStyleBySize = {
  sm: 'headerSelectionCellSm',
  md: 'headerSelectionCellMd',
  lg: 'headerSelectionCellLg',
} as const;

const headerRowStyleBySize = {
  sm: 'headerRowSm',
  md: 'headerRowMd',
  lg: 'headerRowLg',
} as const;

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

  renderNoContent?: () => React.ReactNode;

  /** Rendu en bas du tableau, typiquement un <DataTableFooter/> avec compteur + <DataTablePagination/>. */
  footer?: React.ReactNode;
};

export const DataTable = <Row,>(props: DataTableProps<Row>) => {
  const {
    columns,
    data,
    keyExtractor,
    size = 'sm',
    selectable = false,
    selectedKeys: controlledSelectedKeys,
    onSelectionChange,
    sort: controlledSort,
    onSortChange,
    onRowPress,
    hideHeader = false,
    renderNoContent,
    footer,
  } = props;

  const styles = useStyles();

  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<string[]>([]);
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const setSelectedKeys = (keys: string[]) => {
    onSelectionChange?.(keys);
    if (controlledSelectedKeys === undefined) setInternalSelectedKeys(keys);
  };

  const [internalSort, setInternalSort] = React.useState<DataTableSort | null>(null);
  const sort = controlledSort !== undefined ? controlledSort : internalSort;
  const setSort = (next: DataTableSort | null) => {
    onSortChange?.(next);
    if (controlledSort === undefined) setInternalSort(next);
  };

  const rowKeys = React.useMemo(() => data.map((row, index) => keyExtractor(row, index)), [data, keyExtractor]);
  const allSelected = selectable && rowKeys.length > 0 && rowKeys.every(key => selectedKeys.includes(key));
  const someSelected = selectable && !allSelected && rowKeys.some(key => selectedKeys.includes(key));

  const toggleAll = () => setSelectedKeys(allSelected ? [] : rowKeys);
  const toggleRow = (rowKey: string, checked: boolean) => {
    setSelectedKeys(checked ? [...selectedKeys, rowKey] : selectedKeys.filter(key => key !== rowKey));
  };

  const handleHeaderPress = (column: DataTableColumn<Row>) => {
    if (sort?.columnId !== column.id) {
      setSort({ columnId: column.id, direction: 'asc' });
    } else if (sort.direction === 'asc') {
      setSort({ columnId: column.id, direction: 'desc' });
    } else {
      setSort(null);
    }
  };

  return (
    <Box tag="data-table" style={styles.table}>
      <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.scrollContent as object}>
        {!hideHeader && (
          <Box tag="data-table-header-row" style={[styles.headerRow, styles[headerRowStyleBySize[size]]]}>
            {selectable && (
              <Box
                tag="data-table-header-selection-cell"
                style={[styles.headerSelectionCell, styles[headerSelectionCellStyleBySize[size]]]}
              >
                <CheckboxContainer
                  id="data-table--select-all"
                  variant="small"
                  checked={someSelected ? 'indeterminate' : allSelected}
                  onCheckedChange={toggleAll}
                >
                  <CheckboxIndicator variant="small" indeterminate={someSelected} />
                </CheckboxContainer>
              </Box>
            )}
            {columns.map(column => (
              <DataTableHeaderCell
                key={column.id}
                column={column}
                sortDirection={sort?.columnId === column.id ? sort.direction : undefined}
                size={size}
                onPress={() => handleHeaderPress(column)}
              />
            ))}
          </Box>
        )}

        {data.map((row, index) => {
          const rowKey = rowKeys[index];
          return (
            <DataTableRow
              key={rowKey}
              row={row}
              rowIndex={index}
              rowKey={rowKey}
              columns={columns}
              selectable={selectable}
              selected={selectedKeys.includes(rowKey)}
              size={size}
              noBorderBottom={!footer && index === data.length - 1}
              onSelectedChange={checked => toggleRow(rowKey, checked)}
              onPress={onRowPress ? () => onRowPress(row, index) : undefined}
            />
          );
        })}
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
