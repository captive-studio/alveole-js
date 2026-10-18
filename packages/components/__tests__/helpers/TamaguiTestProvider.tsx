import { PropsWithChildren } from 'react';
import { TamaguiProvider } from 'tamagui';
import { tamaguiTestConfig } from './tamaguiTestConfig';

// Tamagui v2 exige `defaultTheme`. En v1, faute de valeur, le provider retombait sur le premier
// thème de la config, `light` : le nommer ici garde les rendus identiques quelle que soit la
// config chargée.
export const TamaguiTestProvider = ({ children }: PropsWithChildren) => (
  <TamaguiProvider config={tamaguiTestConfig} defaultTheme="light">
    {children}
  </TamaguiProvider>
);
