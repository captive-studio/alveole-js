import { UIKitThemePage } from '@alveole/storybook';
import { useRouter } from 'expo-router';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export default function ThemeRoute() {
  const router = useRouter();
  const column = useUIKitColumn();

  return (
    <UIKitThemePage
      sidebar={column}
      footerContent={<DocFooter />}
      onOpenColors={() => router.push('/theme/colors')}
      onOpenTypography={() => router.push('/theme/typographies')}
      onOpenCSSVariables={() => router.push('/theme/css-variables')}
    />
  );
}
