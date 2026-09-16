import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Spinner } from '../Spinner';
import { useStyles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';
import { ListItemVisuel } from './ListItemVisuel';

export * from './ListItem.types';

export const ListItem = (props: ListItemProps) => {
  const {
    children,
    title,
    description,
    style,
    AvatarProps,
    IconProps,
    RadioProps,
    preview_url,
    trailing,
    loading = false,
    showSeparateur = true,
    onPress,
    ...itemProps
  } = props;

  // Presser la ligne vaut choix : c'est toute la ligne qui est la cible, pas le seul controle.
  const handlePress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (RadioProps) RadioProps.onChange?.(RadioProps.value);
      onPress?.(event);
    },
    [RadioProps, onPress],
  );

  const styles = useStyles();

  return (
    <Box>
      <Box
        tag="resource-item"
        style={[styles.item, style]}
        hoverStyle={onPress || RadioProps ? styles.itemHover : {}}
        onPress={handlePress}
        {...itemProps}
      >
        <ListItemVisuel
          title={title}
          preview_url={preview_url}
          RadioProps={RadioProps}
          IconProps={IconProps}
          AvatarProps={AvatarProps}
        />

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
            <Spinner size="sm" />
          </Box>
        )}
      </Box>

      {children}
    </Box>
  );
};
