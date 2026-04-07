import { BoxProps, Popover, PopoverProps } from '@alveole/components';
import { Box } from '../../core';
import { ActionMenuItem } from './ActionMenuItem';

export type { ActionMenuItemProps } from './ActionMenuItem';

export type ActionMenuProps = BoxProps & PopoverProps;

const ActionMenuBase = (props: ActionMenuProps) => {
  const { children, placement = 'bottom', renderTrigger, ...boxProps } = props;

  return (
    <Popover placement={placement} renderTrigger={renderTrigger}>
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
