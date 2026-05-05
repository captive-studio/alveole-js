import { Box, LucideIcon, Typography } from '@alveole/components';
import React from 'react';
import { ScrollView } from 'react-native';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Tabs as TamaguiTabs } from 'tamagui';
import { useStyles } from './Tabs.styles';
export const Tabs = props => {
  const { tabs, defaultValue = '', onChange, style, ...boxProps } = props;
  const styles = useStyles();
  const initialValue = defaultValue || tabs[0]?.value || '';
  const [tabState, setTabState] = React.useState({
    activeAt: null,
    currentTab: initialValue,
    intentAt: null,
    prevActiveAt: null,
    hoverTab: null,
  });
  const setCurrentTab = (currentTab, index) => {
    setTabState({ ...tabState, currentTab });
    onChange?.(index);
  };
  const setIntentIndicator = intentAt => setTabState({ ...tabState, intentAt });
  const setActiveIndicator = activeAt => setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const setHoverTab = hoverTab => setTabState({ ...tabState, hoverTab });
  const { currentTab, hoverTab } = tabState;
  const handleOnInteraction = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };
  function isCurrentTab(tabValue) {
    return currentTab === tabValue;
  }
  function isHoverTab(tabValue) {
    return hoverTab === tabValue;
  }
  const renderActions = React.useCallback(() => {
    const currentTab = tabs.find(t => t.value === tabState.currentTab);
    if (currentTab == null) return null;
    return currentTab.renderAction && _jsx(Box, { ml: 'auto', children: currentTab.renderAction() });
  }, [tabState.currentTab, tabs]);
  const renderContent = React.useCallback(() => {
    const currentTab = tabs.find(t => t.value === tabState.currentTab);
    if (currentTab?.scrollable)
      return _jsx(ScrollView, {
        style: { flex: 1 },
        contentContainerStyle: { paddingBottom: 16 },
        keyboardShouldPersistTaps: 'handled',
        showsVerticalScrollIndicator: true,
        children: currentTab.content,
      });
    return currentTab?.content;
  }, [tabState.currentTab, tabs]);
  return _jsx(Box, {
    tag: 'tabs-container',
    style: [styles.container, style],
    ...boxProps,
    children: _jsxs(TamaguiTabs, {
      style: styles.tabs,
      defaultValue: initialValue,
      value: currentTab,
      onValueChange: e =>
        setCurrentTab(
          e,
          tabs.findIndex(t => t.value === e),
        ),
      orientation: 'horizontal',
      size: '$4',
      activationMode: 'manual',
      children: [
        _jsxs(TamaguiTabs.List, {
          disablePassBorderRadius: true,
          loop: false,
          style: styles.tabsList,
          children: [
            tabs.map((tab, idx) =>
              _jsx(_Fragment, {
                children: _jsx(
                  TamaguiTabs.Tab,
                  {
                    unstyled: true,
                    onHoverIn: () => setHoverTab(tab.value),
                    onHoverOut: () => setHoverTab(null),
                    onInteraction: handleOnInteraction,
                    value: tab.value,
                    disabled: tabs.length < 2,
                    style: { ...styles.tabsTab, ...(isCurrentTab(tab.value) ? styles.tabsTabActive : {}) },
                    children: _jsxs(Box, {
                      style: {
                        ...styles.wrapper,
                        ...(isHoverTab(tab.value) ? styles.wrapperHover : {}),
                      },
                      children: [
                        tab.icon &&
                          _jsx(LucideIcon, {
                            name: tab.icon,
                            size: 'sm',
                            color: 'currentColor',
                            style: { ...(isHoverTab(tab.value) ? styles.tabIconHover : styles.tabIcon) },
                          }),
                        _jsx(Typography, {
                          style: { ...styles.tabsLabel, ...(isCurrentTab(tab.value) ? styles.tabsLabelActive : {}) },
                          children: tab.label,
                        }),
                        tab.counter !== undefined &&
                          tab.counter > 0 &&
                          _jsx(Typography, {
                            style: {
                              ...styles.tabsCounter,
                              ...(isCurrentTab(tab.value) ? styles.tabsCounterActive : {}),
                            },
                            children: tab.counter,
                          }),
                      ],
                    }),
                  },
                  idx,
                ),
              }),
            ),
            renderActions && _jsx(Box, { ml: 'auto', children: renderActions() }),
          ],
        }),
        _jsx(Box, {
          style: { flex: 1, minHeight: 0 },
          children: tabs.map((tab, idx) =>
            _jsx(TamaguiTabs.Content, { style: styles.tabsContent, value: tab.value, children: renderContent() }, idx),
          ),
        }),
      ],
    }),
  });
};
