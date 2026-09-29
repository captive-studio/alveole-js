import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useTheme } from '@alveole/theme';
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

// En 16, les options parlaient plus fort que le champ et le panneau paraissait grossier : Primer
// et Atlassian ecrivent leurs options en 14, comme le corps de texte courant.
test('ecrit les options en corps de texte SM', () => {
  const { result } = renderHookOnDesktop(() => ({ styles: useStyles(), theme: useTheme() }));

  expect(result.current.styles.itemLabel.fontSize).toBe(
    result.current.theme.text['Corps de texte'].SM.Regular.fontSize,
  );
});

// A 4, la bande de l'option active paraissait anguleuse face au champ, arrondi a 6 : Primer
// donne a ses options le meme rayon moyen que ses controles.
test('arrondit la bande de l option active au rayon moyen', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.band.borderRadius).toBe('var(--radius-md)');
});

// SemiBold ne porte aucune intention : Primer ecrit ses en-tetes de groupe en gras, le cran Bold.
test('ecrit les en-tetes de groupe en XS gras', () => {
  const { result } = renderHookOnDesktop(() => ({ styles: useStyles(), theme: useTheme() }));

  expect(result.current.styles.groupHeader.fontWeight).toBe(
    result.current.theme.text['Corps de texte'].XS.Bold.fontWeight,
  );
});

// Les capitales criaient plus fort que les options qu'elles rangent : Primer ne les emploie pas.
test('n ecrit pas les en-tetes de groupe en capitales', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.groupHeader).not.toHaveProperty('textTransform');
});

// A 24, l'en-tete depassait le contenu des options, qui commence a 16 (retrait 8 + bande 8) :
// comme chez Primer, il s'aligne dessus.
test('aligne les en-tetes de groupe sur le contenu des options', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({ gauche: result.current.groupHeader.paddingLeft, droite: result.current.groupHeader.paddingRight }).toEqual({
    gauche: 'var(--spacing-2w)',
    droite: 'var(--spacing-2w)',
  });
});
