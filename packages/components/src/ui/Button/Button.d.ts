import React from 'react';
import { PressableProps, View } from 'react-native';
import { BoxProps } from '../../core';
import { IconProps } from '../LucideIcon';
export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
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
export declare const Button: React.ForwardRefExoticComponent<
  Omit<PressableProps, 'style' | 'children'> & {
    title: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
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
  } & React.RefAttributes<View>
>;
//# sourceMappingURL=Button.d.ts.map
