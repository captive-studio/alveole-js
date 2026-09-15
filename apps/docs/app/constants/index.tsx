import { ThemeConstantsScreen } from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { useRouter } from 'expo-router';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export default function ConstantsRoute() {
  const router = useRouter();
  const column = useUIKitColumn();

  return (
    <ThemeConstantsScreen
      sidebar={column}
      footerContent={<DocFooter />}
      constants={ThemeConstants}
      title="UI Kit - Constantes"
      description="Constantes exposées par le thème"
      onSelectConstant={({ name }) => router.push(`/constants/${encodeURIComponent(name)}`)}
    />
  );
}
