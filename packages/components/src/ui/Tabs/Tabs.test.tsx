import { fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { Tabs } from './Tabs';

// Hors d'un arbre expo-router (comme ici : `renderNative` ne pose aucun Root Layout), l'Anchor
// Sync doit rester inactive sans planter (ADR 0022) : `router.setParams` leve tant qu'aucune
// navigation n'est montee, et `onChange` doit continuer de marcher normalement a cote.
it('ne plante pas au clic quand urlAnchorPrefix est actif hors d un arbre expo-router', async () => {
  const onChange = jest.fn();
  const view = await renderNative(
    <Tabs
      defaultValue="a"
      urlAnchorPrefix="story"
      onChange={onChange}
      tabs={[
        { label: 'Onglet 1', value: 'a', content: <></> },
        { label: 'Onglet 2', value: 'b', content: <></> },
      ]}
    />,
  );

  fireEvent.press(view.getByText('Onglet 2').parent!.parent!);

  expect(onChange).toHaveBeenCalledWith(1);
});
