import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './PageHeader.styles';
/**
 * En-tête de page : fil d'Ariane, puis une ligne avec le titre à gauche et des actions à droite.
 */
export const PageHeader = props => {
  const { title, actions, breadcrumbsProps } = props;
  const styles = useStyles();
  return _jsxs(Box, {
    style: styles.container,
    children: [
      _jsx(Breadcrumbs, { ...breadcrumbsProps }),
      _jsxs(Box, {
        style: styles.row,
        children: [
          _jsx(Typography, { style: styles.title, children: title }),
          actions && _jsx(Box, { style: styles.actions, children: actions }),
        ],
      }),
    ],
  });
};
