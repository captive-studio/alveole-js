import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core';
import { useStyles } from './CardActions.styles';
export const CardActions = props => {
  const { style, children, ...boxProps } = props;
  const styles = useStyles();
  return _jsx(Box, { tag: 'card-actions', style: [styles.cardActions, style], ...boxProps, children: children });
};
