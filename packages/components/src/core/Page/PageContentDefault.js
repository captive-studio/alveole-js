import { jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core/Box';
export const PageContentDefault = props => {
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
  return _jsxs(Box, { tag: 'page', ...pageProps, height: '100%', children: [beforeContent, children] });
};
