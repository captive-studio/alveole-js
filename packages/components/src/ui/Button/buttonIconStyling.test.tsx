import { renderHook } from '@testing-library/react-native';
import { useStyles } from './Button.styles';
import { apparenceDeLIcone, EtatDuBoutonIcone, styleDuCadreDIcone } from './buttonIconStyling';

// Les decisions de style de `ButtonIcon`, prises hors rendu (ADR 0027). Les dimensions rendues,
// elles, se mesurent dans le navigateur (apps/docs/e2e/button.spec.ts).
const styles = async () => (await renderHook(() => useStyles())).result.current;

const etat = (surcharge: Partial<EtatDuBoutonIcone> = {}): EtatDuBoutonIcone => ({
  variant: 'primary',
  taille: 'md',
  ...surcharge,
});

const cadre = async (surcharge?: Partial<EtatDuBoutonIcone>) =>
  styleDuCadreDIcone(await styles(), etat(surcharge), false) as Record<string, unknown>;

const icone = async (surcharge?: Partial<EtatDuBoutonIcone>) =>
  apparenceDeLIcone(await styles(), etat(surcharge), false);

// La variante choisit le fond par une table. Ce test ancre le couple primary -> fond : il
// distingue une table juste d'une table permutee, ce qu'une comparaison entre deux variantes
// ne ferait pas.
it('applique le fond de la variante primary', async () => {
  expect((await cadre()).backgroundColor).toBe('#002764'); // background['action-high-primary']
});

it('remplace le fond par celui de l etat desactive', async () => {
  expect((await cadre({ disabled: true })).backgroundColor).toBe('#E6EAF1'); // background['disabled-grey']
});

// Les trois crans posent une hauteur (ADR 0013), ce qui les distingue tous les trois.
it.each([
  ['sm', 28],
  ['md', 32],
  ['lg', 40],
] as const)('applique la hauteur de la taille %s', async (taille, hauteur) => {
  expect((await cadre({ taille })).height).toBe(hauteur);
});

// `ButtonIcon` est le seul a produire cette geometrie : c'est donc ici que la garantie vit.
it('rend un cadre carre', async () => {
  const { width, height } = await cadre();

  expect(width).toBe(height);
});

// Comme chez Primer et Base, le bouton-icone partage le socle de `Button` : a taille egale,
// ses coins doivent etre les memes. Il gardait jusqu'ici le rayon `md` en taille `sm`.
it('prend en taille sm les rayons de Button sm', async () => {
  expect((await cadre({ taille: 'sm' })).borderTopLeftRadius).toBe(4); // radius('sm')
});

// `style` est fusionne en dernier, apres la variante et la taille. `InputButtonAdornment` et
// `TextInputPassword` en dependent pour aplatir les coins du bouton contre le champ voisin.
it('laisse la prop style ecraser la variante et la taille', async () => {
  expect(await cadre({ style: { backgroundColor: 'red', borderRadius: 0 } })).toEqual(
    expect.objectContaining({ backgroundColor: 'red', borderRadius: 0 }),
  );
});

// `secondary` est la seule a montrer sa bordure : sans ancrage, une permutation ne se verrait pas.
it('donne une bordure visible a la variante secondary', async () => {
  const { borderWidth, borderColor } = await cadre({ variant: 'secondary' });

  expect(borderWidth).toBe(1);
  expect(borderColor).not.toBe('transparent');
});

// Le contour transparent donne a `tertiary` le meme modele de boite que les variantes bordees.
it('reserve une bordure transparente a la variante tertiary', async () => {
  const { borderWidth, borderColor } = await cadre({ variant: 'tertiary' });

  expect(borderWidth).toBe(1);
  expect(borderColor).toBe('transparent');
});

// La seule variante sans fond au repos : c'est ce qui la rend utilisable en surimpression dans
// ToolbarTop et BottomSheet.
it('laisse la variante tertiary sans fond au repos', async () => {
  expect((await cadre({ variant: 'tertiary' })).backgroundColor).toBeUndefined();
});

it('absorbe sa bordure dans son gabarit plutot que de l ajouter par-dessus', async () => {
  expect((await cadre({ variant: 'secondary' })).boxSizing).toBe('border-box');
});

// Le fond change au survol : sans transition, il saute d'une teinte a l'autre, la ou le
// `Button` voisin fond la sienne en 150 ms.
it('fond son changement de fond comme Button', async () => {
  expect((await cadre()).transitionDuration).toBe((await styles()).container.transitionDuration);
});

// La teinte rejoue la table des variantes independamment du fond : les deux peuvent donc se
// desynchroniser. Ce test ancre le couple primary -> teinte.
it('teinte l icone selon la variante', async () => {
  expect((await icone()).color).toBe('#F2F9FF'); // text['inverted-primary']
});

// Fond et teinte desactives sont decides par deux gardes separees : une icone claire sur fond
// clair passerait si seule la premiere etait observee.
it('teinte l icone en gris quand le bouton est desactive', async () => {
  expect((await icone({ disabled: true })).color).toBe('#8D97AC'); // text['disabled-grey']
});

it('deduit la taille de l icone de celle du bouton', async () => {
  expect((await icone({ taille: 'lg' })).size).toBe('lg');
});

// `ToolbarTop` s'appuie sur cette precedence : `size="lg" iconSize="md"` lui donne un grand
// bouton a petite icone. Inverser la priorite grossirait toutes ses icones.
it('laisse iconSize primer sur la taille du bouton', async () => {
  expect((await icone({ taille: 'lg', iconSize: 'md' })).size).toBe('md');
});
