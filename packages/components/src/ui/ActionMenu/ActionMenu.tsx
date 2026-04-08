import { BoxProps } from '@alveole/components';
import { Box } from '../../core';
import { Popover, PopoverProps } from '../Popover';
import { ActionMenuItem } from './ActionMenuItem';

export type { ActionMenuItemProps } from './ActionMenuItem';

export type ActionMenuProps = BoxProps &
  PopoverProps & {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    scrollable?: boolean;
  };

const ActionMenuBase = (props: ActionMenuProps) => {
  const { children, placement = 'bottom', renderTrigger, open, setOpen, scrollable = true, ...boxProps } = props;

  return (
    <Popover placement={placement} renderTrigger={renderTrigger} open={open} setOpen={setOpen} scrollable={scrollable}>
      <Box tag="action-menu-content" {...boxProps}>
        {children}
      </Box>
    </Popover>
  );
};

type ActionMenuCompoundComponent = typeof ActionMenuBase & {
  Item: typeof ActionMenuItem;
};

export const ActionMenu: ActionMenuCompoundComponent = Object.assign(ActionMenuBase, {
  Item: ActionMenuItem,
});
