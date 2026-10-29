import * as Stories from '@alveole/components/stories';
import {
  DocFooter,
  UIKitColumn,
  UIKitTopBar,
  findCurrentRubriqueKey,
  getAllStoryTags,
  getConstantEntries,
  groupStoriesByTag,
  groupTitleForTag,
  sortStoriesByTitle,
  toStoryModules,
  type UIKitColumnGroup,
  type UIKitColumnItem,
  type UIKitTopBarItem,
} from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { usePathname } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export { DocFooter };
export const storyList = toStoryModules(Stories);

/**
 * Niveau 1 de la navigation. Couleurs, Typographies et Variables CSS sont repliées sous
 * `Thème` (et Installation, Philosophie, Migration v2 sous `Guides`) : trois rubriques pour trois pages laissaient la colonne sans niveau 2 les deux
 * tiers du temps. Voir docs/adr/0007.
 */
const RUBRIQUES: (UIKitTopBarItem & { key: string })[] = [
  { key: 'guides', label: 'Guides', href: '/guides' },
  { key: 'components', label: 'Composants', href: '/' },
  { key: 'theme', label: 'Thème', href: '/theme' },
  { key: 'constants', label: 'Constantes', href: '/constants' },
];

// Les deux pages des couleurs se lisent ensemble : une nuance mene aux tokens qui la citent.
const COULEURS_PAGES: UIKitColumnItem[] = [
  { key: 'nuances', title: 'Nuances', href: '/theme/nuances' },
  { key: 'tokens-semantiques', title: 'Tokens sémantiques', href: '/theme/tokens-semantiques' },
];

const THEME_PAGES: UIKitColumnItem[] = [
  { key: 'typographies', title: 'Typographies', href: '/theme/typographies' },
  { key: 'css-variables', title: 'Variables CSS', href: '/theme/css-variables' },
];

const GUIDE_PAGES: UIKitColumnItem[] = [
  { key: 'installation', title: 'Installation', href: '/guides/installation' },
  { key: 'formulaires', title: 'Formulaires', href: '/guides/formulaires' },
  { key: 'philosophy', title: 'Philosophie', href: '/guides/philosophy' },
  { key: 'migration-v2', title: 'Migration v2', href: '/guides/migration-v2' },
];

const componentGroups = (): UIKitColumnGroup[] =>
  groupStoriesByTag(storyList, getAllStoryTags(storyList)).map(([tag, stories]) => ({
    title: groupTitleForTag(tag),
    // Le tri alphabétique est propre à la colonne : la grille de l'index garde son ordre et
    // ses filtres. Une colonne sert à retrouver, l'ordre d'un fichier d'index ne se parcourt pas.
    items: sortStoriesByTitle(stories).map(story => ({
      key: story.default.title,
      title: story.default.title,
      href: `/components/${encodeURIComponent(story.default.title)}`,
    })),
  }));

const constantGroups = (): UIKitColumnGroup[] => [
  {
    title: 'Constantes',
    items: getConstantEntries(ThemeConstants).map(([name]) => ({
      key: name,
      title: name,
      href: `/constants/${encodeURIComponent(name)}`,
    })),
  },
];

const buildColumnGroups = (rubrique: string | undefined): UIKitColumnGroup[] => {
  if (rubrique === 'components') return componentGroups();
  if (rubrique === 'guides') return [{ title: 'Guides', items: GUIDE_PAGES }];
  if (rubrique === 'theme') {
    return [
      { title: 'Couleurs', items: COULEURS_PAGES },
      { title: 'Thème', items: THEME_PAGES },
    ];
  }
  if (rubrique === 'constants') return constantGroups();
  return [];
};

const useCurrentRubrique = () => {
  const pathname = usePathname();
  const key = findCurrentRubriqueKey(RUBRIQUES, pathname);
  const groups = React.useMemo(() => buildColumnGroups(key), [key]);

  return { key, groups };
};

export const useUIKitTopBar = () => {
  const { key, groups } = useCurrentRubrique();

  return (
    <UIKitTopBar
      activeKey={key ?? ''}
      items={RUBRIQUES}
      columnGroups={groups}
      logo={
        <Image
          source={require('../assets/images/logo.png')}
          accessibilityLabel="Alveole"
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
        />
      }
    />
  );
};

export const useUIKitColumn = () => {
  const { groups } = useCurrentRubrique();

  return <UIKitColumn groups={groups} />;
};
