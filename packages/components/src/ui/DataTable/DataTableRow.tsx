import { Box } from '../../core';
import { CheckboxContainer, CheckboxIndicator } from '../Checkbox';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSize } from './DataTable.types';
import { DataTableCell } from './DataTableCell';

export type DataTableRowProps<Row> = {
  row: Row;
  rowIndex: number;
  rowKey: string;
  columns: DataTableColumn<Row>[];
  selectable?: boolean;
  selected?: boolean;
  size?: DataTableSize;
  /** Retire la bordure basse (dernière ligne quand le tableau n'a pas de footer, pour éviter un double trait avec la bordure du conteneur). */
  noBorderBottom?: boolean;
  onSelectedChange?: (checked: boolean) => void;
  onPress?: () => void;
};

const selectionCellStyleBySize = {
  sm: 'selectionCellSm',
  md: 'selectionCellMd',
  lg: 'selectionCellLg',
} as const;

const rowStyleBySize = {
  sm: 'rowSm',
  md: 'rowMd',
  lg: 'rowLg',
} as const;

export const DataTableRow = <Row,>(props: DataTableRowProps<Row>) => {
  const {
    row,
    rowIndex,
    rowKey,
    columns,
    selectable,
    selected,
    size = 'sm',
    noBorderBottom,
    onSelectedChange,
    onPress,
  } = props;
  const styles = useStyles();

  return (
    <Box
      tag="data-table-row"
      onPress={onPress}
      hoverStyle={onPress ? styles.rowHover : {}}
      style={[
        styles.row,
        styles[rowStyleBySize[size]],
        selected ? styles.rowSelected : {},
        onPress ? styles.rowHoverable : {},
        noBorderBottom ? { borderBottomWidth: 0 } : {},
      ]}
    >
      {selectable && (
        <Box
          tag="data-table-selection-cell"
          style={[styles.selectionCell, styles[selectionCellStyleBySize[size]]]}
          onPress={event => event.stopPropagation()}
        >
          <CheckboxContainer
            id={`${rowKey}--checkbox`}
            variant="small"
            checked={selected}
            onCheckedChange={checked => onSelectedChange?.(checked === true)}
          >
            <CheckboxIndicator variant="small" />
          </CheckboxContainer>
        </Box>
      )}
      {columns.map(column => (
        <DataTableCell key={column.id} align={column.align} width={column.width} size={size}>
          {column.renderCell(row, rowIndex)}
        </DataTableCell>
      ))}
    </Box>
  );
};
