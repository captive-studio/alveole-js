import { PhilosophyPage } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('Philosophie', 'Les principes qui guident Alveole');

export default function PhilosophyRoute() {
  return <PhilosophyPage footerContent={<DocFooter />} />;
}
