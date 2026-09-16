import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Image } from '../../core/Image';
import { Typography } from '../../core/Typography';
import { Avatar, AvatarProps } from '../Avatar';
import { CheckboxContainer, CheckboxIndicator } from '../Checkbox';
import { IconProps, LucideIcon } from '../LucideIcon';
import { RadioGroup, RadioInputProps } from '../RadioGroup';
import { Spinner } from '../Spinner';
import { useStyles } from './ListItem.styles';

export type ListItemProps = BoxProps & {
  title: string;
  description?: string;
  IconProps?: Pick<IconProps, 'color' | 'name'>;
  AvatarProps?: Pick<AvatarProps, 'fallbackText' | 'src'>;
  RadioProps?: Pick<RadioInputProps, 'checked' | 'onChange' | 'value'> & { multiple?: boolean };
  preview_url?: string;
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
    RadioProps,
    preview_url,
    trailing,
    loading = false,
    showSeparateur = true,
    onPress,
    ...itemProps
  } = props;

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
        {preview_url ? (
          <Box style={styles.previewContainer}>
            {/* Alternative vide et non absente : l'aperçu est décoratif, le titre et la
                description portent déjà l'information. Sans attribut `alt`, axe compte une
                violation `image-alt`. */}
            <Image
              alt=""
              source={{ uri: preview_url }}
              width={styles.preview.width}
              height={styles.preview.height}
              contentFit="contain"
            />
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" gap={'3V'}>
            {RadioProps && RadioProps.multiple !== true && (
              <Box
                mt={'auto'}
                mb={'auto'}
                onPress={event => {
                  event.stopPropagation();
                }}
              >
                <RadioGroup.Input id={`${title}--radio`} label={title} size="md" {...RadioProps} />
              </Box>
            )}
            {RadioProps && RadioProps.multiple === true && (
              <Box
                mt={'auto'}
                mb={'auto'}
                onPress={event => {
                  event.stopPropagation();
                }}
              >
                <CheckboxContainer
                  id={`${title}--checkbox`}
                  aria-label={title}
                  checked={RadioProps.checked}
                  onCheckedChange={() => RadioProps.onChange?.(RadioProps.value)}
                >
                  <CheckboxIndicator />
                </CheckboxContainer>
              </Box>
            )}
            {IconProps && (
              <Box mt={'auto'} mb={'auto'}>
                <LucideIcon size="sm" color={styles.defaultIcon.color} {...IconProps} />
              </Box>
            )}
            {AvatarProps && (
              <Box mt={'auto'} mb={'auto'}>
                <Avatar size="xs" {...AvatarProps} />
              </Box>
            )}
          </Box>
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
            <Spinner size="sm" />
          </Box>
        )}
      </Box>

      {children}
    </Box>
  );
};
