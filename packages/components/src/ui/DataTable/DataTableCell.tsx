import React from 'react';
import { Box } from '../../core';
import { useStyles } from './DataTable.styles';
import { DataTableAlign, DataTableSize } from './DataTable.types';

export type DataTableCellProps = {
  align?: DataTableAlign;
  width?: number;
  children: React.ReactNode;
  variant?: 'header' | 'body';
  size?: DataTableSize;
  onPress?: () => void;
};

export const DataTableCell = (props: DataTableCellProps) => {
  const { align = 'start', width, children, variant = 'body', size = 'sm', onPress } = props;
  const styles = useStyles();

  const paddingStyles = {
    header: { sm: styles.headerCellSm, md: styles.headerCellMd, lg: styles.headerCellLg },
    body: { sm: styles.cellSm, md: styles.cellMd, lg: styles.cellLg },
  }[variant][size];

  return (
    <Box
      tag={variant === 'header' ? 'data-table-header-cell' : 'data-table-cell'}
      onPress={onPress}
      hoverStyle={onPress ? { opacity: 0.8 } : undefined}
      style={[
        variant === 'header' ? styles.headerCell : styles.cell,
        paddingStyles,
        align === 'end' ? styles.cellAlignEnd : {},
        width !== undefined ? { width, flex: 'none' as const } : { flex: 1 },
        onPress ? { cursor: 'pointer' } : {},
      ]}
    >
      {children}
    </Box>
  );
};
