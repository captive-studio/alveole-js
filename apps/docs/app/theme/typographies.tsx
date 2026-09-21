import { ThemeTypographyScreen } from '@alveole/storybook';
import { CustomTypography } from '@alveole/theme';
import { DocFooter } from '../../components/uiKitNavigation';

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
