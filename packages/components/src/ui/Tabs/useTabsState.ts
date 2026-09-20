import React from 'react';
import { TabLayout, TabsTabProps } from 'tamagui';
import { EtatDeLOnglet } from './Tabs.apparence';

type TabsState = {
  currentTab: string;
  intentAt: TabLayout | null;
  activeAt: TabLayout | null;
  prevActiveAt: TabLayout | null;
  hoverTab: string | null;
};

// Onglet courant, survol et focus vivent ensemble : c'est la meme interaction vue sous trois
// angles, et chaque onglet a besoin des trois pour se dessiner. Les regrouper ici laisse au
// composant un seul appel, et donne a `apparenceDeLOnglet` son etat directement consommable.
export const useTabsState = (initialValue: string, onChange?: (index: number) => void) => {
  const [tabState, setTabState] = React.useState<TabsState>({
    activeAt: null,
    currentTab: initialValue,
    intentAt: null,
    prevActiveAt: null,
    hoverTab: null,
  });
  const [focusedTab, setFocusedTab] = React.useState<string | null>(null);

  const setCurrentTab = (currentTab: string, index: number) => {
    setTabState({ ...tabState, currentTab });
    onChange?.(index);
  };

  const setHoverTab = (hoverTab: string | null) => setTabState({ ...tabState, hoverTab });

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt: layout });
    } else {
      setTabState({ ...tabState, intentAt: layout });
    }
  };

  const etatDeLOnglet = (tabValue: string): EtatDeLOnglet => ({
    actif: tabState.currentTab === tabValue,
    focalise: focusedTab === tabValue,
    survole: tabState.hoverTab === tabValue,
  });

  return {
    currentTab: tabState.currentTab,
    etatDeLOnglet,
    setCurrentTab,
    setHoverTab,
    setFocusedTab,
    handleOnInteraction,
  };
};
