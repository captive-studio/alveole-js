import * as Stories from '@alveole/components/stories';
import { StoriesScreen, type StorybookModule } from '@alveole/storybook';
import { router } from 'expo-router';

const storyList = Object.values(Stories) as StorybookModule[];

export default function IndexRoute() {
  return (
    <StoriesScreen
      stories={storyList}
      title="Alveole — UI Kit"
      description="Catalogue des composants partagés"
      onSelectStory={story => {
        router.push(`/${encodeURIComponent(story.default.title)}`);
      }}
    />
  );
}
