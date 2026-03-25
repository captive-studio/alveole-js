import { Box, Button, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { FilterBadge } from '../components/FilterBadge';
import { SearchField } from '../components/SearchField';
import { StoryCard } from '../components/StoryCard';
import { StorybookFlag, StorybookModule } from '../types';
import { filterStories, getAllStoryTags, groupStoriesByTag } from '../utils';

const AVAILABLE_FLAGS: StorybookFlag[] = [
  { key: 'figma', label: 'Figma' },
  { key: 'experimental', label: 'Experimental' },
  { key: 'props', label: 'Props' },
  { key: 'webOnly', label: 'Web only' },
  { key: 'mobileOnly', label: 'Mobile only' },
];

export type StoriesScreenProps = {
  stories: StorybookModule[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  beforeContent?: React.ReactNode;
  createLabel?: string;
  onCreatePress?: () => void;
  onSelectStory?: (story: StorybookModule) => void;
};

export const StoriesScreen = ({
  stories,
  title = 'UI Kit - Components',
  description = 'Shared component catalog',
  emptyMessage = 'No story found.',
  beforeContent,
  createLabel,
  onCreatePress,
  onSelectStory,
}: StoriesScreenProps) => {
  const { text, color, radius } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;
  const columnStyle =
    columns === 1
      ? { width: '100%' as const }
      : columns === 2
        ? { width: 'calc((100% - 16px) / 2)' as const }
        : { width: 'calc((100% - 32px) / 3)' as const };

  const [query, setQuery] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [selectedFlag, setSelectedFlag] = React.useState<StorybookFlag['key'] | null>(null);

  const allTags = React.useMemo(() => getAllStoryTags(stories), [stories]);
  const filteredStories = React.useMemo(
    () =>
      filterStories({
        stories,
        query,
        selectedTag,
        selectedFlag,
      }),
    [stories, query, selectedTag, selectedFlag],
  );
  const groupedStories = React.useMemo(() => groupStoriesByTag(filteredStories, allTags), [filteredStories, allTags]);
  const hasActiveFilters = query.trim().length > 0 || selectedTag !== null || selectedFlag !== null;
  const activeFiltersCount = [query.trim().length > 0, selectedTag !== null, selectedFlag !== null].filter(
    Boolean,
  ).length;

  return (
    <Page
      scrollable
      title={title}
      description={description}
      beforeContent={
        <>
          {beforeContent}
          {createLabel && onCreatePress ? (
            <Section withPaddingY>
              <Box style={{ alignItems: 'flex-end' }}>
                <Button title={createLabel} variant="primary" onPress={onCreatePress} />
              </Box>
            </Section>
          ) : null}
        </>
      }
    >
      <Section withPaddingY>
        <Box
          borderColor={color.light.border['default-grey']}
          borderRadius={radius('lg')}
          borderWidth={1}
          display="flex"
          gap={16}
          p={'150'}
          style={{
            backgroundColor: color.light.background['alt-grey'],
          }}
        >
          <Box
            display="flex"
            gap={12}
            style={{
              alignItems: width >= 1024 ? 'center' : 'stretch',
              flexDirection: width >= 1024 ? 'row' : 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" gap={4}>
              <Typography style={text.Titres['H5 - XS']}>Filtres</Typography>
              <Typography style={text['Corps de texte'].SM.Regular}>
                {filteredStories.length} composant{filteredStories.length > 1 ? 's' : ''}
                {hasActiveFilters
                  ? `, ${activeFiltersCount} filtre${activeFiltersCount > 1 ? 's' : ''} actif${activeFiltersCount > 1 ? 's' : ''}`
                  : ''}
              </Typography>
            </Box>

            {hasActiveFilters ? (
              <Button
                title="Réinitialiser"
                variant="tertiary"
                size="sm"
                onPress={() => {
                  setQuery('');
                  setSelectedTag(null);
                  setSelectedFlag(null);
                }}
              />
            ) : null}
          </Box>

          <SearchField label="Recherche" placeholder="Button, Tabs, Card..." value={query} onChangeText={setQuery} />

          <Box
            display="flex"
            gap={16}
            style={{
              alignItems: 'flex-start',
              flexDirection: width >= 1024 ? 'row' : 'column',
            }}
          >
            <Box display="flex" gap={8} style={{ flex: 1, width: '100%' }}>
              <Typography style={text['Corps de texte'].XS.CapsBold}>Tags</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                <FilterBadge active={selectedTag === null} label="Tous" onPress={() => setSelectedTag(null)} />
                {allTags.map(tag => (
                  <FilterBadge
                    key={tag}
                    active={selectedTag === tag}
                    label={tag}
                    onPress={() => setSelectedTag(current => (current === tag ? null : tag))}
                  />
                ))}
              </Box>
            </Box>

            <Box display="flex" gap={8} style={{ flex: 1, width: '100%' }}>
              <Typography style={text['Corps de texte'].XS.CapsBold}>Indicateurs</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
                <FilterBadge active={selectedFlag === null} label="Tous" onPress={() => setSelectedFlag(null)} />
                {AVAILABLE_FLAGS.map(flag => (
                  <FilterBadge
                    key={flag.key}
                    active={selectedFlag === flag.key}
                    label={flag.label}
                    onPress={() => setSelectedFlag(current => (current === flag.key ? null : flag.key))}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>

      {groupedStories.length === 0 ? (
        <Section withPaddingY>
          <Typography style={text['Corps de texte'].MD.Regular}>{emptyMessage}</Typography>
        </Section>
      ) : (
        groupedStories.map(([tag, taggedStories]) => (
          <Section key={tag} withPaddingY>
            <Box display="flex" gap={16}>
              <Typography style={text.Titres['H4 - SM']}>{tag}</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
                {taggedStories.map(story => (
                  <Box key={story.default.title} style={{ alignSelf: 'stretch', width: columnStyle.width }}>
                    <StoryCard story={story} onPress={onSelectStory} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Section>
        ))
      )}
    </Page>
  );
};
