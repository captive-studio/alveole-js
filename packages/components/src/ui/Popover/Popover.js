import { useTheme } from '@alveole/theme';
import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { ScrollView, Popover as TamaguiPopover, YStack } from 'tamagui';
import { useStyles } from './Popover.styles';
export const Popover = props => {
  const {
    children,
    placement,
    renderTrigger,
    scrollable = true,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    ...popoverStyles
  } = props;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    nextOpen => {
      controlledSetOpen?.(nextOpen);
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
    },
    [controlledSetOpen, isControlled],
  );
  const styles = useStyles();
  const { spacing } = useTheme();
  const spacings = {
    p: 0,
    mr: placement?.includes('left') ? spacing('025') : undefined,
    mb: placement?.includes('top') ? spacing('025') : undefined,
    ml: placement?.includes('right') ? spacing('025') : undefined,
    mt: placement?.includes('bottom') ? spacing('025') : undefined,
  };
  const maxH = popoverStyles.maxH ?? 500;
  const maxW = popoverStyles.maxW ?? '100%';
  return _jsxs(TamaguiPopover, {
    placement: placement,
    disableFocus: true,
    open: open,
    onOpenChange: setOpen,
    children: [
      _jsx(TamaguiPopover.Trigger, { asChild: true, children: renderTrigger({ open }) }),
      _jsx(TamaguiPopover.Content, {
        trapFocus: false,
        disableFocusScope: true,
        ...spacings,
        // {...styles.tamaguiPopoverContent}
        style: [{ maxHeight: scrollable ? maxH : undefined, maxWidth: scrollable ? maxW : undefined }, styles.content],
        children: scrollable
          ? _jsx(YStack, {
              style: { overflow: 'hidden' },
              children: _jsx(ScrollView, { style: { maxHeight: maxH - spacing('025') }, children: children }),
            })
          : children,
      }),
    ],
  });
};
