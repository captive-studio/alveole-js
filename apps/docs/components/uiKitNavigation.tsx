import * as Stories from '@alveole/components/stories';
import { toStoryModules, UIKitTopBar, type StorybookModule } from '@alveole/storybook';
import { useRouter } from 'expo-router';

export const storyList = toStoryModules(Stories) as StorybookModule[];

export const useUIKitTopBar = (activeKey: 'components' | 'colors' | 'typography' | 'constants') => {
  const router = useRouter();

  return (
    <UIKitTopBar
      activeKey={activeKey}
      items={[
        { key: 'components', label: 'Composants', onPress: () => router.replace('/') },
        { key: 'colors', label: 'Couleurs', onPress: () => router.replace('/theme/colors') },
        { key: 'typography', label: 'Typographies', onPress: () => router.replace('/theme/typographies') },
        { key: 'constants', label: 'Constantes', onPress: () => router.replace('/constants') },
      ]}
    />
  );
};
