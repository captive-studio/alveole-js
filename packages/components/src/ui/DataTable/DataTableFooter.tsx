import { makeStyles } from '@alveole/theme';
import React from 'react';
import { Box, Typography } from '../../core';

const useFooterStyles = makeStyles(({ color, text, spacing }) => ({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing('2W'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
    backgroundColor: color.light.background['default-grey'],
  },
  counter: {
    ...text['Corps de texte'].XS.Regular,
    color: color.light.text['mention-grey'],
  },
}));

export type DataTableFooterProps = {
  /** Ex : "21-40 sur 70" */
  counter?: React.ReactNode;
  children?: React.ReactNode;
};

export const DataTableFooter = (props: DataTableFooterProps) => {
  const { counter, children } = props;
  const styles = useFooterStyles();

  return (
    <Box tag="data-table-footer" style={styles.footer}>
      <Box>{typeof counter === 'string' ? <Typography style={styles.counter}>{counter}</Typography> : counter}</Box>
      <Box>{children}</Box>
    </Box>
  );
};
