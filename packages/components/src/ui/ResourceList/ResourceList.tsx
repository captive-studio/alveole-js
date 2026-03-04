import { Box, Typography } from '@alveole/components';
import React from 'react';
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native';
import { Divider } from '../Divider';
import { useStyles } from './ResourceList.styles';

export type ResourceListProps<Item> = FlatListProps<Item> & {
  data: Item[];
  isLoading?: boolean;
  withPagination?: boolean;
  noBorder?: boolean;
  withWhiteBackground?: boolean;
  titre?: string;
  renderNoContent: () => React.ReactNode;
};

export const ResourceListDivider = () => (
  <Box pl="100" pr="100">
    <Divider />
  </Box>
);

export const ResourceList = <Item,>(props: ResourceListProps<Item>) => {
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
    return (
      <Box tag="resource-list-loader" style={styles.loader}>
        <ActivityIndicator size="large" style={{ margin: 'auto' }} />
      </Box>
    );
  }

  if (!data || data.length === 0) return renderNoContent();

  const paginationStyles = withPagination
    ? {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {};

  return (
    <Box tag="resource-list" style={styles.list}>
      {titre && (
        <Box tag="resource-list-entete" style={styles.entete}>
          <Typography style={styles.enteteTitle}>{titre}</Typography>
        </Box>
      )}
      <Box
        tag="resource-list-items"
        width="100%"
        style={{
          ...styles.items,
          ...paginationStyles,
          ...(noBorder ? styles.noBorder : styles.withBorder),
          ...(withWhiteBackground ? styles.itemsWithWhiteBackground : {}),
        }}
      >
        <FlatList data={data} contentContainerStyle={style} {...listProps} />
      </Box>
    </Box>
  );
};
