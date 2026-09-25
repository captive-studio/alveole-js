import { fireEvent, renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { ButtonIcon } from '../Button';
import { ToolbarTop } from './ToolbarTop';

type Arbre = ReturnType<RenderResult['toJSON']>;
type Noeud = Exclude<Arbre, null | unknown[]>;

const racine = (arbre: Arbre): Noeud => {
  if (arbre === null || Array.isArray(arbre)) throw new Error('La barre doit rendre une racine unique.');

  return arbre;
};

/** La barre n'expose aucun identifiant de test : son style est ce que le rendu laisse voir. */
const styleDeLaBarre = (arbre: Arbre) => racine(arbre).props.style;

/** Sans navigation ni actions, le bloc d'information est le seul enfant de la barre. */
const blocDInformation = (arbre: Arbre) => {
  const [bloc] = racine(arbre).children ?? [];
  if (typeof bloc !== 'object') throw new Error("La barre doit contenir un bloc d'information.");

  return bloc.props.style;
};

/**
 * Les lignes de texte rendues, dans l'ordre. Chercher un texte absent ne prouve rien : un
 * sous-titre vide reste introuvable tout en occupant sa hauteur de ligne. Enumerer les noeuds de
 * texte, y compris vides, distingue les deux.
 */
const lignesDeTexte = (noeud: Arbre | string): string[] => {
  if (noeud === null || typeof noeud !== 'object') return [];
  if (Array.isArray(noeud)) return noeud.flatMap(lignesDeTexte);
  const { type, children = [] } = noeud;
  if (type === 'Text') return [children.filter(enfant => typeof enfant === 'string').join('')];
  return children.flatMap(lignesDeTexte);
};

// Le bouton de navigation n'affiche qu'une fleche. Son nom ne peut pas etre devine depuis
// l'icone : la meme fleche sert a revenir, a replier un panneau ou a ouvrir un menu, et seul
// l'appelant sait laquelle. Le type l'exige donc des qu'`onNavigate` est fourni.
it('nomme le bouton de navigation avec ce que l appelant en dit', async () => {
  const { getByRole } = await renderNative(
    <ToolbarTop title="Dossier" onNavigate={() => undefined} navigationLabel="Revenir aux dossiers" />,
  );

  expect(getByRole('button', { name: 'Revenir aux dossiers' })).toBeTruthy();
});

it('pointe la fleche vers l arriere par defaut', async () => {
  const { getByRole } = await renderNative(
    <ToolbarTop title="Dossier" onNavigate={() => undefined} navigationLabel="Revenir aux dossiers" />,
  );

  expect(getByRole('button', { name: 'Revenir aux dossiers' }).props.icon).toBe('ChevronLeft');
});

it('laisse l appelant choisir une autre icone de navigation', async () => {
  const { getByRole } = await renderNative(
    <ToolbarTop title="Dossier" onNavigate={() => undefined} navigationLabel="Fermer" navigationIcon="X" />,
  );

  expect(getByRole('button', { name: 'Fermer' }).props.icon).toBe('X');
});

it('declenche la navigation quand on presse la fleche', async () => {
  const onNavigate = jest.fn();
  const { getByRole } = await renderNative(
    <ToolbarTop title="Dossier" onNavigate={onNavigate} navigationLabel="Revenir aux dossiers" />,
  );

  fireEvent.press(getByRole('button', { name: 'Revenir aux dossiers' }));

  expect(onNavigate).toHaveBeenCalledTimes(1);
});

it('n affiche aucun bouton quand la barre ne navigue nulle part', async () => {
  const { queryByRole } = await renderNative(<ToolbarTop title="Dossier" />);

  expect(queryByRole('button')).toBeNull();
});

it('affiche le titre puis le sous-titre', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" sousTitre="12 documents" />);

  expect(lignesDeTexte(toJSON())).toEqual(['Dossier', '12 documents']);
});

it('n occupe pas de ligne de sous-titre quand l appelant n en donne pas', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" />);

  expect(lignesDeTexte(toJSON())).toEqual(['Dossier']);
});

it('affiche l avatar devant le titre', async () => {
  const { getByText } = await renderNative(<ToolbarTop title="Dossier" AvatarProps={{ fallbackText: 'Ada' }} />);

  expect(getByText('A')).toBeTruthy();
});

it('rend les actions confiees par l appelant', async () => {
  const { getByRole } = await renderNative(
    <ToolbarTop
      title="Dossier"
      actions={<ButtonIcon variant="tertiary" icon="Plus" accessibilityLabel="Ajouter" onPress={() => undefined} />}
    />,
  );

  expect(getByRole('button', { name: 'Ajouter' })).toBeTruthy();
});

it('empile la barre quand la variante est large', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" variant="large" />);

  expect(styleDeLaBarre(toJSON())).toMatchObject({ flexDirection: 'column', alignItems: 'flex-start' });
});

it('aligne la barre en ligne par defaut', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" />);

  expect(styleDeLaBarre(toJSON())).toMatchObject({ flexDirection: 'row', alignItems: 'center' });
});

// `compactLargeInformations` ne pose que des valeurs qui n'annulent rien de ce que la table de
// base a deja mis : un `paddingBottom: 0` sans padding a effacer, et un `justifyContent` sur une
// rangee dont l'enfant occupe deja toute la place. Le test decrit donc le style effectivement
// applique, sans affirmer qu'il se voit : cela se tranche dans un vrai moteur de mise en page.
it('centre le bloc d information en variante compactLarge', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" variant="compactLarge" />);

  expect(blocDInformation(toJSON())).toMatchObject({ justifyContent: 'center', paddingBottom: 0 });
});

it('resserre la barre quand la variante est compactLarge', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" variant="compactLarge" />);

  expect(styleDeLaBarre(toJSON())).toMatchObject({ paddingTop: 12, paddingBottom: 8, paddingLeft: 16 });
});

// `large` et `compactLarge` disposent la barre autrement, mais elles grossissent le titre de la
// meme facon. C'est la seule chose qu'elles partagent, et elle se verifie sur les deux.
it.each(['large', 'compactLarge'] as const)('grossit le titre en variante %s', async variant => {
  const { getByText } = await renderNative(<ToolbarTop title="Dossier" sousTitre="12 documents" variant={variant} />);

  expect(getByText('Dossier').props.style).toMatchObject({ fontSize: 40 });
  expect(getByText('12 documents').props.style).toMatchObject({ fontSize: 14 });
});

it('garde un titre discret en variante par defaut', async () => {
  const { getByText } = await renderNative(<ToolbarTop title="Dossier" sousTitre="12 documents" />);

  expect(getByText('Dossier').props.style).toMatchObject({ fontSize: 14 });
  expect(getByText('12 documents').props.style).toMatchObject({ fontSize: 12 });
});

it('souligne la barre quand on le lui demande', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" withBorder />);

  expect(styleDeLaBarre(toJSON())).toMatchObject({ borderBottomWidth: 1, borderTopWidth: 0 });
});

it('ne souligne pas la barre par defaut', async () => {
  const { toJSON } = await renderNative(<ToolbarTop title="Dossier" />);

  expect(styleDeLaBarre(toJSON())).not.toHaveProperty('borderBottomWidth');
});

// Le style de typographie passe apres celui de la variante : il sert justement a corriger ce que
// la variante a decide, et l'inverse le rendrait inoperant.
it('laisse l appelant reprendre la main sur le titre et le sous-titre', async () => {
  const { getByText } = await renderNative(
    <ToolbarTop title="Dossier" sousTitre="12 documents" variant="large" typographyStyle={{ fontSize: 9 }} />,
  );

  expect(getByText('Dossier').props.style).toMatchObject({ fontSize: 9 });
  expect(getByText('12 documents').props.style).toMatchObject({ fontSize: 9 });
});
