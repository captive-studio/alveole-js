import { ActionMenu, Box, Button, Page, PageHeader, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, ScrollView, useWindowDimensions } from 'react-native';
import { ScreenZone } from '../components/ScreenZone';
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
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
  createLabel?: string;
  onCreatePress?: () => void;
  getStoryHref: (story: StorybookModule) => string;
};

export const StoriesScreen = ({
  stories,
  title = 'UI Kit - Components',
  description = 'Shared component catalog',
  emptyMessage = 'No story found.',
  beforeContent,
  sidebar,
  footerContent,
  createLabel,
  onCreatePress,
  getStoryHref,
}: StoriesScreenProps) => {
  const { grilles, text } = useTheme();
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
  const [openFilter, setOpenFilter] = React.useState<'tags' | 'indicateurs' | null>(null);

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
      sidebar={sidebar}
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
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageHeader title={title} />
        <ScrollView
          horizontal
          nestedScrollEnabled
          directionalLockEnabled={Platform.OS === 'ios'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
        >
          <Box style={{ minWidth: 200 }}>
            <SearchField placeholder="Button, Tabs, Card..." value={query} onChangeText={setQuery} size="sm" />
          </Box>

          <ActionMenu
            placement="bottom-start"
            scrollable={false}
            open={openFilter === 'tags'}
            setOpen={open => setOpenFilter(open ? 'tags' : null)}
            renderTrigger={() => (
              <Button
                variant="secondary"
                title={selectedTag ?? 'Tags'}
                endIcon="ChevronDown"
                size="sm"
                selected={selectedTag !== null}
                active={openFilter === 'tags'}
              />
            )}
          >
            {allTags.map(tag => (
              <ActionMenu.Item
                key={tag}
                title={tag}
                selected={selectedTag === tag}
                onPress={() => {
                  setSelectedTag(prev => (prev === tag ? null : tag));
                  setOpenFilter(null);
                }}
              />
            ))}
          </ActionMenu>

          <ActionMenu
            placement="bottom-start"
            scrollable={false}
            open={openFilter === 'indicateurs'}
            setOpen={open => setOpenFilter(open ? 'indicateurs' : null)}
            renderTrigger={() => (
              <Button
                variant="secondary"
                title={AVAILABLE_FLAGS.find(f => f.key === selectedFlag)?.label ?? 'Indicateurs'}
                endIcon="ChevronDown"
                size="sm"
                selected={selectedFlag !== null}
                active={openFilter === 'indicateurs'}
              />
            )}
          >
            {AVAILABLE_FLAGS.map(flag => (
              <ActionMenu.Item
                key={flag.key}
                title={flag.label}
                selected={selectedFlag === flag.key}
                onPress={() => {
                  setSelectedFlag(prev => (prev === flag.key ? null : flag.key));
                  setOpenFilter(null);
                }}
              />
            ))}
          </ActionMenu>
        </ScrollView>

        {groupedStories.length === 0 ? (
          <Typography style={text['Corps de texte'].MD.Regular}>{emptyMessage}</Typography>
        ) : (
          groupedStories.map(([tag, taggedStories]) => (
            <Box key={tag} display="flex" gap={16}>
              <Typography style={text.Titres['H4 - SM']}>{tag}</Typography>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
                {taggedStories.map(story => (
                  <Box key={story.default.title} style={{ alignSelf: 'stretch', width: columnStyle.width }}>
                    <StoryCard story={story} href={getStoryHref(story)} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        )}
      </ScreenZone>
      {footerContent}
    </Page>
  );
};
