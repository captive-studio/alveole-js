import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core';
import { Popover } from '../Popover';
import { ActionMenuItem } from './ActionMenuItem';
const ActionMenuBase = props => {
  const { children, placement = 'bottom', renderTrigger, open, setOpen, scrollable = true, ...boxProps } = props;
  return _jsx(Popover, {
    placement: placement,
    renderTrigger: renderTrigger,
    open: open,
    setOpen: setOpen,
    scrollable: scrollable,
    children: _jsx(Box, { tag: 'action-menu-content', ...boxProps, children: children }),
  });
};
export const ActionMenu = Object.assign(ActionMenuBase, {
  Item: ActionMenuItem,
});
