import { renderHook } from '@testing-library/react-native';
import { useStyles } from './Tabs.styles';

// A '025'/'050', l'onglet inactif tombait sur la hauteur du controle sm (28) : a cote d'un
// bouton md il se lisait comme un cran plus petit que les autres commandes de la page.
// `control('md')` (desktop) vaut paddingInline 12, ce qui donne aussi la hauteur 32 une fois
// ajoute a la ligne de texte SM (20) : 6 + 20 + 6. La hauteur rendue, elle, se mesure dans le
// navigateur (apps/docs/e2e/tabs.spec.ts).
it('pose l onglet au gabarit d un bouton tertiaire md', async () => {
  const { result } = await renderHook(() => useStyles());
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = result.current.wrapper;

  expect({ paddingLeft, paddingRight, paddingTop, paddingBottom }).toEqual({
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  });
});
