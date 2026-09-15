import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { Button } from './Button';

// getByRole('button') renvoie la vue du Pressable, qui ne porte que les rayons.
// Les styles de variant (fond, paddings, bordures) vivent sur le Box qu'il enveloppe.
const conteneur = (view: RenderResult) => view.root?.queryAll(i => i.type === 'View')[0];

describe('Button', () => {
  it('expose un etat accessible desactive pendant le chargement', async () => {
    const { getByRole } = await renderNative(<Button variant="primary" title="Enregistrer" isLoading />);

    expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
  });

  it('expose l etat deplie quand le bouton ouvre un menu', async () => {
    const { getByRole } = await renderNative(<Button variant="tertiary" title="Filtres" expanded />);

    expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ expanded: true }));
  });

  it('applique le style d appui quand le menu est deplie', async () => {
    const repos = await renderNative(<Button variant="primary" title="Filtres" />);
    const deplie = await renderNative(<Button variant="primary" title="Filtres" expanded />);

    expect(conteneur(deplie)?.props.style.backgroundColor).not.toBe(conteneur(repos)?.props.style.backgroundColor);
  });
});
