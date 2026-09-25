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

export { DocFooter };
export const storyList = toStoryModules(Stories);

/**
 * Niveau 1 de la navigation. Couleurs, Typographies et Variables CSS sont repliées sous
 * `Thème` : trois rubriques pour trois pages laissaient la colonne sans niveau 2 les deux
 * tiers du temps. Voir docs/adr/0007.
 */
const RUBRIQUES: (UIKitTopBarItem & { key: string })[] = [
  { key: 'components', label: 'Composants', href: '/' },
  { key: 'theme', label: 'Thème', href: '/theme' },
  { key: 'constants', label: 'Constantes', href: '/constants' },
  { key: 'philosophy', label: 'Philosophie', href: '/philosophy' },
];

const THEME_PAGES: UIKitColumnItem[] = [
  { key: 'colors', title: 'Couleurs', href: '/theme/colors' },
  { key: 'typographies', title: 'Typographies', href: '/theme/typographies' },
  { key: 'css-variables', title: 'Variables CSS', href: '/theme/css-variables' },
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
  if (rubrique === 'theme') return [{ title: 'Thème', items: THEME_PAGES }];
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

  return <UIKitTopBar activeKey={key ?? ''} items={RUBRIQUES} columnGroups={groups} />;
};

export const useUIKitColumn = () => {
  const { groups } = useCurrentRubrique();

  return <UIKitColumn groups={groups} />;
};
