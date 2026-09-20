import { act, fireEvent, renderHookOnDesktop, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { focusBorder } from '@alveole/theme';
import { OtpField } from './OtpField';
import { useStyles } from './OtpField.styles';
import { otpTheme, type OtpThemeState } from './otpTheme';

test('associe le libellé au champ', () => {
  renderWeb(<OtpField label="Code reçu par SMS" />);

  expect(screen.getByLabelText('Code reçu par SMS')).toBeTruthy();
});

// La bibliotheque cache la vraie saisie derriere les cellules : c'est elle qui recoit le
// focus, et les cellules ne font que le refleter.
//
// `hideStick` : le curseur clignotant de la cellule active monte une animation en boucle,
// que `act` attend. Le curseur n.est pas ce qu.on mesure, et ne pas le monter retire
// l.attente au lieu de l.allonger.
//
// `autoFocus={false}` partout ou un etat de repos est lu : la bibliotheque focalise le
// champ au montage par defaut, et la premiere cellule serait deja active. Sans ce reglage,
// « au repos » et « au focus » designent la meme chose et les assertions ne prouvent rien.
const champ = () => screen.getByTestId('otp-input-hidden');
const cellule = (index = 0) => screen.getAllByTestId('otp-input')[index]!;

const couleurDeLaCellule = (index = 0) => window.getComputedStyle(cellule(index)).borderTopColor;

test('colore la bordure de la cellule active avec le token de focus, sans l epaissir', () => {
  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />);
  const repos = couleurDeLaCellule();

  act(() => fireEvent.focus(champ()));

  const style = window.getComputedStyle(cellule());
  expect({ repos, couleur: style.borderTopColor, epaisseur: style.borderTopWidth }).toEqual({
    repos,
    couleur: 'rgb(10, 118, 246)',
    epaisseur: '1px',
  });
  expect(couleurDeLaCellule()).not.toBe(repos);
});

// Seule la cellule ou l'on ecrit s'allume : le deplacement automatique entre cellules
// resterait illisible si tout le champ changeait de couleur.
test('ne colore que la cellule active', () => {
  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />);
  const repos = couleurDeLaCellule(1);

  act(() => fireEvent.focus(champ()));

  expect(couleurDeLaCellule(1)).toBe(repos);
});

test('rend la couleur de repos a la cellule quand le champ perd le focus', () => {
  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />);
  const repos = couleurDeLaCellule();

  act(() => fireEvent.focus(champ()));
  act(() => fireEvent.blur(champ()));

  expect(couleurDeLaCellule()).toBe(repos);
});

test('colore la bordure des cellules en erreur', () => {
  const { unmount } = renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick />);
  const repos = couleurDeLaCellule();
  unmount();

  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick error="Code invalide" />);

  expect(couleurDeLaCellule()).not.toBe(repos);
});

// Pendant la saisie, c'est la cellule active qu'il faut pouvoir designer sans ambiguite ;
// le verdict de validation reprend la main au blur.
test('couvre la couleur d erreur tant que la cellule est active, puis la restitue', () => {
  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick error="Code invalide" />);
  const erreur = couleurDeLaCellule();

  act(() => fireEvent.focus(champ()));
  const pendantLeFocus = couleurDeLaCellule();
  act(() => fireEvent.blur(champ()));

  expect({ pendantLeFocus, apresLeBlur: couleurDeLaCellule() }).toEqual({
    pendantLeFocus: 'rgb(10, 118, 246)',
    apresLeBlur: erreur,
  });
});

// Desactive, la bibliotheque refuse le focus a la saisie cachee : les cellules gardent en
// toutes circonstances leur apparence hors d'usage.
test('ne colore pas la bordure des cellules d un champ desactive', () => {
  renderWeb(<OtpField label="Code" numberOfDigits={4} autoFocus={false} hideStick disabled />);
  const desactive = couleurDeLaCellule();

  act(() => fireEvent.focus(champ()));

  expect(couleurDeLaCellule()).toBe(desactive);
});

// jsdom ne resout pas le raccourci `outline` des styles que react-native-web compile : un
// contour remis resterait invisible a `getComputedStyle`, et un test de rendu passerait
// quoi qu'il arrive. Le theme remis a la bibliotheque, lui, se lit tel quel.
describe('le theme remis a la bibliotheque OTP', () => {
  const themeCalcule = (state: OtpThemeState = {}) =>
    renderHookOnDesktop(() => otpTheme(useStyles(), state)).result.current;

  // Amendement de l'ADR 0016 : la cellule active porte un anneau, mais encastre - il se
  // dessine a l'interieur, donc il ne decale pas la grille des cellules. L'ombre reste
  // proscrite, elle deborderait sur les cellules voisines.
  it('encastre l anneau de la cellule active, et n y pose aucune ombre', () => {
    expect(Object.keys(themeCalcule().focusedPinCodeContainerStyle)).not.toContain('boxShadow');
  });

  it('colore la cellule active avec le token de focus', () => {
    expect(themeCalcule().focusedPinCodeContainerStyle).toEqual(focusBorder());
  });

  // La bibliotheque empile le style de la cellule active par-dessus celui du repos : c'est
  // uniquement pour cela que le focus passe devant l'erreur. Le repos ne doit donc jamais
  // porter la bordure de focus, sans quoi la priorite se jouerait deux fois.
  it('laisse la cellule au repos porter la validation, jamais le focus', () => {
    const enErreur = themeCalcule({ error: 'Code invalide' });

    expect(enErreur.pinCodeContainerStyle.borderColor).not.toBe(focusBorder().borderColor);
  });

  // Desactive prime sur la validation : un champ hors d'usage n'a pas de verdict a rendre.
  it('garde l apparence desactivee par-dessus l erreur', () => {
    const desactive = themeCalcule({ disabled: true, error: 'Code invalide' });

    expect(desactive.pinCodeContainerStyle.borderColor).toBe(themeCalcule().pinCodeContainerStyle.borderColor);
  });
});

test('utilise le rayon de bordure de l echelle du theme sur la cellule', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.pinCodeContainerStyle.borderRadius).toBe('var(--radius-md)');
});

// La bibliotheque cache la vraie saisie derriere les cellules. Cette saisie prend le focus,
// et le navigateur lui posait son propre contour : mesure en navigateur, un champ clique
// affichait le `1px auto` gris-bleu de Chrome par-dessus des cellules dont la bordure venait
// deja de dire le focus. Deux indicateurs pour un seul etat, dont un qui n'est pas au kit.
// Meme parade que `FormControl`, qui eteint le contour de ses `input` pour la meme raison.
it('eteint le contour que le navigateur pose sur la saisie cachee', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.hiddenInputStyle.outline).toBe('none');
});
