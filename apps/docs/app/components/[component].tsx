import { StoryDetailScreen, findStoryByTitle } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';
import { DocFooter, storyList, useUIKitColumn } from '../../components/uiKitNavigation';

export function generateStaticParams(): { component: string }[] {
  return storyList.map(story => ({ component: story.default.title }));
}

export default function ComponentDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  const story = findStoryByTitle(storyList, component);
  const column = useUIKitColumn();

  return (
    <StoryDetailScreen
      sidebar={column}
      footerContent={<DocFooter />}
      story={story}
      notFoundMessage="Composant introuvable."
    />
  );
}
