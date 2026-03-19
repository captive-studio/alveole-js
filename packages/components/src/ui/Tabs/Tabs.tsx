import { Box, BoxProps, LucideIcon, LucideIconProps, Typography } from '@alveole/components';
import React from 'react';
import { ScrollView } from 'react-native';
import { TabLayout, TabsTabProps, Tabs as TamaguiTabs } from 'tamagui';
import { useStyles } from './Tabs.styles';

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

export const Tabs = (props: TabsProps) => {
  const { tabs, defaultValue = '', onChange, style, ...boxProps } = props;
  const styles = useStyles();

  const initialValue = defaultValue || tabs[0]?.value || '';

  const [tabState, setTabState] = React.useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
    hoverTab: string | null;
  }>({
    activeAt: null,
    currentTab: initialValue,
    intentAt: null,
    prevActiveAt: null,
    hoverTab: null,
  });

  const setCurrentTab = (currentTab: string, index: number) => {
    setTabState({ ...tabState, currentTab });
    onChange?.(index);
  };
  const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt: any) => setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const setHoverTab = (hoverTab: string | null) => setTabState({ ...tabState, hoverTab });
  const { currentTab, hoverTab } = tabState;

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  function isCurrentTab(tabValue: string): boolean {
    return currentTab === tabValue;
  }

  function isHoverTab(tabValue: string): boolean {
    return hoverTab === tabValue;
  }

  const renderActions = React.useCallback(() => {
    const currentTab = tabs.find(t => t.value === tabState.currentTab);
    if (currentTab == null) return null;

    return currentTab.renderAction && <Box ml={'auto'}>{currentTab.renderAction()}</Box>;
  }, [tabState.currentTab, tabs]);

  const renderContent = React.useCallback(() => {
    const currentTab = tabs.find(t => t.value === tabState.currentTab);
    if (currentTab?.scrollable)
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {currentTab.content}
        </ScrollView>
      );
    return currentTab?.content;
  }, [tabState.currentTab, tabs]);

  return (
    <Box tag="tabs-container" style={[styles.container, style]} {...boxProps}>
      <TamaguiTabs
        style={styles.tabs}
        defaultValue={initialValue}
        value={currentTab}
        onValueChange={e =>
          setCurrentTab(
            e,
            tabs.findIndex(t => t.value === e),
          )
        }
        orientation="horizontal"
        size="$4"
        activationMode="manual"
      >
        <TamaguiTabs.List disablePassBorderRadius loop={false} style={styles.tabsList}>
          {tabs.map((tab, idx) => (
            <>
              <TamaguiTabs.Tab
                key={idx}
                unstyled
                onHoverIn={() => setHoverTab(tab.value)}
                onHoverOut={() => setHoverTab(null)}
                onInteraction={handleOnInteraction}
                value={tab.value}
                disabled={tabs.length < 2}
                style={{ ...styles.tabsTab, ...(isCurrentTab(tab.value) ? styles.tabsTabActive : {}) }}
              >
                <Box
                  style={{
                    ...styles.wrapper,
                    ...(isHoverTab(tab.value) ? styles.wrapperHover : {}),
                  }}
                >
                  {tab.icon && (
                    <LucideIcon
                      name={tab.icon}
                      size="sm"
                      color="currentColor"
                      style={{ ...(isHoverTab(tab.value) ? styles.tabIconHover : styles.tabIcon) }}
                    />
                  )}
                  <Typography
                    style={{ ...styles.tabsLabel, ...(isCurrentTab(tab.value) ? styles.tabsLabelActive : {}) }}
                  >
                    {tab.label}
                  </Typography>
                  {tab.counter !== undefined && tab.counter > 0 && (
                    <Typography
                      style={{ ...styles.tabsCounter, ...(isCurrentTab(tab.value) ? styles.tabsCounterActive : {}) }}
                    >
                      {tab.counter}
                    </Typography>
                  )}
                </Box>
              </TamaguiTabs.Tab>
            </>
          ))}

          {renderActions && <Box ml={'auto'}>{renderActions()}</Box>}
        </TamaguiTabs.List>

        <Box style={{ flex: 1, minHeight: 0 }}>
          {tabs.map((tab, idx) => (
            <TamaguiTabs.Content style={styles.tabsContent} key={idx} value={tab.value}>
              {renderContent()}
            </TamaguiTabs.Content>
          ))}
        </Box>
      </TamaguiTabs>
    </Box>
  );
};
