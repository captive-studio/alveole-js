import { config } from '@tamagui/config/v3';
import { PropsWithChildren } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

// Tamagui v2 exige `defaultTheme`. En v1, faute de valeur, le provider retombe sur le premier
// thème de la config, `light` pour la v3 : le nommer ici garde les rendus identiques et
// prépare la bascule.
export const TamaguiTestProvider = ({ children }: PropsWithChildren) => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
    {children}
  </TamaguiProvider>
);
