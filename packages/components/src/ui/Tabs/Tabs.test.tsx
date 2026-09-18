import { renderNative } from '@/__tests__/helpers/renderNative';
import { Tabs } from './Tabs';

// A '025'/'050', l'onglet inactif tombait sur la hauteur du controle sm (28) : a cote d'un
// bouton md il se lisait comme un cran plus petit que les autres commandes de la page.
// `control('md')` (desktop) vaut paddingInline 12, ce qui donne aussi la hauteur 32 une fois
// ajoute a la ligne de texte SM (20) : 6 + 20 + 6.
it('pose l onglet inactif au gabarit d un bouton tertiaire md', async () => {
  const view = await renderNative(
    <Tabs
      defaultValue="a"
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  const wrapper = view.getByText('Onglet 2').parent;

  expect(wrapper?.props.style).toEqual(
    expect.objectContaining({ paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }),
  );
});
