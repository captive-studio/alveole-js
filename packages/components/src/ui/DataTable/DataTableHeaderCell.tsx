import { Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSize, DataTableSortDirection } from './DataTable.types';
import { DataTableCell } from './DataTableCell';

export type DataTableHeaderCellProps<Row> = {
  column: DataTableColumn<Row>;
  sortDirection?: DataTableSortDirection;
  size?: DataTableSize;
  onPress?: () => void;
};

export const DataTableHeaderCell = <Row,>(props: DataTableHeaderCellProps<Row>) => {
  const { column, sortDirection, size, onPress } = props;
  const styles = useStyles();

  const isSortable = column.sortable === true;
  const isActive = sortDirection !== undefined;

  return (
    <DataTableCell
      variant="header"
      align={column.align}
      width={column.width}
      size={size}
      onPress={isSortable ? onPress : undefined}
    >
      <Typography tag="data-table-header-label" style={[styles.headerLabel, isActive ? styles.headerLabelActive : {}]}>
        {column.header}
      </Typography>
      {isSortable && isActive && (
        <LucideIcon
          name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'}
          size="xs"
          color={styles.headerLabelActive.color}
        />
      )}
    </DataTableCell>
  );
};
