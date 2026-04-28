import { ThemePaletteScreen } from '@alveole/storybook';
import { CustomPalette } from '@alveole/theme';
import { useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ThemeColorsRoute() {
  const topBar = useUIKitTopBar('colors');

  return (
    <ThemePaletteScreen
      beforeContent={topBar}
      palette={CustomPalette}
      title="UI Kit - Couleurs du thème"
      description="Palette et couleurs du thème"
    />
  );
}
