import { UIKitThemePage } from '@alveole/storybook';
import { useRouter } from 'expo-router';
import { DocFooter } from '../../components/uiKitNavigation';

export default function ThemeRoute() {
  const router = useRouter();

  return (
    <UIKitThemePage
      footerContent={<DocFooter />}
      onOpenColors={() => router.push('/theme/colors')}
      onOpenTypography={() => router.push('/theme/typographies')}
      onOpenCSSVariables={() => router.push('/theme/css-variables')}
    />
  );
}
