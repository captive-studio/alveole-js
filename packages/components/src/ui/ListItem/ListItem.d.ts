import React from 'react';
import { BoxProps } from '../../core';
import { AvatarProps } from '../Avatar';
import { IconProps } from '../LucideIcon';
export type ListItemProps = BoxProps & {
  title: string;
  description?: string;
  IconProps?: Pick<IconProps, 'color' | 'name'>;
  AvatarProps?: Pick<AvatarProps, 'fallbackText' | 'src'>;
  preview_url?: string;
  trailing?: () => React.ReactNode;
  loading?: boolean;
  showSeparateur?: boolean;
};
export declare const ListItem: (props: ListItemProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ListItem.d.ts.map
