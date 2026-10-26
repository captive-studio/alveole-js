import { ThemeConstantDetailScreen, findConstantByName } from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { useLocalSearchParams } from 'expo-router';
import type { GenerateMetadataFunction } from 'expo-router/server';
import { metadonnees } from '../../components/metadonnees';
import { DocFooter } from '../../components/uiKitNavigation';

export function generateStaticParams(): { constant: string }[] {
  return Object.keys(ThemeConstants).map(constant => ({ constant }));
}

export const generateMetadata: GenerateMetadataFunction = (_, { constant }) =>
  metadonnees(String(constant), String(constant));

export default function ConstantDetailRoute() {
  const { constant } = useLocalSearchParams<{ constant: string }>();
  const constantEntry = findConstantByName(ThemeConstants, constant);

  return constantEntry ? (
    <ThemeConstantDetailScreen footerContent={<DocFooter />} name={constantEntry[0]} value={constantEntry[1]} />
  ) : (
    <ThemeConstantDetailScreen
      footerContent={<DocFooter />}
      name="Constante introuvable"
      value="Constante introuvable"
    />
  );
}
