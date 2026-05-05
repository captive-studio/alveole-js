import { BoxProps } from '@alveole/components';
import { PopoverProps } from '../Popover';
import { ActionMenuItem } from './ActionMenuItem';
export type { ActionMenuItemProps } from './ActionMenuItem';
export type ActionMenuProps = BoxProps &
  PopoverProps & {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    scrollable?: boolean;
  };
declare const ActionMenuBase: (props: ActionMenuProps) => import('react/jsx-runtime').JSX.Element;
type ActionMenuCompoundComponent = typeof ActionMenuBase & {
  Item: typeof ActionMenuItem;
};
export declare const ActionMenu: ActionMenuCompoundComponent;
//# sourceMappingURL=ActionMenu.d.ts.map
