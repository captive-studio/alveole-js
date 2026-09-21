import { ThemePaletteScreen } from '@alveole/storybook';
import { CustomPalette } from '@alveole/theme';
import { DocFooter } from '../../components/uiKitNavigation';

export default function ThemeColorsRoute() {
  return (
    <ThemePaletteScreen
      palette={CustomPalette}
      title="Couleurs du thème"
      description="Palette et couleurs du thème"
      footerContent={<DocFooter />}
    />
  );
}
