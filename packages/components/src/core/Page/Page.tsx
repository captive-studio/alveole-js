import React from 'react';
import { BoxProps } from '../../core';
import { SidebarController } from '../../ui/Sidebar';
import { PageContent } from './PageContent';
import { PageHead } from './PageHead';

export type PageProps = BoxProps & {
  title: string;
  description?: string;
  defaultBackgroundColor?: string;
  og?: { title?: string; description?: string };
  scrollable?: boolean | 'mobile-only' | 'desktop-only';
  sidebar?: React.ReactNode;
  beforeContent?: React.ReactNode;
  sideBarController?: SidebarController;

  renderToolbar?: (options?: { isScrolled: boolean }) => React.ReactNode;

  onScrollToBottom?: () => void;
  onEndReachedThreshold?: number;
  onScrollChange?: (scrollY: number) => void;
};

export const Page = (props: PageProps) => {
  return (
    <React.Fragment>
      <PageHead {...props} />
      <PageContent {...props} />
    </React.Fragment>
  );
};
