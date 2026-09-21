import { StoriesScreen } from '@alveole/storybook';
import { DocFooter, storyList } from '../components/uiKitNavigation';

export default function IndexRoute() {
  return (
    <StoriesScreen
      footerContent={<DocFooter />}
      stories={storyList}
      title="UI Kit - Composants"
      description="Catalogue des composants partagés"
      getStoryHref={story => `/components/${encodeURIComponent(story.default.title)}`}
    />
  );
}
