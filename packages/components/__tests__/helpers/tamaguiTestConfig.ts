import { defaultConfig } from '@tamagui/config/v5';
import { animations } from '@tamagui/config/v5-css';
import { createTamagui } from 'tamagui';

// Config v5 figée, seule à survivre en Tamagui v3. Elle n'embarque plus de driver
// d'animation : on déclare celui des composants (`quicker`, `quickest`, `medium`),
// mêmes courbes CSS que la v3. Ses réglages stricts (`onlyAllowShorthands`, valeurs de style
// restreintes) sont écartés au profit de ceux de la v3, pour des rendus identiques.
export const tamaguiTestConfig = createTamagui({
  ...defaultConfig,
  animations,
  settings: {
    mediaQueryDefaultActive: defaultConfig.settings.mediaQueryDefaultActive,
    defaultFont: 'body',
    fastSchemeChange: true,
    shouldAddPrefersColorThemes: true,
  },
});
