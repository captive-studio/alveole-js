import { ThemeCSSVariablesScreen } from '@alveole/storybook';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export default function ThemeCSSVariablesRoute() {
  const column = useUIKitColumn();

  return <ThemeCSSVariablesScreen sidebar={column} footerContent={<DocFooter />} />;
}
