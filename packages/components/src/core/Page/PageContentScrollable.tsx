import React, { useImperativeHandle, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewRef } from 'react-native-keyboard-controller';
import { Box } from '../../core/Box';
import type { PageProps } from './Page.types';

export type PageContentScrollableHandle = {
  scrollToTop: () => void;
};

export type PageContentScrollableProps = PageProps & {
  onScrollToBottom?: () => void;
  onEndReachedThreshold?: number;
  onScrollChange?: (scrollY: number) => void;
};

export const PageContentScrollable = React.forwardRef<PageContentScrollableHandle, PageContentScrollableProps>(
  function PageContentScrollable(props, ref) {
    const {
      beforeContent,
      footerContent,
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
    const {
      scrollable: _scrollable,
      sidebar: _sidebar,
      sideBarController: _sideBarController,
      ...boxProps
    } = pageProps;

    const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
    useImperativeHandle(ref, () => ({
      scrollToTop: () => scrollRef.current?.scrollTo({ y: 0, animated: true }),
    }));

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
      const atBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - onEndReachedThreshold;
      if (atBottom) onScrollToBottom?.();
      onScrollChange?.(contentOffset.y);
    };

    return (
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{ minHeight: '100%', width: '100%', flexGrow: 1 }}
        style={{ backgroundColor: defaultBackgroundColor ?? 'transparent' }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        alwaysBounceVertical={onScrollToBottom != null}
        bounces={onScrollToBottom != null}
        overScrollMode={onScrollToBottom != null ? 'always' : 'never'}
        bottomOffset={24}
      >
        <Box tag="page" {...boxProps} height="100%">
          {beforeContent}
          {children}
          {footerContent}
        </Box>
      </KeyboardAwareScrollView>
    );
  },
);
