import { ThemeTypographyScreen } from '@alveole/storybook';
import { CustomTypography } from '@alveole/theme';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('UI Kit - Textes du thème', 'Styles de texte du thème');

export default function ThemeTypographiesRoute() {
  return (
    <ThemeTypographyScreen
      footerContent={<DocFooter />}
      typography={CustomTypography}
      title="UI Kit - Textes du thème"
      description="Styles de texte du thème"
    />
  );
}
