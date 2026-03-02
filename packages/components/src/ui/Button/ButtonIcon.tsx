import { CSSProperties } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native';
import { Typography } from '../../core';
import { IconProps, LucideIcon } from '../LucideIcon';
import { useStyles } from './Button.styles';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonIconProps = Omit<PressableProps, 'children' | 'style'> & {
  size?: 'sm' | 'md' | 'lg';
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary' | 'tertiary';
} & {
  // Styles props
  style?: {
    width?: number | string;
    height?: number | string;
    borderTop?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    backgroundColor?: string;
  };
} & { icon: IconProps['name'] | number };

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size, variant, disabled, style, ...buttonProps } = props;
  let { iconSize } = props;

  const styles = useStyles();

  const containerSize =
    size === 'sm'
      ? styles.smContainerIconOnly
      : size === 'lg'
        ? styles.lgContainerIconOnly
        : styles.mdContainerIconOnly;

  const containerStyle: PressableProps['style'] = (state: CustomPressableState) => {
    let applicableStyles: any = styles.container;

    if (variant === 'primary') {
      applicableStyles = { ...applicableStyles, ...styles.primaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.primaryContainerDisabled };
      else if (!!state.hovered) applicableStyles = { ...applicableStyles, ...styles.primaryContainerHover };
    } else if (variant === 'secondary') {
      applicableStyles = { ...applicableStyles, ...styles.secondaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.secondaryContainerDisabled };
      else if (!!state.hovered) applicableStyles = { ...applicableStyles, ...styles.secondaryContainerHover };
    } else if (variant === 'tertiary') {
      applicableStyles = { ...applicableStyles, ...styles.tertiaryContainer };
      if (disabled) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerDisabled };
      else if (!!state.hovered) applicableStyles = { ...applicableStyles, ...styles.tertiaryContainerHover };
    }

    return { ...applicableStyles, ...containerSize, ...(style ?? {}) };
  };

  const iconStyle = (state: { hovered: boolean }): Omit<IconProps, 'name'> => {
    if (!iconSize) {
      iconSize = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';
    }

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
    }
    return { size: iconSize };
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

    return { ...applicableStyles, minWidth: 16 };
  };

  return (
    <Pressable style={containerStyle} disabled={disabled} {...buttonProps}>
      {(state: CustomPressableState) =>
        typeof props.icon === 'number' ? (
          <Typography style={{ ...textStyle({ hovered: !!state.hovered }) }}>{props.icon}</Typography>
        ) : (
          <LucideIcon name={props.icon} {...iconStyle({ hovered: !!state.hovered })} />
        )
      }
    </Pressable>
  );
};
