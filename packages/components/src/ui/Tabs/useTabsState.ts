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

// Onglet courant et survol vivent ensemble : c'est la meme interaction vue sous deux angles,
// et chaque onglet a besoin des deux pour se dessiner. Les regrouper ici laisse au composant un
// seul appel, et donne a `apparenceDeLOnglet` son etat directement consommable.
//
// Le focus n'en fait pas partie : il est rendu par la regle CSS `:focus-visible` du theme, la
// seule qui distingue le clavier de la souris. Suivi en React, il s'affichait aussi au clic.
export const useTabsState = (initialValue: string, onChange?: (index: number) => void) => {
  const [tabState, setTabState] = React.useState<TabsState>({
    activeAt: null,
    currentTab: initialValue,
    intentAt: null,
    prevActiveAt: null,
    hoverTab: null,
  });

  const setCurrentTab = (currentTab: string, index: number) => {
    setTabState(state => ({ ...state, currentTab }));
    onChange?.(index);
  };

  // Restaurer l'onglet actif depuis l'Anchor Namespace n'est pas une interaction : `onChange`
  // ne doit se declencher que sur un vrai clic, pas sur ce qui n'est qu'une reprise d'etat.
  const restoreCurrentTab = (currentTab: string) => setTabState(state => ({ ...state, currentTab }));

  // Chaque mise a jour part de l'etat courant, jamais de celui du rendu : en Tamagui v3, l'onglet
  // emet son interaction `hover` dans le meme evenement que `onMouseEnter`, et une ecriture a
  // partir de l'etat du rendu effacait le survol tout juste pose.
  const setHoverTab = (hoverTab: string | null) => setTabState(state => ({ ...state, hoverTab }));

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setTabState(state => ({ ...state, prevActiveAt: state.activeAt, activeAt: layout }));
    } else {
      setTabState(state => ({ ...state, intentAt: layout }));
    }
  };

  const etatDeLOnglet = (tabValue: string): EtatDeLOnglet => ({
    actif: tabState.currentTab === tabValue,
    survole: tabState.hoverTab === tabValue,
  });

  return {
    currentTab: tabState.currentTab,
    etatDeLOnglet,
    setCurrentTab,
    restoreCurrentTab,
    setHoverTab,
    handleOnInteraction,
  };
};
