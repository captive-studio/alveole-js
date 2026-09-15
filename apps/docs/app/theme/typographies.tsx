import { ThemeTypographyScreen } from '@alveole/storybook';
import { CustomTypography } from '@alveole/theme';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export default function ThemeTypographiesRoute() {
  const column = useUIKitColumn();

  return (
    <ThemeTypographyScreen
      sidebar={column}
      footerContent={<DocFooter />}
      typography={CustomTypography}
      title="UI Kit - Textes du thème"
      description="Styles de texte du thème"
    />
  );
}
