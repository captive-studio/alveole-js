import { fireEvent, renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { Tag } from './Tag';

// Le libelle est le seul Text de l etiquette, et c est lui qui porte la pastille :
// `Tag` rend un `Typography` stylé, pas une boite autour d un texte.
const pastille = (view: RenderResult) => view.root?.queryAll(i => i.type === 'Text')[0];

const etiquette = (props: Partial<Parameters<typeof Tag>[0]> = {}) =>
  renderNative(
    <Tag size="sm" {...props}>
      Brouillon
    </Tag>,
  );

// La maquette refaite pose une bordure autour de la pastille. Sans elle, une etiquette au
// repos et une etiquette selectionnee ne se distinguent que par la couleur du texte : la
// bordure est le support du contraste que la selection viendra foncer. Son epaisseur est une
// valeur de maquette, elle est donc figee ; sa couleur ne l est pas, seules ses variations
// comptent (tests suivants).
it('cerne la pastille d une bordure d un pixel', async () => {
  const view = await etiquette();

  expect(pastille(view)?.props.style.borderWidth).toBe(1);
});

// Premier des deux signaux de l ADR 0014. La couleur exacte n est pas figee : ce qui doit
// tenir, c est que la selection se voie a la bordure. Une assertion litterale casserait au
// premier ajustement de palette sans qu aucun comportement n ait change.
it('change la couleur de la bordure quand l etiquette est selectionnee', async () => {
  const repos = await etiquette();
  const selectionnee = await etiquette({ selected: true });

  expect(pastille(selectionnee)?.props.style.borderColor).not.toBe(pastille(repos)?.props.style.borderColor);
});

// La bordure seule ne suffit pas : un pixel de gris a peine plus fonce se remarque mal sur
// une liste de filtres. Le libelle bouge aussi.
it('change la couleur du libelle quand l etiquette est selectionnee', async () => {
  const repos = await etiquette();
  const selectionnee = await etiquette({ selected: true });

  expect(pastille(selectionnee)?.props.style.color).not.toBe(pastille(repos)?.props.style.color);
});

// `closable` est optionnelle et vaut faux par defaut : c'est ce qui preserve les etiquettes
// deja en place, qui ne doivent pas se mettre a afficher une croix parce que la version a
// change. Le defaut est donc un comportement a part entiere, pas une absence.
it('n affiche aucune croix tant que l etiquette n est pas fermable', async () => {
  const view = await etiquette();

  expect(view.queryByRole('button')).toBeNull();
});

// La croix est un bouton, pas une icone decorative : un lecteur d'ecran doit l'annoncer
// comme tel. Meme exigence que le bouton de fermeture de Toast, dont elle reprend le montage.
it('annonce la croix comme un bouton', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getByRole('button').props.accessibilityRole).toBe('button');
});

// Le seul effet que la croix doit produire : prevenir l'appelant. Le composant ne retire
// pas l'etiquette lui-meme - c'est la liste qui la porte qui decide de ce qui disparait.
it('previent l appelant quand la croix est activee', async () => {
  const onClose = jest.fn();
  const view = await etiquette({ closable: true, onClose });

  fireEvent.press(view.getByRole('button'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

// Chez Primer, le bouton de suppression fait toute la hauteur du token : son fond de survol
// touche les bords de la pastille au lieu de flotter au milieu, et la surface cliquable est
// aussi grande que possible. La pastille sm fait 20 px, la croix aussi.
it('donne a la croix toute la hauteur de la pastille en sm', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getByRole('button').props.style).toEqual(expect.objectContaining({ width: 20, height: 20 }));
});

// Pendant du test de survol cote web : la croix suit aussi la selection, et elle doit le
// faire en natif, ou `currentColor` n'existe pas. Sans couleur explicite, la croix resterait
// du noir par defaut de l'icone, identique dans les quatre etats.
it('fonce la croix quand l etiquette est selectionnee', async () => {
  const repos = await etiquette({ closable: true });
  const selectionnee = await etiquette({ closable: true, selected: true });
  // Le trait se lit sur la vue SVG, pas sur les `RNSVGPath` : ceux-ci portent un objet de
  // couleur, jamais egal a un autre par identite, et la comparaison passerait toujours.
  const trait = (view: RenderResult) => view.root?.queryAll(i => i.type === 'RNSVGSvgView')[0]?.props.stroke;

  expect(typeof trait(repos)).toBe('string');
  expect(trait(selectionnee)).not.toBe(trait(repos));
});

// L'icone est optionnelle et n'existe que si on la demande : une etiquette sans `icon` ne
// doit rien rendre de plus, sous peine de decaler toutes les etiquettes deja en place.
it('n affiche aucune icone tant qu on ne lui en donne pas', async () => {
  const view = await etiquette();

  expect(view.root?.queryAll(i => i.type === 'RNSVGSvgView')).toHaveLength(0);
});

// L'icone se place avant le libelle : c'est elle qui qualifie l'etiquette au premier coup
// d'oeil, la lire apres le texte n'aurait pas d'interet.
it('place l icone demandee avant le libelle', async () => {
  const view = await etiquette({ icon: 'Check' });
  // Le libelle est le seul enfant textuel de la pastille : tout ce qui le precede dans la
  // liste des enfants est rendu avant lui. Comparer des types de noeuds ne dirait rien de
  // l'ordre, l'icone etant imbriquee dans la pastille comme le texte.
  const enfants = pastille(view)?.children ?? [];

  expect(enfants.findIndex(enfant => typeof enfant === 'string')).toBe(1);
});

// Gabarits de maquette, donc valeurs figees. L'ecart avant le libelle suit Primer, qui le
// porte de 4 a 6 px sur son grand cran (`.LargeLeadingVisual { margin-right: 6px }`) :
// notre sm vaut leur medium, notre md leur large. L'ecart vit sur l'icone et non sur le
// texte, pour qu'une etiquette sans icone n'herite d'aucun espace devant elle.
it.each([
  ['sm', 4],
  ['md', 6],
] as const)('decolle l icone du libelle en %s', async (size, attendu) => {
  const view = await renderNative(
    <Tag size={size} icon="Check">
      Brouillon
    </Tag>,
  );
  const enveloppe = pastille(view)?.children[0];

  expect(typeof enveloppe === 'string' ? undefined : enveloppe?.props.style.marginRight).toBe(attendu);
});

// L'icone elle-meme reste a 16 px dans les deux crans : Primer laisse son `leadingVisual`
// au composant appelant et n'en impose pas la taille, seul l'ecart change.
it('taille l icone du libelle a 16 pixels', async () => {
  const view = await etiquette({ icon: 'Check' });

  expect(view.root?.queryAll(i => i.type === 'RNSVGSvgView')[0]?.props.width).toBe(16);
});

// Pendant du gabarit sm : la pastille md fait 24 px, la croix aussi.
it('donne a la croix toute la hauteur de la pastille en md', async () => {
  const view = await renderNative(
    <Tag size="md" closable>
      Brouillon
    </Tag>,
  );

  expect(view.getByRole('button').props.style).toEqual(expect.objectContaining({ width: 24, height: 24 }));
});

// Le traitement d'etat ne depend pas du cran : md et sm ne different que par la typographie
// et les gabarits. Ce test empeche qu'une future retouche n'introduise une regle de couleur
// propre a une taille, ce que ni la maquette ni l'ADR 0014 ne prevoient.
it.each(['sm', 'md'] as const)('applique la selection de la meme facon en %s', async size => {
  const repos = await renderNative(<Tag size={size}>Brouillon</Tag>);
  const selectionnee = await renderNative(
    <Tag size={size} selected>
      Brouillon
    </Tag>,
  );
  const teinte = (view: RenderResult) => {
    const { color, borderColor } = pastille(view)?.props.style ?? {};

    return { color, borderColor };
  };

  expect(teinte(repos).color).not.toBe(teinte(selectionnee).color);
  expect(teinte(repos).borderColor).not.toBe(teinte(selectionnee).borderColor);
});

// Chez Primer, une pastille qui porte une croix perd son retrait droit
// (`[data-is-remove-btn='true'] { padding-right: 0 }`) : la croix faisant toute la hauteur,
// le retrait la repousserait vers l'interieur et rendrait la pastille asymetrique.
it('supprime le retrait droit de la pastille quand elle porte une croix', async () => {
  const fermable = await etiquette({ closable: true });
  const simple = await etiquette();

  expect({
    fermable: pastille(fermable)?.props.style.paddingRight,
    simple: pastille(simple)?.props.style.paddingRight,
  }).toEqual({ fermable: 0, simple: 6 });
});

// La croix est posee dans la boite de contenu de la pastille, donc a un pixel de son bord
// exterieur : l'epaisseur de la bordure. Mesure au navigateur avant correction : bord droit
// de la croix a -1 px du bord droit de la pastille. Primer compense par le meme decalage
// (`translate(borderOffset, -borderOffset)` dans son bouton de suppression). Un `transform`
// plutot qu'une marge : il ne rentre pas dans le calcul de la largeur de la pastille.
it('ramene la croix a fleur du bord de la pastille', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getByRole('button').props.style.transform).toBe('translateX(1px)');
});

// Primer : `XIcon size={size === 'small' || size === 'medium' ? 12 : 16}`. Notre cran sm
// correspond a leur `medium` (pastille de 20 px) et notre md a leur `large` (24 px) : 12 px
// d'icone en sm, 16 en md. Une icone de 12 px dans un cercle de 24 px paraitrait perdue.
it.each([
  ['sm', 12],
  ['md', 16],
] as const)('taille la croix a %s avec une icone de %i pixels', async (size, attendu) => {
  const view = await renderNative(
    <Tag size={size} closable>
      Brouillon
    </Tag>,
  );

  expect(view.root?.queryAll(i => i.type === 'RNSVGSvgView')[0]?.props.width).toBe(attendu);
});

// Primer decolle la croix du libelle : `.TokenButton { margin-left: var(--base-size-4) }`,
// porte a `--base-size-6` sur ses crans large et xlarge. Notre sm vaut leur medium (4 px),
// notre md vaut leur large (6 px). Sans cet ecart, la croix touche la derniere lettre.
it.each([
  ['sm', 4],
  ['md', 6],
] as const)('decolle la croix du libelle en %s', async (size, attendu) => {
  const view = await renderNative(
    <Tag size={size} closable>
      Brouillon
    </Tag>,
  );

  expect(view.getByRole('button').props.style.marginLeft).toBe(attendu);
});

// Primer ecrit `aria-label={'Remove token'}` en dur sur sa croix : le nom du composant, dans
// la langue de l'interface. Le notre suit le glossaire du depot, ou « tag » est proscrit au
// profit d'« etiquette ». Un lecteur d'ecran est le seul endroit ou notre vocabulaire interne
// devient public : c'est le pire endroit pour un mot que notre propre glossaire interdit.
it('nomme la croix dans le vocabulaire du depot', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getByRole('button').props.accessibilityLabel).toBe("Retirer l'étiquette");
});
