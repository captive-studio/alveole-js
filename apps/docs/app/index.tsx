import { StoriesScreen } from '@alveole/storybook';
import { DocFooter, storyList, useUIKitColumn } from '../components/uiKitNavigation';

export default function IndexRoute() {
  const column = useUIKitColumn();

  return (
    <StoriesScreen
      sidebar={column}
      footerContent={<DocFooter />}
      stories={storyList}
      title="UI Kit - Composants"
      description="Catalogue des composants partagés"
      getStoryHref={story => `/components/${encodeURIComponent(story.default.title)}`}
    />
  );
}
