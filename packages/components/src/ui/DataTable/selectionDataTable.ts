/** Dérive les indicateurs de la case "tout sélectionner" à partir des lignes et clés sélectionnées. */
export const etatSelectionDataTable = (
  rowKeys: string[],
  selectedKeys: string[],
  selectable: boolean,
): { allSelected: boolean; someSelected: boolean } => {
  const allSelected = selectable && rowKeys.length > 0 && rowKeys.every(key => selectedKeys.includes(key));
  const someSelected = selectable && !allSelected && rowKeys.some(key => selectedKeys.includes(key));
  return { allSelected, someSelected };
};

export const clesApresBasculeTout = (rowKeys: string[], allSelected: boolean): string[] => {
  return allSelected ? [] : rowKeys;
};

export const clesApresBasculeLigne = (selectedKeys: string[], rowKey: string, checked: boolean): string[] => {
  return checked ? [...selectedKeys, rowKey] : selectedKeys.filter(key => key !== rowKey);
};
