import { focusBorder, makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, spacingValue, radius }) => ({
  inputHeading: {},
  containerStyle: {
    justifyContent: 'center',
    gap: spacing('1W'),
  },
  pinCodeContainerStyle: {
    borderRadius: radius('md'),
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    height: spacingValue('300'),
    width: spacingValue('300'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeContainerStyleDisabled: {
    backgroundColor: color.background['disabled-grey'],
  },
  // La legende sous le champ disait seule l'erreur et le succes ; les cellules les portent
  // aussi, comme le cadre des autres familles de champs.
  pinCodeContainerStyleError: {
    borderColor: color.border['plain-error'],
  },
  pinCodeContainerStyleSuccess: {
    borderColor: color.border['plain-success'],
  },
  /**
   * La cellule active ne recoit pas d'anneau : c'est sa propre bordure qui change de
   * couleur, selon la definition commune du theme (ADR 0012). La bibliotheque empile ce
   * style par-dessus celui de la cellule au repos, ce qui donne au focus la priorite sur
   * l'erreur et le succes sans que nous ayons a l'arbitrer.
   */
  focusedPinCodeContainerStyle: focusBorder(),
  /**
   * La bibliotheque cache la vraie saisie derriere les cellules : c'est elle qui prend le
   * focus, et le navigateur lui posait son propre contour par-dessus des cellules dont la
   * bordure disait deja le focus. Meme parade que `FormControl` sur ses `input`.
   */
  hiddenInputStyle: {
    outline: 'none',
  },
  focusStickStyle: {
    maxHeight: spacing('2W'),
  },
  pinCodeTextStyle: {
    color: color.text['default-grey'],
    ...text['Corps de texte'].LG.Regular,
  },
}));
