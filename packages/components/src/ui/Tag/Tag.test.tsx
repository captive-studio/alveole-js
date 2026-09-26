import { fireEvent, renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { Typography } from '../../core/Typography';
import { Tag } from './Tag';

// Le style de l'etiquette se teste hors rendu (tagStyling.test.web.tsx) et se mesure dans le
// navigateur (apps/docs/e2e/tag.spec.ts) : il ne reste ici que le contrat (ADR 0027).

// Le libelle est le seul Text de l etiquette, et c est lui qui porte la pastille :
// `Tag` rend un `Typography` stylé, pas une boite autour d un texte.
const pastille = (view: RenderResult) => view.root?.queryAll(i => i.type === 'Text')[0];

const etiquette = (props: Partial<Parameters<typeof Tag>[0]> = {}) =>
  renderNative(
    <Tag size="sm" {...props}>
      Brouillon
    </Tag>,
  );

// `closable` est optionnelle et vaut faux par defaut : c'est ce qui preserve les etiquettes
// deja en place, qui ne doivent pas se mettre a afficher une croix parce que la version a
// change. Le defaut est donc un comportement a part entiere, pas une absence.
it('n affiche aucune croix tant que l etiquette n est pas fermable', async () => {
  const view = await etiquette();

  expect(view.queryByRole('button')).toBeNull();
});

// La croix est le seul element actionnable de l'etiquette : le reste ne doit rien annoncer
// d'actionnable a un lecteur d'ecran. Le conteneur de survol est un `Pressable`, qui serait
// annonce sans son `accessible={false}` - c'est cette couture que le test tient. Asserter le
// role de la croix elle-meme serait tautologique : on la trouve deja par ce role.
it('n expose qu une seule cible actionnable, la croix', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getAllByRole('button')).toHaveLength(1);
});

// Le seul effet que la croix doit produire : prevenir l'appelant. Le composant ne retire
// pas l'etiquette lui-meme - c'est la liste qui la porte qui decide de ce qui disparait.
it('previent l appelant quand la croix est activee', async () => {
  const onClose = jest.fn();
  const view = await etiquette({ closable: true, onClose });

  fireEvent.press(view.getByRole('button'));

  expect(onClose).toHaveBeenCalledTimes(1);
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
  // Le libelle est le seul enfant textuel de la pastille : ce qui le precede dans la liste
  // des enfants est rendu avant lui. On exige un rang, pas une position : figer l'index a 1
  // ferait casser le test au premier element ajoute devant, sans qu'aucun ordre n'ait change.
  const enfants = pastille(view)?.children ?? [];
  const rangDuLibelle = enfants.findIndex(enfant => typeof enfant === 'string');

  expect(rangDuLibelle).toBeGreaterThan(0);
});

// Primer ecrit `aria-label={'Remove token'}` en dur : « retirer un truc », sans dire lequel.
// Dans une liste de valeurs selectionnees, un lecteur d'ecran annonce alors six fois la meme
// chose. Quand le libelle est du texte, la croix le reprend ; sinon elle retombe sur le nom
// generique, dans le vocabulaire du glossaire, ou « tag » est proscrit.
it('nomme la croix par le libelle qu elle retire', async () => {
  const view = await etiquette({ closable: true });

  expect(view.getByRole('button').props.accessibilityLabel).toBe('Retirer Brouillon');
});

// Repli quand le libelle n'est pas du texte : un lecteur d'ecran ne peut pas annoncer un
// arbre React, et une croix sans nom n'est pas annoncable du tout.
it('retombe sur un nom generique quand le libelle n est pas du texte', async () => {
  const view = await renderNative(
    <Tag size="sm" closable>
      <Typography>Brouillon</Typography>
    </Tag>,
  );

  expect(view.getByRole('button').props.accessibilityLabel).toBe("Retirer l'étiquette");
});
