import * as Stories from '@alveole/components/stories';
import { DocFooter, UIKitTopBar, toStoryModules, type StorybookModule, type UIKitTopBarItem } from '@alveole/storybook';

export { DocFooter };
export const storyList = toStoryModules(Stories) as StorybookModule[];

type ActiveKey = 'components' | 'colors' | 'typography' | 'css-variables' | 'constants' | 'philosophy';

const NAV_ITEMS: (UIKitTopBarItem & { key: ActiveKey })[] = [
  { key: 'components', label: 'Composants', href: '/' },
  { key: 'colors', label: 'Couleurs', href: '/theme/colors' },
  { key: 'typography', label: 'Typographies', href: '/theme/typographies' },
  { key: 'css-variables', label: 'Variables CSS', href: '/theme/css-variables' },
  { key: 'constants', label: 'Constantes', href: '/constants' },
  { key: 'philosophy', label: 'Philosophie', href: '/philosophy' },
];

export const useUIKitTopBar = (activeKey: ActiveKey) => <UIKitTopBar activeKey={activeKey} items={NAV_ITEMS} />;
