import { ThemeNuancesPrototype } from '@alveole/storybook';
import { router, useLocalSearchParams } from 'expo-router';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () =>
  metadonnees('Nuances', 'Les échelles de couleurs du thème et les tokens qui citent chaque nuance');

// PROTOTYPE : trois dessins commutes par ?variant=A|B|C (branche prototype/nuances-visuel).
export default function ThemeNuancesRoute() {
  const { variant } = useLocalSearchParams<{ variant?: string }>();
  return (
    <ThemeNuancesPrototype
      variant={variant}
      aller={cle => router.setParams({ variant: cle })}
      footerContent={<DocFooter />}
    />
  );
}
