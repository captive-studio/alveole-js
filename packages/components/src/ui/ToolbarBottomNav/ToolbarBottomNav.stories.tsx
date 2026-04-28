import { Story } from '../../type/Story';
import { ToolbarBottomNav } from './index';
import { useStyles } from './ToolbarBottomNav.styles';

export default {
  title: 'ToolbarBottomNav',
  tags: ['ui'],
  experimental: false,
  description: 'Navigation bottom de type TabsExpo. A utiliser dans les _layout.',
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1880-852&t=baZKFA9BpkeQGeZm-4',
  component: ToolbarBottomNav,
  styleFn: useStyles,
} satisfies Story;

const codeExample = `<ToolbarBottomNav>
  // Vers index.tsx
  <ToolbarBottomNav.Screen name="home" options={{ tabBarLabel: 'Home', tabBarIcon: ToolbarBottomNav.Icon('home') }} />
  // Vers list.tsx
  <ToolbarBottomNav.Screen name="list" options={{ tabBarLabel: 'Liste', tabBarIcon: ToolbarBottomNav.Icon('all-inbox') }} />
</ToolbarBottomNav>`;

export const ExampleUsage = () => codeExample;

export * as Sources from './ToolbarBottomNav.stories.sources';
