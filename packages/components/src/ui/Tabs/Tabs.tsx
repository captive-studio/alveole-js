import { focusRingProps } from '@alveole/theme';
import React from 'react';
import { Tabs as TamaguiTabs } from 'tamagui';
import { Box, BoxProps } from '../../core/Box';
import { LucideIconProps } from '../LucideIcon';
import { useStyles } from './Tabs.styles';
import { TabsContent } from './TabsContent';
import { TabsTab } from './TabsTab';
import { useTabsState } from './useTabsState';

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
  const { currentTab, etatDeLOnglet, setCurrentTab, setHoverTab, handleOnInteraction } = useTabsState(
    initialValue,
    onChange,
  );

  // Tamagui ne monte que le `Content` de l'onglet selectionne : tous rendent donc le meme
  // contenu, celui de l'onglet courant. L'action de barre suit la meme regle.
  const ongletCourant = tabs.find(tab => tab.value === currentTab);

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
        {/* Tamagui donne `tabIndex=-1` a tous les onglets et fait de la liste le point d'entree
            au clavier : c'est elle qu'on atteint par tabulation, les fleches circulant ensuite
            entre les onglets. Elle doit donc montrer la bague, sans quoi la tabulation s'arrete
            la sans que rien ne l'indique - mesure en navigateur. La sortir de l'ordre de
            tabulation rendrait le composant entierement inatteignable. */}
        <TamaguiTabs.List disablePassBorderRadius loop={false} style={styles.tabsList} {...focusRingProps()}>
          {tabs.map(tab => (
            <TabsTab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={tab.icon}
              counter={tab.counter}
              etat={etatDeLOnglet(tab.value)}
              disabled={tabs.length < 2}
              onHover={setHoverTab}
              onInteraction={handleOnInteraction}
            />
          ))}

          {ongletCourant?.renderAction && <Box ml={'auto'}>{ongletCourant.renderAction()}</Box>}
        </TamaguiTabs.List>

        <Box style={{ flex: 1, minHeight: 0 }}>
          {tabs.map((tab, idx) => (
            <TamaguiTabs.Content style={styles.tabsContent} key={idx} value={tab.value} {...focusRingProps()}>
              <TabsContent content={ongletCourant?.content} scrollable={ongletCourant?.scrollable} />
            </TamaguiTabs.Content>
          ))}
        </Box>
      </TamaguiTabs>
    </Box>
  );
};
