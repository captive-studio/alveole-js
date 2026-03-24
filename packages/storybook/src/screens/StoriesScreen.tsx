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
  createLabel?: string;
  onCreatePress?: () => void;
  onSelectStory?: (story: StorybookModule) => void;
};

export const StoriesScreen = ({
  stories,
  title = 'UI Kit - Components',
  description = 'Shared component catalog',
  emptyMessage = 'No story found.',
  createLabel,
  onCreatePress,
  onSelectStory,
}: StoriesScreenProps) => {
  const { text } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

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

  return (
    <Page
      scrollable
      title={title}
      description={description}
      beforeContent={
        createLabel && onCreatePress ? (
          <Section withPaddingY>
            <Box style={{ alignItems: 'flex-end' }}>
              <Button title={createLabel} variant="primary" onPress={onCreatePress} />
            </Box>
          </Section>
        ) : undefined
      }
    >
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <SearchField label="Search" placeholder="Button, Tabs, Card..." value={query} onChangeText={setQuery} />

          <Box display="flex" gap={8}>
            <Typography style={text['Corps de texte'].SM.SemiBold}>Tags</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
              <FilterBadge active={selectedTag === null} label="All" onPress={() => setSelectedTag(null)} />
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

          <Box display="flex" gap={8}>
            <Typography style={text['Corps de texte'].SM.SemiBold}>Flags</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
              <FilterBadge active={selectedFlag === null} label="All" onPress={() => setSelectedFlag(null)} />
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

          <Typography style={text['Corps de texte'].SM.Regular}>
            {filteredStories.length} result{filteredStories.length > 1 ? 's' : ''}
          </Typography>
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
                  <Box key={story.default.title} width={columns === 1 ? '100%' : columns === 2 ? '48%' : '31%'}>
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
