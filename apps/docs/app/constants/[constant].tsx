import { ThemeConstantDetailScreen, findConstantByName } from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { useLocalSearchParams } from 'expo-router';
import { DocFooter, useUIKitColumn } from '../../components/uiKitNavigation';

export function generateStaticParams(): { constant: string }[] {
  return Object.keys(ThemeConstants).map(constant => ({ constant }));
}

export default function ConstantDetailRoute() {
  const { constant } = useLocalSearchParams<{ constant: string }>();
  const constantEntry = findConstantByName(ThemeConstants, constant);
  const column = useUIKitColumn();

  return constantEntry ? (
    <ThemeConstantDetailScreen
      sidebar={column}
      footerContent={<DocFooter />}
      name={constantEntry[0]}
      value={constantEntry[1]}
    />
  ) : (
    <ThemeConstantDetailScreen
      sidebar={column}
      footerContent={<DocFooter />}
      name="Constante introuvable"
      value="Constante introuvable"
    />
  );
}
