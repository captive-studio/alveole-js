import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { useStyles } from './ResourceList.styles';
export const ResourceList = props => {
  const {
    style,
    data,
    isLoading,
    withPagination,
    renderNoContent,
    noBorder = false,
    withWhiteBackground = false,
    titre,
    ...listProps
  } = props;
  const styles = useStyles();
  if (isLoading) {
    return _jsx(Box, {
      tag: 'resource-list-loader',
      style: styles.loader,
      children: _jsx(ActivityIndicator, { size: 'large', style: { margin: 'auto' } }),
    });
  }
  if (!data || data.length === 0) return renderNoContent();
  const paginationStyles = withPagination
    ? {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {};
  return _jsxs(Box, {
    tag: 'resource-list',
    style: styles.list,
    children: [
      titre &&
        _jsx(Box, {
          tag: 'resource-list-entete',
          style: styles.entete,
          children: _jsx(Typography, { style: styles.enteteTitle, children: titre }),
        }),
      _jsx(Box, {
        tag: 'resource-list-items',
        width: '100%',
        style: {
          ...styles.items,
          ...paginationStyles,
          ...(noBorder ? styles.noBorder : styles.withBorder),
          ...(withWhiteBackground ? styles.itemsWithWhiteBackground : {}),
        },
        children: _jsx(FlashList, { data: data, contentContainerStyle: style, ...listProps }),
      }),
    ],
  });
};
