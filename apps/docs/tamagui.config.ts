import { defaultConfig } from '@tamagui/config/v5';
import { animations } from '@tamagui/config/v5-css';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
  settings: {
    mediaQueryDefaultActive: defaultConfig.settings.mediaQueryDefaultActive,
    defaultFont: 'body',
    fastSchemeChange: true,
    shouldAddPrefersColorThemes: true,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
