import { ThemeNuancesScreen } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () =>
  metadonnees('Nuances', 'Les échelles de couleurs du thème et les tokens qui citent chaque nuance');

export default function ThemeNuancesRoute() {
  return <ThemeNuancesScreen footerContent={<DocFooter />} />;
}
