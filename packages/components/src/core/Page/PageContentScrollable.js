import React, { useImperativeHandle, useRef } from 'react';
import { ScrollView } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core/Box';
export const PageContentScrollable = React.forwardRef(function PageContentScrollable(props, ref) {
  const {
    beforeContent,
    children,
    title,
    description,
    og,
    defaultBackgroundColor,
    onScrollToBottom,
    onEndReachedThreshold = 100,
    onScrollChange,
    ...pageProps
  } = props;
  const { scrollable: _scrollable, sidebar: _sidebar, sideBarController: _sideBarController, ...boxProps } = pageProps;
  const scrollRef = useRef(null);
  useImperativeHandle(ref, () => ({
    scrollToTop: () => scrollRef.current?.scrollTo({ y: 0, animated: true }),
  }));
  const handleScroll = e => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const atBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - onEndReachedThreshold;
    if (atBottom) onScrollToBottom?.();
    onScrollChange?.(contentOffset.y);
  };
  return _jsx(ScrollView, {
    ref: scrollRef,
    contentContainerStyle: { minHeight: '100%', width: '100%', flexGrow: 1 },
    style: { backgroundColor: defaultBackgroundColor ?? 'transparent' },
    onScroll: handleScroll,
    scrollEventThrottle: 16,
    alwaysBounceVertical: onScrollToBottom != null,
    bounces: onScrollToBottom != null,
    overScrollMode: onScrollToBottom != null ? 'always' : 'never',
    children: _jsxs(Box, { tag: 'page', ...boxProps, height: '100%', children: [beforeContent, children] }),
  });
});
