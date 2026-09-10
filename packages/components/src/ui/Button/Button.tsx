import React, { CSSProperties } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';
import { Box, BoxProps, Typography } from '../../core';
import { IconProps, LucideIcon } from '../LucideIcon';
import { Spinner } from '../Spinner';
import { useStyles } from './Button.styles';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Sans `title`, le bouton passe en mode icône seule (nécessite `startIcon` ou `endIcon`). */
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs n'est pas censé exister
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link'; // link n'est pas censé exister
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  selected?: boolean;
  ContainerProps?: BoxProps;
  fullWidth?: boolean;
  noPadding?: boolean;
  borderNone?: boolean;
  leftAlign?: boolean;
  type?: 'button' | 'submit';
  active?: boolean;
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
    selected,
    fullWidth = false,
    ContainerProps = {},
    active = false,
    ...buttonProps
  } = props;
  const { style, hoverStyle, ...containerProps } = ContainerProps;

  const styles = useStyles();

  const isIconOnly = !title;

  const containerSize = isIconOnly
    ? size === 'sm'
      ? styles.smContainerIconOnly
      : size === 'lg'
        ? styles.lgContainerIconOnly
        : size === 'xs'
          ? styles.xsContainerIconOnly
          : styles.mdContainerIconOnly
    : size === 'sm'
      ? styles.smContainer
      : size === 'lg'
        ? styles.lgContainer
        : size === 'xs'
          ? styles.xsContainer
          : styles.mdContainer;
  const titleSize =
    size === 'sm' ? styles.smTitle : size === 'lg' ? styles.lgTitle : size === 'xs' ? styles.xsTitle : styles.mdTitle;

  const noPaddingStyle = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

  const buttonContainerStyle = (state?: { pressed?: boolean }) => {
    let applicableStyles = {
      ...styles.container,
      ...(startIcon && !isIconOnly
        ? size === 'sm'
          ? styles.smContainerStartIcon
          : size === 'lg'
            ? styles.lgContainerStartIcon
            : styles.mdContainerStartIcon
        : {}),
      ...(endIcon && !isIconOnly
        ? size === 'sm'
          ? styles.smContainerEndIcon
          : size === 'lg'
            ? styles.lgContainerEndIcon
            : styles.mdContainerEndIcon
        : {}),
    };
    if (selected) {
      applicableStyles = { ...applicableStyles, ...styles.selectedContainer };
    } else if (variant === 'primary') {
      applicableStyles = { ...applicableStyles, ...styles.primaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.primaryContainerDisabled };
      else if (state?.pressed || active) applicableStyles = { ...applicableStyles, ...styles.primaryContainerPressed };
    } else if (variant === 'secondary') {
      applicableStyles = { ...applicableStyles, ...styles.secondaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.secondaryContainerDisabled };
      else if (state?.pressed || active)
        applicableStyles = { ...applicableStyles, ...styles.secondaryContainerPressed };
    } else if (variant === 'tertiary') {
      applicableStyles = { ...applicableStyles, ...styles.tertiaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerDisabled };
      else if (state?.pressed || active) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerPressed };
    } else if (variant === 'danger') {
      applicableStyles = { ...applicableStyles, ...styles.dangerContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.dangerContainerDisabled };
      else if (state?.pressed || active) applicableStyles = { ...applicableStyles, ...styles.dangerContainerPressed };
    } else if (variant === 'link') {
      applicableStyles = { ...applicableStyles, ...styles.linkContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerDisabled };
      else if (state?.pressed || active) applicableStyles = { ...applicableStyles, ...styles.linkContainerPressed };
    }
    return {
      ...applicableStyles,
      ...containerSize,
      ...(noPadding ? noPaddingStyle : {}),
      ...(leftAlign ? { justifyContent: 'left' } : {}),
      borderWidth: 0,
      borderColor: undefined,
      borderStyle: undefined,
      ...(borderNone
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {}),
    };
  };

  const buttonContainerHoverStyle = () => {
    if (disabled) return {};
    if (selected) return styles.selectedContainerHover;
    else if (variant === 'primary') return styles.primaryContainerHover;
    else if (variant === 'secondary') return styles.secondaryContainerHover;
    else if (variant === 'tertiary') return styles.tertiaryContainerHover;
    else if (variant === 'danger') return styles.dangerContainerHover;
    else if (variant === 'link') return styles.linkContainerHover;
  };

  const textStyle = (state: { hovered: boolean; pressed: boolean }) => {
    let applicableStyles: CSSProperties = styles.title;

    if (selected) {
      applicableStyles = { ...applicableStyles, ...styles.selectedTitle };
    } else if (variant === 'primary') {
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
    } else if (variant === 'danger') {
      applicableStyles = { ...applicableStyles, ...styles.dangerTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.dangerTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.dangerTitleHover };
      else if (state.pressed) applicableStyles = { ...applicableStyles, ...styles.dangerTitlePressed };
    } else if (variant === 'link') {
      applicableStyles = { ...applicableStyles, ...styles.linkTitle };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryTitleDisabled };
      else if (state.hovered) applicableStyles = { ...applicableStyles, ...styles.linkTitleHover };
    }

    return { ...applicableStyles, ...titleSize };
  };

  const iconStyle = (state: { hovered: boolean }): Omit<IconProps, 'name'> => {
    const iconSize = size === 'lg' ? 'md' : 'sm';

    if (selected) {
      return { size: iconSize, color: styles.selectedIcon.color };
    } else if (variant === 'primary') {
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
    } else if (variant === 'danger') {
      if (disabled) return { size: iconSize, color: styles.dangerIconDisabled.color };
      else if (state.hovered) return { size: iconSize, color: styles.dangerIconHover.color };
      return { size: iconSize, color: styles.dangerIcon.color };
    } else if (variant === 'link') {
      if (disabled) return { size: iconSize, color: styles.linkIconDisabled.color };
      else if (state.hovered) return { size: iconSize, color: styles.linkTitleHover.color };
      return { size: iconSize, color: styles.linkIcon.color };
    }
    return { size: iconSize };
  };

  const getPressableStyle = (state: CustomPressableState) => {
    const sizeRadii =
      size === 'xs' || size === 'sm'
        ? {
            borderTopLeftRadius: styles.xsContainer.borderTopLeftRadius,
            borderBottomLeftRadius: styles.xsContainer.borderBottomLeftRadius,
            borderTopRightRadius: styles.xsContainer.borderTopRightRadius,
            borderBottomRightRadius: styles.xsContainer.borderBottomRightRadius,
          }
        : {
            borderTopLeftRadius: styles.container.borderTopLeftRadius,
            borderBottomLeftRadius: styles.container.borderBottomLeftRadius,
            borderTopRightRadius: styles.container.borderTopRightRadius,
            borderBottomRightRadius: styles.container.borderBottomRightRadius,
          };

    const radiusStyle = borderNone
      ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }
      : sizeRadii;

    let borderProps: any = {};
    if (selected) {
      borderProps = { borderWidth: 1, borderStyle: 'solid', borderColor: styles.selectedContainer.borderColor };
    } else if (variant === 'secondary') {
      const borderColor = disabled
        ? styles.secondaryContainerDisabled.borderColor
        : state.hovered
          ? styles.secondaryContainerHover.borderColor
          : styles.secondaryContainer.borderColor;
      borderProps = { borderWidth: 1, borderStyle: 'solid', borderColor };
    } else if (variant === 'danger') {
      const borderColor = disabled
        ? styles.dangerContainerDisabled.borderColor
        : state.hovered
          ? styles.dangerContainerHover.borderColor
          : styles.dangerContainer.borderColor;
      borderProps = { borderWidth: 1, borderStyle: 'solid', borderColor };
    }

    return {
      ...radiusStyle,
      ...borderProps,
      overflow: 'hidden',
      ...(fullWidth ? { width: '100%' } : {}),
    };
  };

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      accessibilityRole="button"
      {...(type === 'submit' ? { 'aria-selected': true } : {})}
      {...buttonProps}
      style={(state: CustomPressableState) => getPressableStyle(state)}
    >
      {(state: CustomPressableState) => (
        <Box
          style={[buttonContainerStyle({ pressed: state.pressed }), style]}
          hoverStyle={{ ...buttonContainerHoverStyle(), ...hoverStyle }}
          {...containerProps}
        >
          {startIcon && <LucideIcon name={startIcon} {...iconStyle({ hovered: !!state.hovered })} />}
          {!isIconOnly && (
            <Typography user-select="false" style={textStyle({ hovered: !!state.hovered, pressed: !!state.pressed })}>
              {title}
            </Typography>
          )}
          {isLoading ? (
            <Spinner size="sm" delay="long" style={styles.buttonLoader} />
          ) : (
            endIcon && <LucideIcon name={endIcon} {...iconStyle({ hovered: !!state.hovered })} />
          )}
        </Box>
      )}
    </Pressable>
  );
});
