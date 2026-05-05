import { AProps } from '../../core';
import { LucideIconProps } from '../LucideIcon';
export type SidebarItemNavigable = {
  pressable?: undefined;
  title: string;
  icon?: LucideIconProps['name'];
  href: AProps['href'];
  direction?: AProps['direction'];
  routeName: string;
};
export type SidebarItemPressable = {
  pressable: true;
  title: string;
  icon?: LucideIconProps['name'];
  onPress: () => void;
};
export type SidebarItemProps = SidebarItemNavigable | SidebarItemPressable;
export declare const SidebarItem: (props: SidebarItemProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=SidebarItem.d.ts.map
