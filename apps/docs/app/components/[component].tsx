import { StoryDetailScreen, findStoryByTitle } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';
import { DocFooter, storyList } from '../../components/uiKitNavigation';

export function generateStaticParams(): { component: string }[] {
  return storyList.map(story => ({ component: story.default.title }));
}

export default function ComponentDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  const story = findStoryByTitle(storyList, component);

  return <StoryDetailScreen footerContent={<DocFooter />} story={story} notFoundMessage="Composant introuvable." />;
}
