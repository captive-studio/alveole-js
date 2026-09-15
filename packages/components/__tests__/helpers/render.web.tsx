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

// react-native-web calcule ses dimensions avec `document.documentElement.clientWidth`, que
// jsdom laisse à 0 faute de moteur de rendu : `useWindowDimensions` rend donc une largeur
// nulle, et le thème retombe en variante mobile. Sans cette couture, aucune branche desktop
// d'un composant n'est atteignable par un test.
const resizeTo = (width: number, height: number) => {
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
  Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
};

/** Rend l'arbre en variante `desktop`. Par défaut les tests web rendent en `mobile`. */
const renderOnDesktop = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  resizeTo(1440, 900);

  return customRender(ui, options);
};

// `resizeTo` écrit sur `document.documentElement`, que jsdom partage entre les tests d'un
// même fichier : après un `renderOnDesktop`, la largeur reste à 1440 et un rendu « par
// défaut » est en réalité un rendu bureau. Un test mobile qui suit un test bureau passait
// donc sans rien vérifier. D'où cette variante explicite, qui repose la largeur.
/** Rend l'arbre en variante `mobile`, quelle que soit la largeur laissée par un test précédent. */
const renderOnMobile = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  resizeTo(390, 844);

  return customRender(ui, options);
};

// Réexports explicites plutôt qu'un `export *` : la bibliothèque exporte elle-même un
// `render`, que l'étoile mettrait en concurrence avec celui-ci.
export { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
export { customRender as render, renderOnDesktop, renderOnMobile };
