import { StoryDetailScreen, findStoryByTitle, resumeDeLaFiche } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';
import type { GenerateMetadataFunction } from 'expo-router/server';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter, storyList } from '../../components/uiKitNavigation';

export function generateStaticParams(): { component: string }[] {
  return storyList.map(story => ({ component: story.default.title }));
}

export const generateMetadata: GenerateMetadataFunction = (_, { component }) => {
  const story = findStoryByTitle(storyList, String(component));
  return story ? metadonnees(story.default.title, resumeDeLaFiche(story.default)) : null;
};

export default function ComponentDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  const story = findStoryByTitle(storyList, component);

  return <StoryDetailScreen footerContent={<DocFooter />} story={story} notFoundMessage="Composant introuvable." />;
}
