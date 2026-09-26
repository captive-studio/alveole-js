import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Tabs.styles';

// La bague est desormais posee par le CSS du theme, et `outline` epouse le `border-radius`
// de l'element qu'il entoure. Le rayon doit donc vivre sur l'onglet au repos, sinon la bague
// est un rectangle sec autour d'une pastille arrondie.
//
// Les coins hauts seulement : le souligne de l'onglet actif est le `border-bottom` de ce meme
// element. Arrondi, il cesse d'etre le trait droit pleine largeur de Primer et se recourbe en
// moignon aux extremites - constate a l'ecran avant d'etre corrige ici.
test('arrondit les coins hauts de l onglet, jamais ceux qui portent le souligne', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({
    haut: result.current.tabsTab.borderTopLeftRadius,
    clefsDeRayon: Object.keys(result.current.tabsTab)
      .filter(clef => clef.includes('Radius'))
      .sort(),
  }).toEqual({
    haut: 'var(--radius-md)',
    clefsDeRayon: ['borderTopLeftRadius', 'borderTopRightRadius'],
  });
});
