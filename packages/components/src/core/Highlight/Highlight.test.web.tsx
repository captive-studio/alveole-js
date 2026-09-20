import { renderWeb } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Highlight } from './Highlight';

// La zone de code est rendue focalisable exprès, pour que la fin d'une ligne longue soit
// atteignable au clavier (règle `scrollable-region-focusable` d'axe). Mais elle n'affichait
// que le contour `1px auto` du navigateur : le kit rendait volontairement un arrêt clavier
// puis le laissait se signaler par autre chose que sa bague.
test('demande la bague de focus au theme sur la zone defilante', () => {
  const { container } = renderWeb(<Highlight language="typescript">{'const a = 1;'}</Highlight>);

  expect(container.querySelector(`[${FOCUS_ATTRIBUTE}]`)).not.toBeNull();
});
