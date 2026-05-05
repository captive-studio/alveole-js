import React from 'react';
import type { PageProps } from './Page';
export type PageContentScrollableHandle = {
  scrollToTop: () => void;
};
export type PageContentScrollableProps = PageProps & {
  onScrollToBottom?: () => void;
  onEndReachedThreshold?: number;
  onScrollChange?: (scrollY: number) => void;
};
export declare const PageContentScrollable: React.ForwardRefExoticComponent<
  Pick<import('tamagui').StackProps, 'pressStyle' | 'focusStyle' | 'disabledStyle' | 'exitStyle'> &
    import('@tamagui/core').RNTamaguiViewNonStyleProps &
    Pick<import('tamagui').StackProps, 'opacity' | 'display' | 'flex' | 'flexDirection' | 'flexWrap' | 'overflow'> & {
      justify?: import('tamagui').ViewProps['justifyContent'];
    } & import('..').BoxAdvancedStyle & {
      hoverStyle?: React.CSSProperties;
    } & {
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
      sideBarController?: import('../..').SidebarController;
      statusBar?: import('./Page').PageStatusBarProps;
      renderToolbar?: (options?: { isScrolled: boolean }) => React.ReactNode;
      onScrollToBottom?: () => void;
      onEndReachedThreshold?: number;
      onScrollChange?: (scrollY: number) => void;
    } & {
      onScrollToBottom?: () => void;
      onEndReachedThreshold?: number;
      onScrollChange?: (scrollY: number) => void;
    } & React.RefAttributes<PageContentScrollableHandle>
>;
//# sourceMappingURL=PageContentScrollable.d.ts.map
