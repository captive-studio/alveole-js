import { StoryDetailScreen, findStoryByTitle } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';
import { storyList, useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ComponentDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  const story = findStoryByTitle(storyList, component);
  const topBar = useUIKitTopBar('components');

  return <StoryDetailScreen beforeContent={topBar} story={story} notFoundMessage="Composant introuvable." />;
}
