import React from 'react';
import { PopoverProps as TamaguiPopoverProps } from 'tamagui';
export type PopoverStyles = {
  maxW?: number;
  maxH?: number;
};
export type PopoverProps = PopoverStyles &
  React.PropsWithChildren<{
    placement: TamaguiPopoverProps['placement'];
    renderTrigger: (context: { open: boolean }) => React.ReactNode;
    scrollable?: boolean;
    open?: boolean;
    setOpen?: (open: boolean) => void;
  }>;
export declare const Popover: (props: PopoverProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Popover.d.ts.map
