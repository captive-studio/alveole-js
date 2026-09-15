import { PhilosophyPage } from '@alveole/storybook';
import { DocFooter, useUIKitColumn } from '../components/uiKitNavigation';

export default function PhilosophyRoute() {
  const column = useUIKitColumn();

  return <PhilosophyPage sidebar={column} footerContent={<DocFooter />} />;
}
