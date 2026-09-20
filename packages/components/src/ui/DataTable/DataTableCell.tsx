import React from 'react';
import { Box } from '../../core/Box';
import { useStyles } from './DataTable.styles';
import { DataTableAlign, DataTableSize } from './DataTable.types';
import { dataTableCellStyle } from './dataTableCellStyle';

export type DataTableCellProps = {
  align?: DataTableAlign;
  width?: number;
  children: React.ReactNode;
  variant?: 'header' | 'body';
  size?: DataTableSize;
  onPress?: () => void;
  noPadding?: boolean;
};

export const DataTableCell = (props: DataTableCellProps) => {
  const { align = 'start', width, children, variant = 'body', size = 'sm', onPress, noPadding = false } = props;
  const styles = useStyles();

  const aspect = dataTableCellStyle(styles, { variant, size, align, width, noPadding, pressable: onPress != null });

  return (
    <Box tag={aspect.tag} onPress={onPress} hoverStyle={aspect.hover} style={aspect.style}>
      {children}
    </Box>
  );
};
