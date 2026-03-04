import { Box, BoxProps, IconProps, Image, LucideIcon, Typography } from '@alveole/components';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Avatar, AvatarProps } from '../Avatar';
import { useStyles } from './ListItem.styles';

export type ListItemProps = BoxProps & {
  title: string;
  description?: string;
  IconProps?: Pick<IconProps, 'color' | 'name'>;
  AvatarProps?: Pick<AvatarProps, 'fallbackText' | 'src'>;
  preview_url?: string;
  // trailing?: boolean;
  // trailingIcon?: LucideIconProps['name'];
  trailing?: () => React.ReactNode;
  loading?: boolean;
  showSeparateur?: boolean;
};

export const ListItem = (props: ListItemProps) => {
  const {
    children,
    title,
    description,
    style,
    AvatarProps,
    IconProps,
    preview_url,
    trailing,
    loading = false,
    showSeparateur = true,
    ...itemProps
  } = props;

  const styles = useStyles();

  return (
    <Box tag="resource-item" style={[styles.item, style]} hoverStyle={styles.itemHover} {...itemProps}>
      {preview_url ? (
        <Box style={styles.previewContainer}>
          <Image
            source={{ uri: preview_url }}
            width={styles.preview.width}
            height={styles.preview.height}
            contentFit="contain"
          />
        </Box>
      ) : (
        <>
          {IconProps && <LucideIcon size="sm" color={styles.defaultIcon.color} {...IconProps} />}
          {AvatarProps && <Avatar size="xs" {...AvatarProps} />}
        </>
      )}

      <Box style={styles.detail}>
        {showSeparateur && <Box style={styles.separateur}></Box>}
        <Box style={styles.principal}>
          <Typography style={styles.title}>{title}</Typography>
          {description && <Typography style={styles.description}>{description}</Typography>}
        </Box>

        {trailing && trailing()}
      </Box>

      {loading && (
        <Box style={styles.loading}>
          <ActivityIndicator size="small" color={styles.loading.color} />
        </Box>
      )}
    </Box>
  );
};
