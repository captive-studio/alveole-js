import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './DragAndDropFile.styles';

test('utilise le rayon de bordure de l echelle du theme sur la zone de depot', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.container.borderRadius).toBe('var(--radius-lg)');
});

// La valeur d origine (12) n a pas de palier exact dans l echelle actuelle (sm=4, md=6, lg=10) :
// `lg` est le plus proche disponible. Primer (`large`=12) et Atlassian (`xlarge`=12) ont un
// palier a cette valeur exacte, absent ici - dette documentee, pas traitee par ce chantier.
test('utilise le rayon de bordure de l echelle du theme sur l icone', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.icon.borderRadius).toBe('var(--radius-lg)');
});
