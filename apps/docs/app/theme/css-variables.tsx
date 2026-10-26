import { ThemeCSSVariablesScreen } from '@alveole/storybook';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () =>
  metadonnees('Variables CSS', 'Toutes les variables CSS injectées par le ThemeProvider');

export default function ThemeCSSVariablesRoute() {
  return <ThemeCSSVariablesScreen footerContent={<DocFooter />} />;
}
