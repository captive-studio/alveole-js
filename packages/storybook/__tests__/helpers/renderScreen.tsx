import { ThemeProvider } from '@alveole/theme';
import { config } from '@tamagui/config/v3';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

// Rendu dans le DOM via react-native-web, comme le projet web de `@alveole/components` : le
// catalogue est une application web, et les primitives React Native refuseraient du texte
// que le navigateur accepte. Le thème n'est pas simulé mais monté pour de vrai, la mise en
// page des écrans dépendant des tokens réels. `loader={false}` court-circuite l'écran
// d'attente du chargement des polices, qui n'aboutit jamais hors navigateur.
const TestProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider loader={false} staticCSS>
    <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
  </ThemeProvider>
);

// react-native-web calcule ses dimensions avec `document.documentElement.clientWidth`, que
// jsdom laisse à 0 faute de moteur de rendu : sans cette couture le thème retombe en
// variante mobile, et aucune branche bureau du catalogue n'est atteignable.
const resizeTo = (width: number, height: number) => {
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
  Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  resizeTo(1440, 900);

  return render(ui, { wrapper: TestProvider, ...options });
};

export * from '@testing-library/react';
export { customRender as renderScreen };
