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
    const matchesQuery =
      normalizedQuery.length === 0 ||
      normalizeText(meta.title).includes(normalizedQuery) ||
      normalizeText(meta.description).includes(normalizedQuery);

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
