import { DataTableColumn, DataTableSize } from './DataTable.types';
import { DataTableRow } from './DataTableRow';

export type DataTableRowsProps<Row> = {
  data: Row[];
  rowKeys: string[];
  columns: DataTableColumn<Row>[];
  selectable: boolean;
  selectedKeys: string[];
  size: DataTableSize;
  hasFooter: boolean;
  onRowSelectedChange: (rowKey: string, checked: boolean) => void;
  onRowPress?: (row: Row, index: number) => void;
};

export const DataTableRows = <Row,>(props: DataTableRowsProps<Row>) => {
  const { data, rowKeys, columns, selectable, selectedKeys, size, hasFooter, onRowSelectedChange, onRowPress } = props;

  return (
    <>
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
            noBorderBottom={!hasFooter && index === data.length - 1}
            onSelectedChange={checked => onRowSelectedChange(rowKey, checked)}
            onPress={onRowPress ? () => onRowPress(row, index) : undefined}
          />
        );
      })}
    </>
  );
};
