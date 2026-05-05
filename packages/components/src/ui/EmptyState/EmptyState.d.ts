import React from 'react';
import { BoxProps } from '../../core/Box/Box';
import { LucideIconProps } from '../LucideIcon';
export type EmptyStateProps = BoxProps & {
  iconName?: LucideIconProps['name'];
  title?: string;
  description?: string;
  /**
   * @deprecated Utilisez `description` à la place.
   */
  text?: string;
  illustration?: React.ReactNode;
  actions?: React.ReactNode;
};
export declare const EmptyState: (props: EmptyStateProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map
