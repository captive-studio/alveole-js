import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Map.styles';

// La carte reelle charge l'API Google au montage : seul son conteneur nous interesse ici.
jest.mock('./useGoogleMap', () => ({ useGoogleMap: () => ({ containerRef: { current: null } }) }));

test('utilise le rayon de bordure de l echelle du theme sur le conteneur de la carte', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.container.borderRadius).toBe('var(--radius-lg)');
});
