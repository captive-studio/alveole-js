import { Box } from '../../core/Box';
import type { PageProps } from './Page';

export type PageContentDefaultProps = PageProps;

export const PageContentDefault = (props: PageContentDefaultProps) => {
  const {
    beforeContent,
    children,
    title,
    description,
    og,
    scrollable: _scrollable,
    sidebar: _sidebar,
    sideBarController: _sideBarController,
    onScrollToBottom: _onScrollToBottom,
    onEndReachedThreshold: _onEndReachedThreshold,
    ...pageProps
  } = props;

  return (
    <Box tag="page" {...pageProps} height="100%">
      {beforeContent}
      {children}
    </Box>
  );
};
