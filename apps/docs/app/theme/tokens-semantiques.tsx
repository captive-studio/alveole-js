import { ThemePaletteScreen } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () =>
  metadonnees('Tokens sémantiques', 'Les tokens de couleur du thème, leur nuance et leur statut');

export default function ThemeTokensSemantiquesRoute() {
  return <ThemePaletteScreen footerContent={<DocFooter />} />;
}
