import { ThemeProvider } from '@alveole/theme';
import { config } from '@tamagui/config/v3';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

// Pendant du helper natif, pour les variantes `.web.tsx` : rendu dans le DOM via
// @testing-library/react. Contrairement au natif, le thème n'est pas simulé mais monté
// pour de vrai — le mock de `@alveole/theme` ne s'applique pas dans ce projet, et un
// composant web rendu avec son vrai thème est de toute façon plus proche du réel.
// `loader={false}` court-circuite l'écran d'attente du chargement des polices, et
// `staticCSS` évite l'injection de CSS global, inutile ici.
const TestProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider loader={false} staticCSS>
    <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
