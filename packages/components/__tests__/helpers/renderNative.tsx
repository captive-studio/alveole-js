import { render, RenderOptions } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { ReactElement } from 'react';
import { TamaguiTestProvider } from './TamaguiTestProvider';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TamaguiTestProvider, ...options });

// Depuis expo-router 58, naviguer hors d'`ExpoRoot` lève une erreur : un lien interne se monte
// sur la page d'accueil d'un vrai routeur, à côté d'une page vide à l'adresse visée.
const renderInRouter = (ui: ReactElement, destination: string) =>
  renderRouter({ index: () => ui, [destination.slice(1)]: () => null }, { wrapper: TamaguiTestProvider });

export * from '@testing-library/react-native';
export { customRender as renderNative, renderInRouter as renderNativeInRouter };
