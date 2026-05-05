import React from 'react';
import type { StatusBarStyle } from 'react-native';
import { BoxProps } from '../../core';
import { SidebarController } from '../../ui/Sidebar';
export type PageStatusBarProps = {
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
};
export type PageProps = BoxProps & {
  title: string;
  description?: string;
  defaultBackgroundColor?: string;
  og?: {
    title?: string;
    description?: string;
  };
  scrollable?: boolean | 'mobile-only' | 'desktop-only';
  sidebar?: React.ReactNode;
  beforeContent?: React.ReactNode;
  sideBarController?: SidebarController;
  statusBar?: PageStatusBarProps;
  renderToolbar?: (options?: { isScrolled: boolean }) => React.ReactNode;
  onScrollToBottom?: () => void;
  onEndReachedThreshold?: number;
  onScrollChange?: (scrollY: number) => void;
};
export declare const Page: (props: PageProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Page.d.ts.map
