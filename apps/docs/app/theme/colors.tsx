import { ThemePaletteScreen } from '@alveole/storybook';
import { CustomPalette } from '@alveole/theme';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export default function ThemeColorsRoute() {
  const column = useUIKitColumn();

  return (
    <ThemePaletteScreen
      palette={CustomPalette}
      title="Couleurs du thème"
      description="Palette et couleurs du thème"
      sidebar={column}
      footerContent={<DocFooter />}
    />
  );
}
