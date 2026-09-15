import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { CustomPalette, RadiusList } from '@alveole/theme';
import { StyleSheet } from 'react-native';
import { Highlight } from './Highlight';

// Le fond de la surface se lit sur le conteneur de defilement, pas ailleurs dans l'arbre :
// le theme de coloration pose aussi des fonds translucides sur certains jetons de texte.
const surface = (view: RenderResult) => {
  const conteneur = view.root?.queryAll(node => node.props?.contentContainerStyle != null)[0];

  return StyleSheet.flatten(conteneur?.props.contentContainerStyle);
};

const fond = (view: RenderResult) => surface(view)?.backgroundColor;

describe('Highlight', () => {
  it('rend deux langages sur le meme fond', async () => {
    const json = await renderNative(<Highlight language="json">{'{ "a": 1 }'}</Highlight>);
    const tsx = await renderNative(<Highlight language="tsx">{'<Box />'}</Highlight>);

    expect(fond(json)).toBe(fond(tsx));
  });

  it('pose la surface du design system, pas celle du theme de coloration', async () => {
    const view = await renderNative(<Highlight language="tsx">{'<Box />'}</Highlight>);

    expect(fond(view)).toBe(CustomPalette.light.background['alt-grey']);
  });

  it('arrondit la surface sur un rayon du theme', async () => {
    const view = await renderNative(<Highlight language="tsx">{'<Box />'}</Highlight>);

    expect(surface(view)?.borderRadius).toBe(RadiusList.md);
  });

  it('ne laisse aucun fond sur les jetons de code', async () => {
    const view = await renderNative(<Highlight language="tsx">{'<Box display="flex" />'}</Highlight>);

    const fonds = (view.root?.queryAll(node => node.type === 'Text') ?? [])
      .map(node => StyleSheet.flatten(node.props.style)?.backgroundColor)
      .filter(Boolean);

    expect(fonds).toEqual([]);
  });

  // Le bloc ne suppose pas la couleur derriere lui : pose sur une surface de meme gris, il
  // disparaitrait sans ce lisere.
  it('borde la surface pour la detacher de son support', async () => {
    const view = await renderNative(<Highlight language="tsx">{'<Box />'}</Highlight>);

    expect(surface(view)).toMatchObject({
      borderWidth: 1,
      borderColor: CustomPalette.light.border['default-grey'],
    });
  });
});
