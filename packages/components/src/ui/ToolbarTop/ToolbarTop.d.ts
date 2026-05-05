import React from 'react';
import { BoxProps } from '../../core';
import { AvatarProps } from '../Avatar';
import { IconProps } from '../LucideIcon';
export type ToolbarTopProps = BoxProps & {
  variant?: 'default' | 'large' | 'compactLarge';
  title: string;
  AvatarProps?: Omit<AvatarProps, 'size'>;
  withBorder?: boolean;
  onNavigate?: () => void;
  navigationIcon?: IconProps['name'];
  sousTitre?: string;
  onActions?: () => void;
  actionsIcon?: IconProps['name'];
  actions?: React.ReactNode;
  typographyStyle?: React.CSSProperties;
};
export declare const ToolbarTop: (props: ToolbarTopProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ToolbarTop.d.ts.map
