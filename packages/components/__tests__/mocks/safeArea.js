/* global jest */

// `useSafeAreaInsets` lève hors d'un appareil réel, ce qui rend BottomSheet — et donc
// Select — impossible à monter. On mocke les hooks plutôt que d'envelopper l'arbre dans
// un SafeAreaProvider : le provider insère une View supplémentaire, et les tests qui
// désignent un nœud par sa position dans l'arbre viseraient alors le mauvais élément.
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
