import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { ButtonIcon } from './ButtonIcon';

// `ButtonIcon` pose son style directement sur le Pressable, sans Box intermediaire, et
// n'expose aucun role : la racine rendue est donc la seule vue, et porte le style resolu.
const cadre = (view: RenderResult): Record<string, unknown> => {
  const racine = view.toJSON();

  if (racine === null || Array.isArray(racine)) {
    throw new Error('Le composant doit rendre une racine unique pour que son style soit observable.');
  }

  return racine.props.style;
};

// La couleur et la taille demandees a `LucideIcon` ressortent sur le SVG en `stroke` et
// `width` : c'est la seule trace observable du second bloc de decision du composant.
const icone = (view: RenderResult) => view.root!.queryAll(i => String(i.type) === 'RNSVGSvgView')[0].props;

// La variante choisit le fond par une chaine de `else if`. Ce test ancre le couple
// primary -> fond : il distingue une table juste d'une table permutee, ce qu'une
// comparaison entre deux variantes ne ferait pas.
it('applique le fond de la variante primary', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" />);

  expect(cadre(view).backgroundColor).toBe('#002764'); // background['action-high-primary']
});

// L'etat desactive s'empile sur le fond de repos : sans lui, un bouton desactive garderait
// le fond plein de sa variante et paraitrait actionnable.
it('remplace le fond par celui de l etat desactive', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" disabled />);

  expect(cadre(view).backgroundColor).toBe('#E6EAF1'); // background['disabled-grey']
});

// La taille est choisie par des ternaires imbriques, dont aucune branche n'etait observee.
// Les trois crans posent desormais une hauteur (ADR 0013), ce qui les distingue tous les
// trois, la ou seul le rembourrage de `lg` differait auparavant.
it.each([
  ['sm', 28],
  ['md', 32],
  ['lg', 40],
] as const)('applique la hauteur de la taille %s', async (size, height) => {
  const view = await renderNative(
    <ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" size={size} />,
  );

  expect(cadre(view).height).toBe(height);
});

// Le carre etait jusqu'ici garanti par un test de `Button`, du temps ou l'absence de `title`
// y basculait en mode icone seule. Ce mode a disparu : `ButtonIcon` est desormais le seul a
// produire cette geometrie, c'est donc ici que la garantie doit vivre.
it('rend un cadre carre', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" />);

  expect(cadre(view).width).toBe(cadre(view).height);
});

// `iconStyle` rejoue la table des variantes pour la couleur, independamment de celle du
// fond : les deux peuvent donc se desynchroniser. Ce test ancre le couple primary -> teinte.
it('teinte l icone selon la variante', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" />);

  expect(icone(view).stroke).toBe('#F2F9FF'); // text['inverted-primary']
});

// Le fond desactive et la teinte desactivee sont decides par deux gardes separees. Sans ce
// test, seule la premiere serait observee : une icone claire sur fond clair passerait.
it('teinte l icone en gris quand le bouton est desactive', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" disabled />);

  expect(icone(view).stroke).toBe('#8D97AC'); // text['disabled-grey']
});

// Troisieme table independante : la taille de l'icone est deduite de celle du bouton, sauf
// si `iconSize` la pose explicitement. Aucune de ces branches n'etait observee.
it('deduit la taille de l icone de celle du bouton', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" size="lg" />);

  expect(icone(view).width).toBe(32); // iconSize 'lg', contre 24 en 'md'
});

// `ToolbarTop` s'appuie sur cette precedence : `size="lg" iconSize="md"` lui donne un grand
// bouton a petite icone. Inverser la priorite grossirait toutes ses icones.
it('laisse iconSize primer sur la taille du bouton', async () => {
  const view = await renderNative(
    <ButtonIcon accessibilityLabel="Valider" variant="primary" icon="Check" size="lg" iconSize="md" />,
  );

  expect(icone(view).width).toBe(24);
});

// `style` est fusionne en dernier, apres la variante et la taille. `InputButtonAdornment` et
// `PasswordField` en dependent pour aplatir les coins du bouton contre le champ voisin :
// fusionne plus tot, il serait ecrase par le rayon uniforme de `container`.
it('laisse la prop style ecraser la variante et la taille', async () => {
  const view = await renderNative(
    <ButtonIcon
      accessibilityLabel="Valider"
      variant="primary"
      icon="Check"
      style={{ backgroundColor: 'red', borderRadius: 0 }}
    />,
  );

  expect(cadre(view)).toEqual(expect.objectContaining({ backgroundColor: 'red', borderRadius: 0 }));
});

// Un `icon` numerique n'affiche pas d'icone mais le nombre lui-meme, via `textStyle`, un
// troisieme bloc de decision de 23 lignes reserve a ce seul cas. Aucun appelant du depot ne
// s'en sert, mais le paquet est publie : ce test fige le comportement sans le trancher.
it('affiche le nombre lui-meme quand icon est numerique', async () => {
  const { getByText } = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon={3} />);

  expect(getByText('3')).toBeTruthy();
});

// Les trois variantes sont ecrites en trois blocs jumeaux. Sans ancrage sur chacune, une
// permutation de la table ne se verrait pas : `secondary` est la seule a montrer sa bordure.
it('donne une bordure visible a la variante secondary', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="secondary" icon="Check" />);

  expect(cadre(view).borderWidth).toBe(1);
  expect(cadre(view).borderColor).not.toBe('transparent');
});

// Meme reserve que sur Button : le contour transparent donne a `tertiary` le meme modele
// de boite que les variantes bordees sans rendre de trait au repos.
it('reserve une bordure transparente a la variante tertiary', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="tertiary" icon="Check" />);

  expect(cadre(view).borderWidth).toBe(1);
  expect(cadre(view).borderColor).toBe('transparent');
});

// `tertiaryContainer` est un objet vide : la variante tertiary est la seule sans fond au
// repos. C'est ce qui la rend utilisable en surimpression dans ToolbarTop et BottomSheet.
it('laisse la variante tertiary sans fond au repos', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="tertiary" icon="Check" />);

  expect(cadre(view).backgroundColor).toBeUndefined();
});

// Un bouton sans libelle n'a que son nom accessible pour se decrire. Sans role ni nom, le
// DOM web produit un `div` focusable et muet : on l'atteint au clavier, mais rien n'annonce
// ce qu'il fait. L'audit axe ne peut pas le voir, aucune de ses regles ne portant sur un
// `div` focusable sans role, d'ou une baseline a zero violation qui reste verte.
it('s annonce comme un bouton portant son nom', async () => {
  const { getByRole } = await renderNative(<ButtonIcon variant="tertiary" icon="X" accessibilityLabel="Fermer" />);

  expect(getByRole('button', { name: 'Fermer' })).toBeTruthy();
});

// La hauteur et la largeur declarees sont les memes pour toutes les variantes (32x32) :
// comparer ces valeurs ne peut donc rien reveler. boxSizing absorbe la bordure structurelle
// dans ce gabarit au lieu de l'ajouter par-dessus au rendu.
it('absorbe sa bordure dans son gabarit plutot que de l ajouter par-dessus', async () => {
  const view = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="secondary" icon="Check" />);

  expect(cadre(view).boxSizing).toBe('border-box');
});
