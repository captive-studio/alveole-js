import { renderHook } from '@testing-library/react-native';
import { useStyles } from './Button.styles';
import { EtatDuBouton } from './Button.types';
import { styleDuConteneur, styleDuLibelle, styleDuPressable } from './buttonStyling';

// Les decisions de style du bouton, prises hors rendu (ADR 0027). La coque (le Pressable)
// porte hauteur, rayons et bordure ; le Box interieur, fond et rembourrages. Les hauteurs
// rendues, elles, se mesurent dans le navigateur (apps/docs/e2e/button.spec.ts).
const styles = async () => (await renderHook(() => useStyles())).result.current;

const etat = (surcharge: Partial<EtatDuBouton> = {}): EtatDuBouton => ({
  variant: 'primary',
  taille: 'md',
  ...surcharge,
});

const coque = async (surcharge?: Partial<EtatDuBouton>) =>
  styleDuPressable(await styles(), etat(surcharge), { hovered: false });

const conteneur = async (surcharge?: Partial<EtatDuBouton>, actif = false) =>
  styleDuConteneur(await styles(), etat(surcharge), actif) as Record<string, unknown>;

// La taille est choisie par une table, et chaque cran pose sa hauteur depuis control
// (ADR 0013) : `sm` et `lg` avaient la leur derivee des rembourrages, ce qui produisait une
// echelle incoherente. Ancrer les trois valeurs separe une table juste d'une table permutee.
it.each([
  ['sm', 28],
  ['md', 32],
  ['lg', 40],
] as const)('pose la hauteur de la taille %s sur la coque', async (taille, hauteur) => {
  expect((await coque({ taille })).height).toBe(hauteur);
});

it.each([
  ['sm', 8],
  ['md', 12],
  ['lg', 16],
] as const)('creuse la taille %s du rembourrage horizontal de control', async (taille, retrait) => {
  expect((await conteneur({ taille })).paddingLeft).toBe(retrait);
});

// Le design prevoyait qu'une icone resserre le rembourrage de son cote. Ca n'a jamais
// fonctionne, et le code qui les choisissait a ete supprime : le conteneur ne connait plus
// les icones, son rembourrage ne depend que de la taille (test precedent).

// Avec une hauteur fixe, un rembourrage vertical ne fait que comprimer le contenu : le
// centrage du conteneur suffit a positionner libelle et icone.
it('ne pose pas de rembourrage vertical sous une hauteur fixe', async () => {
  const { paddingTop, paddingBottom } = await conteneur();

  expect([paddingTop ?? 0, paddingBottom ?? 0]).toEqual([0, 0]);
});

// La coque porte la hauteur autoritaire (boxSizing absorbe sa bordure dedans) : si le Box
// interieur portait sa propre valeur litterale, une variante bordee verrait sa zone de contenu
// reduite par la bordure sans que le Box ne le sache, et deborderait, rognee par l'overflow.
it('remplit l espace laisse par la coque plutot que de porter sa propre hauteur', async () => {
  expect((await conteneur()).height).toBe('100%');
});

// Sans boxSizing, la bordure s'ajoutait au-dela de la hauteur voulue : secondary et danger
// rendaient 2 px plus hauts que primary.
it('absorbe la bordure dans la hauteur de la coque', async () => {
  expect((await coque({ variant: 'secondary' })).boxSizing).toBe('border-box');
});

// Une largeur automatique inclut la bordure dans sa mesure : si seuls `secondary` et `danger`
// en portaient une, ils rendraient 2 px plus larges que les variantes sans contour. Toutes
// gardent donc la meme bordure structurelle, transparente sur les variantes pleines ou discretes.
it.each(['primary', 'secondary', 'tertiary', 'danger'] as const)(
  'reserve la meme bordure structurelle sur la variante %s',
  async variant => {
    expect((await coque({ variant })).borderWidth).toBe(1);
  },
);

it('rend invisible la bordure structurelle du tertiary', async () => {
  expect((await coque({ variant: 'tertiary' })).borderColor).toBe('transparent');
});

// `sm` est la seule taille qui emprunte ses rayons a `smContainer` plutot qu'au conteneur commun.
// Les valeurs sont ancrees plutot que comparees : sur web, un rayon est une variable CSS.
it.each([
  ['sm', 4], // radius('sm')
  ['md', 6], // radius('md')
] as const)('donne a la taille %s son rayon', async (taille, rayon) => {
  expect((await coque({ taille })).borderTopLeftRadius).toBe(rayon);
});

it('etale la coque sur toute la largeur quand fullWidth est demande', async () => {
  expect((await coque({ fullWidth: true })).width).toBe('100%');
});

// Un menu deplie se rend comme un bouton appuye : c'est l'etat actif du conteneur.
it('change le fond du conteneur actif', async () => {
  expect((await conteneur({}, true)).backgroundColor).not.toBe((await conteneur()).backgroundColor);
});

// Les deux etats peuvent etre vrais ensemble, et `cleDEtat` tranche en faveur du desactive :
// sinon un bouton desactive prendrait l'apparence d'un bouton appuye, donc actionnable.
it('garde le fond desactive a un conteneur actif mais desactive', async () => {
  expect((await conteneur({ disabled: true }, true)).backgroundColor).toBe(
    (await conteneur({ disabled: true })).backgroundColor,
  );
});

// `selected` court-circuite la variante : comparer deux variantes entre elles teste cette
// regle de priorite, la ou comparer a son propre repos ne ferait que constater qu'ils different.
it('donne le meme fond a deux variantes selectionnees', async () => {
  expect((await conteneur({ variant: 'danger', selected: true })).backgroundColor).toBe(
    (await conteneur({ variant: 'primary', selected: true })).backgroundColor,
  );
});

// Meme regle sur le libelle, ecrite a un autre endroit : la selection y ecarte aussi la table
// de variante.
it('donne la meme couleur de libelle a deux variantes selectionnees', async () => {
  const table = await styles();
  const libelle = (variant: EtatDuBouton['variant']) =>
    (styleDuLibelle(table, etat({ variant, selected: true }), false) as Record<string, unknown>).color;

  expect(libelle('danger')).toBe(libelle('primary'));
});

// Le libelle que recouvre le spinner reste dans le flux pour imposer sa largeur :
// `display: none` ferait retrecir le bouton.
it('masque le libelle sans le sortir du flux', async () => {
  expect((await styles()).libelleMasque).toEqual({ visibility: 'hidden' });
});
