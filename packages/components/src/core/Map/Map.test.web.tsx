import { renderHookOnDesktop, renderWeb } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Map.styles';
import { Map } from './Map.web';

// La carte reelle charge l'API Google au montage : seul son conteneur nous interesse ici.
jest.mock('./useGoogleMap', () => ({ useGoogleMap: () => ({ containerRef: { current: null } }) }));

test('utilise le rayon de bordure de l echelle du theme sur le conteneur de la carte', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.container.borderRadius).toBe('var(--radius-lg)');
});

// La story declare `Map.styles` en `styleFn`, donc le catalogue l'affiche comme les styles du
// composant : la carte web posait pourtant son propre style en ligne, d'un rayon different.
test('rend la carte avec la table de styles que le catalogue documente', () => {
  const { container } = renderWeb(<Map markers={[]} />);

  expect(getComputedStyle(container.querySelector('box')!).borderRadius).toBe('var(--radius-lg)');
});
