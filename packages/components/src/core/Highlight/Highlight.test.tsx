import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { contrastRatio, CustomPalette, MonospaceFont, RadiusList } from '@alveole/theme';
import { StyleSheet } from 'react-native';
import { Highlight } from './Highlight';

// Le fond de la surface se lit sur le conteneur de defilement, pas ailleurs dans l'arbre :
// le theme de coloration pose aussi des fonds translucides sur certains jetons de texte.
const surface = (view: RenderResult) => {
  const conteneur = view.root?.queryAll(node => node.props?.contentContainerStyle != null)[0];

  return StyleSheet.flatten(conteneur?.props.contentContainerStyle);
};

const fond = (view: RenderResult) => surface(view)?.backgroundColor;

const premierTexte = (view: RenderResult) => {
  const noeud = (view.root?.queryAll(node => node.type === 'Text') ?? [])[0];

  return StyleSheet.flatten(noeud?.props.style);
};

const SEUIL_AA = 4.5;

const EXTRAIT_VARIE = `// un commentaire
export const Titre = () => <Box display="flex" nombre={12}>{'une chaine'}</Box>;`;

describe('Highlight', () => {
  // Les palettes de coloration sont ecrites pour des editeurs, pas pour WCAG : celle de
  // ghcolors descendait a 2,56 sur nos noms de proprietes. Le cliquet du catalogue est a
  // zero violation, donc aucune teinte ne peut rester sous le seuil.
  it('ne laisse aucune couleur de jeton sous le seuil de contraste', async () => {
    const view = await renderNative(<Highlight language="tsx">{EXTRAIT_VARIE}</Highlight>);

    const fond = CustomPalette.light.background['alt-grey'];
    const couleurs = (view.root?.queryAll(node => node.type === 'Text') ?? [])
      .map(node => StyleSheet.flatten(node.props.style)?.color)
      .filter((couleur): couleur is string => typeof couleur === 'string');

    expect(couleurs.filter(couleur => contrastRatio(couleur, fond) < SEUIL_AA)).toEqual([]);
  });

  // Une source rendue en police proportionnelle ne laisse plus rien s'aligner : ni les
  // indentations, ni les colonnes d'attributs.
  it('rend le code en police a chasse fixe', async () => {
    const view = await renderNative(<Highlight language="tsx">{'<Box display="flex" />'}</Highlight>);

    expect(premierTexte(view)?.fontFamily).toBe(MonospaceFont.fontFamily);
  });

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

  // Compose dans un cadre qui le contient deja, le lisere ferait une seconde bordure
  // emboitee : c'est l'appelant qui delimite, le bloc n'a plus a le faire.
  it('renonce a son lisere quand il est compose dans un cadre', async () => {
    const view = await renderNative(
      <Highlight language="tsx" variant="embedded">
        {'<Box />'}
      </Highlight>,
    );

    expect(surface(view)?.borderWidth).toBeFalsy();
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
