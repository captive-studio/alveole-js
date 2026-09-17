import { Box, Button, Page, Section } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { BarreDeFiltres } from '../components/BarreDeFiltres';
import { GrilleDeFiches } from '../components/GrilleDeFiches';
import { PageTitle } from '../components/PageTitle';
import { ScreenZone } from '../components/ScreenZone';
import { StorybookFlag, StorybookModule } from '../types';
import { filterStories, getAllStoryTags, groupStoriesByTag } from '../utils';
import { largeurDeColonne } from './colonnesDeFiches';

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

/** L'action de creation n'a de sens qu'avec un libelle et une action : un seul des deux donnerait
 *  un bouton muet ou inerte. */
const ActionDeCreation = ({ label, onPress }: { label?: string; onPress?: () => void }) => {
  if (!label || !onPress) return null;

  return (
    <Section withPaddingY>
      <Box style={{ alignItems: 'flex-end' }}>
        <Button title={label} variant="primary" onPress={onPress} />
      </Box>
    </Section>
  );
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
  const { grilles } = useTheme();
  const { width } = useWindowDimensions();

  const [query, setQuery] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [selectedFlag, setSelectedFlag] = React.useState<StorybookFlag['key'] | null>(null);

  const allTags = React.useMemo(() => getAllStoryTags(stories), [stories]);
  const groupedStories = React.useMemo(
    () => groupStoriesByTag(filterStories({ stories, query, selectedTag, selectedFlag }), allTags),
    [stories, query, selectedTag, selectedFlag, allTags],
  );

  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={
        <>
          {beforeContent}
          <ActionDeCreation label={createLabel} onPress={onCreatePress} />
        </>
      }
    >
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageTitle title={title} />
        <BarreDeFiltres
          recherche={query}
          onRecherche={setQuery}
          tags={allTags}
          tagChoisi={selectedTag}
          onTag={setSelectedTag}
          indicateurChoisi={selectedFlag}
          onIndicateur={setSelectedFlag}
        />
        <GrilleDeFiches
          groupes={groupedStories}
          largeurDeFiche={largeurDeColonne(width)}
          getStoryHref={getStoryHref}
          messageVide={emptyMessage}
        />
      </ScreenZone>
      {footerContent}
    </Page>
  );
};
