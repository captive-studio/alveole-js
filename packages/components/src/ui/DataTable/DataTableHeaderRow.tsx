import { Box } from '../../core/Box';
import { CheckboxContainer, CheckboxIndicator } from '../Checkbox';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSize, DataTableSort } from './DataTable.types';
import { DataTableHeaderCell } from './DataTableHeaderCell';

export type DataTableHeaderRowProps<Row> = {
  columns: DataTableColumn<Row>[];
  sort: DataTableSort | null;
  size: DataTableSize;
  selectable: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  onHeaderPress: (column: DataTableColumn<Row>) => void;
};

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

export const DataTableHeaderRow = <Row,>(props: DataTableHeaderRowProps<Row>) => {
  const { columns, sort, size, selectable, allSelected, someSelected, onToggleAll, onHeaderPress } = props;
  const styles = useStyles();

  return (
    <Box tag="data-table-header-row" style={[styles.headerRow, styles[headerRowStyleBySize[size]]]}>
      {selectable && (
        <Box
          tag="data-table-header-selection-cell"
          style={[styles.headerSelectionCell, styles[headerSelectionCellStyleBySize[size]]]}
        >
          <CheckboxContainer
            id="data-table--select-all"
            aria-label="Tout sélectionner"
            variant="small"
            checked={someSelected ? 'indeterminate' : allSelected}
            onCheckedChange={onToggleAll}
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
          onPress={() => onHeaderPress(column)}
        />
      ))}
    </Box>
  );
};
