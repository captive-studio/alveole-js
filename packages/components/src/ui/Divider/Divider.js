import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core';
import { useStyles } from './Divider.styles';
export const Divider = props => {
  const styles = useStyles();
  return _jsx(Box, { tag: 'divider', style: styles.divider, ...props });
};
