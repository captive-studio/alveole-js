import { StorybookFlag, StorybookMeta, StorybookModule } from './types';

const FLAG_DEFINITIONS = [
  { key: 'figma', label: 'Figma', isActive: (meta: StorybookMeta) => Boolean(meta.figmaURL) },
  { key: 'experimental', label: 'Experimental', isActive: (meta: StorybookMeta) => Boolean(meta.experimental) },
  { key: 'props', label: 'Props', isActive: (meta: StorybookMeta) => meta.props != null },
  { key: 'webOnly', label: 'Web only', isActive: (meta: StorybookMeta) => Boolean(meta.webOnly) },
  { key: 'mobileOnly', label: 'Mobile only', isActive: (meta: StorybookMeta) => Boolean(meta.mobileOnly) },
] as const;

export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Tous les indicateurs qu'une fiche peut porter, dans l'ordre ou le catalogue les propose.
 * Ils se deduisent des definitions plutot que d'etre recopies : un indicateur ajoute ici
 * devient filtrable sans autre geste.
 */
export const ALL_STORY_FLAGS: StorybookFlag[] = FLAG_DEFINITIONS.map(({ key, label }) => ({ key, label }));

export const getStoryFlags = (meta: StorybookMeta): StorybookFlag[] =>
  FLAG_DEFINITIONS.filter(flag => flag.isActive(meta)).map(({ key, label }) => ({ key, label }));

export const getAllStoryTags = (stories: StorybookModule[]): string[] => {
  const tags = new Set<string>();
  for (const story of stories) {
    for (const tag of story.default.tags) tags.add(tag);
  }

  return Array.from(tags).sort((left, right) => left.localeCompare(right));
};

export const filterStories = (params: {
  stories: StorybookModule[];
  query: string;
  selectedTag: string | null;
  selectedFlag: StorybookFlag['key'] | null;
}) => {
  const { stories, query, selectedTag, selectedFlag } = params;
  const normalizedQuery = normalizeText(query.trim());

  return stories.filter(story => {
    const meta = story.default;
    // Une recherche vide n'a pas besoin d'etre traitee a part : toute chaine contient la
    // chaine vide, donc le titre suffit a laisser passer la fiche.
    const matchesQuery =
      normalizeText(meta.title).includes(normalizedQuery) || normalizeText(meta.description).includes(normalizedQuery);

    if (!matchesQuery) return false;
    if (selectedTag && !meta.tags.includes(selectedTag)) return false;
    if (selectedFlag) {
      const definition = FLAG_DEFINITIONS.find(flag => flag.key === selectedFlag);
      if (definition && !definition.isActive(meta)) return false;
    }

    return true;
  });
};

export const sortStoriesByTitle = (stories: StorybookModule[]) =>
  [...stories].sort((left, right) => left.default.title.localeCompare(right.default.title));

export const groupStoriesByTag = (stories: StorybookModule[], tags: string[]) =>
  tags
    .map(tag => [tag, stories.filter(story => story.default.tags.includes(tag))] as const)
    .filter(([, groupedStories]) => groupedStories.length > 0);

export const getStoryExamples = (story: StorybookModule) =>
  Object.entries(story).filter(([key, value]) => key !== 'default' && typeof value === 'function') as [
    string,
    Exclude<StorybookModule[keyof StorybookModule], StorybookMeta>,
  ][];

export const toStoryModules = (stories: Record<string, unknown>) => Object.values(stories) as StorybookModule[];

export const findStoryByTitle = (stories: StorybookModule[], title: string | undefined | null) =>
  stories.find(story => story.default.title === title) ?? null;

// Une constante du thème n'est présentée que si elle est structurée : les scalaires exportés
// par `@alveole/theme` (numéro de version, drapeaux) ne sont pas des jetons à parcourir.
export const getConstantEntries = (constants: Record<string, unknown>) =>
  Object.entries(constants)
    .filter(([, value]) => typeof value === 'object' && value != null)
    .sort((left, right) => left[0].localeCompare(right[0]));

export const findConstantByName = (constants: Record<string, unknown>, name: string | undefined | null) =>
  Object.entries(constants).find(([key]) => key === name) ?? null;

export const stripMarkdown = (markdown: string): string =>
  markdown
    .replace(/#{1,6}\s*/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();

// Les tags de fiches sont écrits comme les répertoires du dépôt (`core`, `ui`), mais servent de
// titre de groupe dans la colonne, où ils doivent se lire comme des mots. Un sigle n'obéit pas
// à la règle générale : `ui` donne `UI` et non `Ui`, d'où la table d'exceptions.
const ACRONYM_GROUP_TITLES: Record<string, string> = { ui: 'UI' };

export const groupTitleForTag = (tag: string) =>
  ACRONYM_GROUP_TITLES[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1);
