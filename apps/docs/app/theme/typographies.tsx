import { ThemeTypographyScreen } from '@alveole/storybook';
import { CustomTypography } from '@alveole/theme';
import { useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ThemeTypographiesRoute() {
  const topBar = useUIKitTopBar('typography');

  return (
    <ThemeTypographyScreen
      beforeContent={topBar}
      typography={CustomTypography}
      title="UI Kit - Textes du thème"
      description="Styles de texte du thème"
    />
  );
}
