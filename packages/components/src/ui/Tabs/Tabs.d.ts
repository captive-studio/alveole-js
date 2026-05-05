import { BoxProps, LucideIconProps } from '@alveole/components';
import React from 'react';
export type TabsProps = Omit<BoxProps, 'children'> & {
  tabs: {
    label: string;
    icon?: LucideIconProps['name'];
    counter?: number;
    value: string;
    content: React.ReactNode;
    scrollable?: boolean;
    renderAction?: () => React.ReactNode;
  }[];
  defaultValue?: string;
  onChange?: (index: number) => void;
};
export declare const Tabs: (props: TabsProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Tabs.d.ts.map
