// Le catalogue importe `@alveole/components` par son index, qui charge tous les composants.
// Deux d'entre eux réclament un environnement que jsdom ne fournit pas, alors qu'aucun écran
// testé ici ne les rend.

jest.mock('expo-application', () => ({ nativeBuildVersion: '42' }));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { version: '1.2.3' }, executionEnvironment: 'standalone' },
}));

// `Page` s'abonne au focus de l'écran, ce qui suppose un contexte de navigation monté par
// l'application. Le catalogue en a un en vrai ; un test qui rend un écran seul n'en a pas,
// et cet abonnement n'est pas ce qu'on vérifie ici.
jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');

  return { ...actual, useFocusEffect: () => {}, usePathname: () => '/', useNavigation: () => ({}) };
});

// `useSafeAreaInsets` lève hors d'un appareil réel. On mocke les hooks plutôt que
// d'envelopper l'arbre dans un SafeAreaProvider : le provider insère une View
// supplémentaire, et les assertions qui remontent la chaîne des parents compteraient un
// cadre de plus.
jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');

  const insets = { top: 47, left: 0, right: 0, bottom: 34 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };

  return {
    ...actual,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: { insets, frame },
  };
});

// jsdom n'implémente pas matchMedia, dont Tamagui se sert pour résoudre ses media queries au
// premier rendu. Sans ce relais, toute suite échoue avant le premier test.
window.matchMedia =
  window.matchMedia ||
  (query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));

// Même lacune pour ResizeObserver, dont Tamagui se sert pour mesurer l'onglet actif et y
// poser son indicateur. L'observateur ne mesure rien ici : jsdom ne met de toute façon aucune
// dimension dans le layout, et ce qui est vérifié en test est le style, pas la mesure.
window.ResizeObserver =
  window.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
