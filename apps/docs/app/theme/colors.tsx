import { ThemePaletteScreen } from '@alveole/storybook';
import { CustomPalette } from '@alveole/theme';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('Couleurs du thème', 'Palette et couleurs du thème');

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
