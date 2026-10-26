import { StoriesScreen } from '@alveole/storybook';
import { metadonnees } from '../components/metadonnees';
import { DocFooter, storyList } from '../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('UI Kit - Composants', 'Catalogue des composants partagés');

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
