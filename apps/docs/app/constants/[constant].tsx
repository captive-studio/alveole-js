import { ThemeConstantDetailScreen, findConstantByName } from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { useLocalSearchParams } from 'expo-router';
import { useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ConstantDetailRoute() {
  const { constant } = useLocalSearchParams<{ constant: string }>();
  const constantEntry = findConstantByName(ThemeConstants, constant);
  const topBar = useUIKitTopBar('constants');

  return constantEntry ? (
    <ThemeConstantDetailScreen beforeContent={topBar} name={constantEntry[0]} value={constantEntry[1]} />
  ) : (
    <ThemeConstantDetailScreen beforeContent={topBar} name="Constante introuvable" value="Constante introuvable" />
  );
}
