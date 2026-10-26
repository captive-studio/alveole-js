import { UIKitThemePage } from '@alveole/storybook';
import { useRouter } from 'expo-router';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export const generateMetadata = () => metadonnees('UI Kit - Thème', 'Tokens du thème');

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
