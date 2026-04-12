import * as Stories from '@alveole/components/stories';
import { StoryDetailScreen, type StorybookModule } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';

const storyList = Object.values(Stories) as StorybookModule[];

export default function StoryDetailRoute() {
  const { story: storyTitle } = useLocalSearchParams<{ story: string }>();
  const story = storyList.find(s => s.default.title === storyTitle) ?? null;

  return <StoryDetailScreen story={story} notFoundMessage="Composant introuvable." />;
}
