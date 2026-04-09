import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScrollView, Popover as TamaguiPopover, PopoverProps as TamaguiPopoverProps, YStack } from 'tamagui';
import { useStyles } from './Popover.styles';

export type PopoverStyles = { maxW?: number; maxH?: number };
export type PopoverProps = PopoverStyles &
  React.PropsWithChildren<{
    placement: TamaguiPopoverProps['placement'];
    renderTrigger: (context: { open: boolean }) => React.ReactNode;
    scrollable?: boolean;
    open?: boolean;
    setOpen?: (open: boolean) => void;
  }>;

export const Popover = (props: PopoverProps) => {
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
    (nextOpen: boolean) => {
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

  return (
    <TamaguiPopover placement={placement} disableFocus open={open} onOpenChange={setOpen}>
      <TamaguiPopover.Trigger asChild>{renderTrigger({ open })}</TamaguiPopover.Trigger>

      <TamaguiPopover.Content
        trapFocus={false}
        disableFocusScope
        {...spacings}
        // {...styles.tamaguiPopoverContent}
        style={[{ maxHeight: scrollable ? maxH : undefined, maxWidth: scrollable ? maxW : undefined }, styles.content]}
      >
        {scrollable ? (
          <YStack style={{ overflow: 'hidden' }}>
            <ScrollView style={{ maxHeight: maxH - spacing('025') }}>{children}</ScrollView>
          </YStack>
        ) : (
          children
        )}
      </TamaguiPopover.Content>
    </TamaguiPopover>
  );
};
