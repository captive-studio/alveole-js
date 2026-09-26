import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { focusBorder } from '@alveole/theme';
import { useStyles } from './OtpInput.styles';
import { otpTheme, type OtpThemeState } from './otpTheme';

// jsdom ne resout pas le raccourci `outline` des styles que react-native-web compile : un
// contour remis resterait invisible a `getComputedStyle`, et un test de rendu passerait
// quoi qu'il arrive. Le theme remis a la bibliotheque, lui, se lit tel quel.
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

it('colore la cellule au repos de la couleur d erreur', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(themeCalcule({ error: 'Code invalide' }).pinCodeContainerStyle.borderColor).toBe(
    result.current.pinCodeContainerStyleError.borderColor,
  );
});

// Desactive prime sur la validation : un champ hors d'usage n'a pas de verdict a rendre.
it('garde l apparence desactivee par-dessus l erreur', () => {
  const desactive = themeCalcule({ disabled: true, error: 'Code invalide' });

  expect(desactive.pinCodeContainerStyle.borderColor).toBe(themeCalcule().pinCodeContainerStyle.borderColor);
});
