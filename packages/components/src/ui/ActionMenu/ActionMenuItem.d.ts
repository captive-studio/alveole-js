import { BoxProps } from '../../core';
import { LucideIconProps } from '../LucideIcon';
export type ActionMenuItemProps = Omit<BoxProps, 'children'> & {
  title: string;
  icon?: LucideIconProps['name'];
  onPress?: () => void;
  selected?: boolean;
};
export declare const ActionMenuItem: (props: ActionMenuItemProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ActionMenuItem.d.ts.map
