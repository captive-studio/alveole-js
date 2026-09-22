import { focusRingProps } from '@alveole/theme';
import React from 'react';
import { Tabs as TamaguiTabs } from 'tamagui';
import { toSlug } from '../../core/AnchorHeading/slug';
import { Box, BoxProps } from '../../core/Box';
import { LucideIconProps } from '../LucideIcon';
import { useStyles } from './Tabs.styles';
import { TabsContent } from './TabsContent';
import { TabsTab } from './TabsTab';
import { useAnchorSync } from './useAnchorSync';
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
  /**
   * Active l'Anchor Sync (voir ADR 0021) : au clic, l'onglet actif est ecrit dans l'etat
   * adressable de la plateforme (`#{urlAnchorPrefix}-{ancre}` sur le web, un parametre de
   * route sur natif), et relu de la meme facon au montage. L'ancre de chaque onglet vient de
   * son `label` (`toSlug`), pas de son `value`. Absent, `Tabs` ne touche a rien de tout ca.
   * Distingue aussi plusieurs `Tabs` sur une meme page : chacun doit avoir le sien.
   */
  urlAnchorPrefix?: string;
};

export const Tabs = (props: TabsProps) => {
  const { tabs, defaultValue = '', onChange, urlAnchorPrefix, style, ...boxProps } = props;
  const styles = useStyles();

  const initialValue = defaultValue || tabs[0]?.value || '';
  const { currentTab, etatDeLOnglet, setCurrentTab, restoreCurrentTab, setHoverTab, handleOnInteraction } =
    useTabsState(initialValue, onChange);

  const { persist } = useAnchorSync(urlAnchorPrefix, anchor => {
    const tab = tabs.find(t => toSlug(t.label) === anchor);
    if (tab) restoreCurrentTab(tab.value);
  });

  // Tamagui ne monte que le `Content` de l'onglet selectionne : tous rendent donc le meme
  // contenu, celui de l'onglet courant. L'action de barre suit la meme regle.
  const ongletCourant = tabs.find(tab => tab.value === currentTab);

  return (
    <Box tag="tabs-container" style={[styles.container, style]} {...boxProps}>
      <TamaguiTabs
        style={styles.tabs}
        defaultValue={initialValue}
        value={currentTab}
        onValueChange={e => {
          const index = tabs.findIndex(t => t.value === e);
          setCurrentTab(e, index);
          const tab = tabs[index];
          if (tab) persist(toSlug(tab.label));
        }}
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
