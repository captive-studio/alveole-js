import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { selectItemStyle } from './selectItemStyle';
import { useStyles } from './SelectList.styles';

const COULEURS = { texte: 'texte', texteDesactive: 'desactive', coche: 'coche' };

// En multiple, la case cochee dit deja la selection : un fond en plus empilait des bandes grises.
test('ne donne pas de fond a une option cochee en multiple', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  const aspect = selectItemStyle(result.current, COULEURS, { selected: true });

  expect(aspect.band.backgroundColor).toBeUndefined();
});

// En simple, la selection se confondait avec l'option active : meme fond gris. Comme chez
// Primer, la coche seule dit la selection, le fond ne suit que l'option active.
test('ne donne pas de fond a l option retenue en selection simple', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  const aspect = selectItemStyle(result.current, COULEURS, { selected: true });

  expect(aspect.band.backgroundColor).toBeUndefined();
});

// La gouttiere de 16 logeait la barre de selection, remplacee par la coche : comme chez Primer,
// il ne reste qu'un retrait de 8 autour de la bande.
test('ne garde qu un retrait de 8 autour de la bande', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({ gauche: result.current.item.paddingLeft, droite: result.current.item.paddingRight }).toEqual({
    gauche: 'var(--spacing-1w)',
    droite: 'var(--spacing-1w)',
  });
});
