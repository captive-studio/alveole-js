import type React from 'react';
import type { StatusBarStyle } from 'react-native';
import type { SidebarController } from '../../ui/Sidebar';
import type { BoxProps } from '../Box';

export type PageStatusBarProps = {
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
};

export type MetaTagProps = React.ComponentPropsWithoutRef<'meta'>;

export type PageProps = BoxProps & {
  title: string;
  description?: string;
  defaultBackgroundColor?: string;
  og?: { title?: string; description?: string };
  meta?: MetaTagProps[];
  scrollable?: boolean | 'mobile-only' | 'desktop-only';
  sidebar?: React.ReactNode;
  beforeContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  sideBarController?: SidebarController;
  statusBar?: PageStatusBarProps;

  renderToolbar?: (options?: { isScrolled: boolean }) => React.ReactNode;

  onScrollToBottom?: () => void;
  onEndReachedThreshold?: number;
  onScrollChange?: (scrollY: number) => void;
};
