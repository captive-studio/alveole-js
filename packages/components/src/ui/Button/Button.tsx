import React, { CSSProperties } from 'react';
import { ActivityIndicator, Platform, Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';
import { Box, BoxProps, Typography } from '../../core';
import { IconProps, LucideIcon } from '../LucideIcon';
import { useStyles } from './Button.styles';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs n'est pas censé exister
  variant: 'primary' | 'secondary' | 'tertiary' | 'link'; // link n'est pas censé exister et il manque danger
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  ContainerProps?: BoxProps;
  fullWidth?: boolean;
  noPadding?: boolean;
  borderNone?: boolean;
  leftAlign?: boolean;
  type?: 'button' | 'submit';
  isLoading?: boolean;
};

export const Button = React.forwardRef<View, ButtonProps>(function Button(props, ref) {
  const {
    title,
    type,
    size,
    variant,
    disabled,
    startIcon,
    endIcon,
    noPadding,
    borderNone,
    leftAlign,
    isLoading,
    fullWidth = false,
    ContainerProps = {},
    ...buttonProps
  } = props;
  const { style, hoverStyle, ...containerProps } = ContainerProps;

  const styles = useStyles();

  const containerSize =
    size === 'sm'
      ? styles.smContainer
      : size === 'lg'
        ? styles.lgContainer
        : size === 'xs'
          ? styles.xsContainer
          : styles.mdContainer;
  const titleSize =
    size === 'sm' ? styles.smTitle : size === 'lg' ? styles.lgTitle : size === 'xs' ? styles.xsTitle : styles.mdTitle;

  const noPaddingStyle = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

  const buttonContainerStyle = () => {
    let applicableStyles = {
      ...styles.container,
      ...(startIcon
        ? size === 'sm'
          ? styles.smContainerStartIcon
          : size === 'lg'
            ? styles.lgContainerStartIcon
            : styles.mdContainerStartIcon
        : {}),
      ...(endIcon
        ? size === 'sm'
          ? styles.smContainerEndIcon
          : size === 'lg'
            ? styles.lgContainerEndIcon
            : styles.mdContainerEndIcon
        : {}),
    };
    if (variant === 'primary') {
      applicableStyles = { ...applicableStyles, ...styles.primaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.primaryContainerDisabled };
    } else if (variant === 'secondary') {
      applicableStyles = { ...applicableStyles, ...styles.secondaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.secondaryContainerDisabled };
    } else if (variant === 'tertiary') {
      applicableStyles = { ...applicableStyles, ...styles.tertiaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerDisabled };
    } else if (variant === 'link') {
      applicableStyles = { ...applicableStyles, ...styles.linkContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerDisabled };
    }
    return {
      ...applicableStyles,
      ...containerSize,
      ...(fullWidth ? { width: '100%' } : {}),
      ...(noPadding ? noPaddingStyle : {}),
      ...(borderNone ? { borderRadius: 0 } : {}),
      ...(leftAlign ? { justifyContent: 'left' } : {}),
    };
  };

  const buttonContainerHoverStyle = () => {
    if (disabled) return {};
    if (variant === 'primary') return styles.primaryContainerHover;
    else if (variant === 'secondary') return styles.secondaryContainerHover;
    else if (variant === 'tertiary') return styles.tertiaryContainerHover;
    else if (variant === 'link') return styles.linkContainerHover;
  };

  const textStyle = (state: { hovered: boolean }) => {
    let applicableStyles: CSSProperties = styles.title;

    if (variant === 'primary') {
      applicableStyles = { ...applicableStyles, ...styles.primaryTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.primaryTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.primaryTitleHover };
    } else if (variant === 'secondary') {
      applicableStyles = { ...applicableStyles, ...styles.secondaryTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.secondaryTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.secondaryTitleHover };
    } else if (variant === 'tertiary') {
      applicableStyles = { ...applicableStyles, ...styles.tertiaryTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.tertiaryTitleHover };
    } else if (variant === 'link') {
      applicableStyles = { ...applicableStyles, ...styles.linkTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.linkTitleHover };
    }

    return { ...applicableStyles, ...titleSize };
  };

  const iconStyle = (state: { hovered: boolean }): Omit<IconProps, 'name'> => {
    const iconSize = size === 'lg' ? 'md' : 'sm';

    if (variant === 'primary') {
      if (disabled) return { size: iconSize, color: styles.primaryIconDisabled.color };
      else if (state.hovered) return { size: iconSize, color: styles.primaryIconHover.color };
      return { size: iconSize, color: styles.primaryIcon.color };
    } else if (variant === 'secondary') {
      if (disabled) return { size: iconSize, color: styles.secondaryIconDisabled.color };
      else if (state.hovered) return { size: iconSize, color: styles.secondaryIconHover.color };
      return { size: iconSize, color: styles.secondaryIcon.color };
    } else if (variant === 'tertiary') {
      if (disabled) return { size: iconSize, color: styles.tertiaryIconDisabled.color };
      else if (state.hovered) return { size: iconSize, color: styles.tertiaryIconHover.color };
      return { size: iconSize, color: styles.tertiaryIcon.color };
    } else if (variant === 'link') {
      if (state.hovered) return { size: iconSize, color: styles.linkTitleHover.color };
      return { size: iconSize, color: styles.linkIcon.color };
    }
    return { size: iconSize };
  };

  // Fix la bordure sur iOS pour le bouton secondaire
  const pressableStyle =
    Platform.OS === 'ios' && variant === 'secondary'
      ? {
          borderWidth: 1,
          borderColor: styles.secondaryContainer.borderColor,
        }
      : {};

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      accessibilityRole="button"
      {...(type === 'submit' ? { 'aria-selected': true } : {})}
      {...(fullWidth ? { style: { width: '100%' } } : {})}
      {...buttonProps}
      style={[pressableStyle]}
    >
      {(state: CustomPressableState) => (
        <Box
          style={[buttonContainerStyle(), style]}
          hoverStyle={{ ...buttonContainerHoverStyle(), ...hoverStyle }}
          {...containerProps}
        >
          {startIcon && <LucideIcon name={startIcon} {...iconStyle({ hovered: !!state.hovered })} />}
          <Typography user-select={false} style={textStyle({ hovered: !!state.hovered })}>
            {title}
          </Typography>
          {isLoading ? (
            <ActivityIndicator size="small" style={styles.buttonLoader} />
          ) : (
            endIcon && <LucideIcon name={endIcon} {...iconStyle({ hovered: !!state.hovered })} />
          )}
        </Box>
      )}
    </Pressable>
  );
});
