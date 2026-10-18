import React from 'react';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Spinner } from '../Spinner';
import { useStyles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';
import { ListItemVisuel } from './ListItemVisuel';

export * from './ListItem.types';

type EvenementDePression = Parameters<NonNullable<BoxProps['onPress']>>[0];

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
    (event: EvenementDePression) => {
      if (RadioProps) RadioProps.onChange?.(RadioProps.value);
      onPress?.(event);
    },
    [RadioProps, onPress],
  );

  const styles = useStyles();
  const cliquable = onPress != null || RadioProps != null;

  return (
    <Box style={styles.container}>
      <Box
        tag="resource-item"
        style={[styles.item, cliquable && styles.itemPressable, style]}
        backgroundColor={cliquable ? { hover: styles.itemHover.backgroundColor } : undefined}
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
