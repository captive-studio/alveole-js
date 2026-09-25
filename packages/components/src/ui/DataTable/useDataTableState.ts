import React from 'react';
import { DataTableColumn, DataTableSort } from './DataTable.types';
import { clesApresBasculeLigne, clesApresBasculeTout, etatSelectionDataTable } from './selectionDataTable';
import { triApresClicEntete } from './triApresClicEntete';
import { useControlledState } from './useControlledState';

type UseDataTableStateParams<Row> = {
  data: Row[];
  keyExtractor: (row: Row, index: number) => string;
  selectable: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
};

/** Regroupe l'état de sélection et de tri de `DataTable` : la vue n'a plus qu'à le consommer. */
export const useDataTableState = <Row>(params: UseDataTableStateParams<Row>) => {
  const {
    data,
    keyExtractor,
    selectable,
    selectedKeys: controlledSelectedKeys,
    onSelectionChange,
    sort: controlledSort,
    onSortChange,
  } = params;

  const [selectedKeys, setSelectedKeys] = useControlledState<string[]>(controlledSelectedKeys, [], onSelectionChange);
  const [sort, setSort] = useControlledState<DataTableSort | null>(controlledSort, null, onSortChange);

  const rowKeys = React.useMemo(() => data.map((row, index) => keyExtractor(row, index)), [data, keyExtractor]);
  const { allSelected, someSelected } = etatSelectionDataTable(rowKeys, selectedKeys, selectable);

  const toggleAll = () => setSelectedKeys(clesApresBasculeTout(rowKeys, allSelected));
  const toggleRow = (rowKey: string, checked: boolean) =>
    setSelectedKeys(clesApresBasculeLigne(selectedKeys, rowKey, checked));
  const handleHeaderPress = (column: DataTableColumn<Row>) => setSort(triApresClicEntete(sort, column.id));

  return { rowKeys, selectedKeys, sort, allSelected, someSelected, toggleAll, toggleRow, handleHeaderPress };
};
