import { StyleValue } from '@alveole/theme';
import { ViewStyle } from 'react-native';
import { fieldBorderState } from '../FormControl/fieldBorderState';
import type { useStyles } from './OtpField.styles';

type OtpStyles = ReturnType<typeof useStyles>;

export type OtpThemeState = {
  disabled?: boolean | null;
  error?: string;
  success?: string;
};

/**
 * Le theme remis a la bibliotheque OTP. Il est sorti du composant parce que c'est une
 * donnee, pas du rendu : la bibliotheque empile elle-meme les styles de chaque cellule, et
 * l'ordre dans lequel elle le fait est la seule chose qui donne au focus sa priorite. Ici,
 * la regle se lit et s'eprouve.
 *
 * `focusedPinCodeContainerStyle` ne concerne que la cellule active, que la bibliotheque
 * pose par-dessus l'etat au repos : le focus passe donc devant l'erreur et le succes sans
 * que nous ayons a l'arbitrer. Le repos, lui, porte l'etat desactive ou la validation.
 */
export const otpTheme = (styles: OtpStyles, state: OtpThemeState) => ({
  containerStyle: styles.containerStyle as ViewStyle,
  pinCodeContainerStyle: {
    ...styles.pinCodeContainerStyle,
    // Le parametre est explicite : la cellule desactivee ne pose qu'un fond, la cellule en
    // erreur qu'une bordure. Sans lui, l'inference cherche un type commun aux quatre etats
    // et n'en trouve aucun.
    ...fieldBorderState<StyleValue>(
      {
        inputFocused: styles.focusedPinCodeContainerStyle,
        inputError: styles.pinCodeContainerStyleError,
        inputSuccess: styles.pinCodeContainerStyleSuccess,
        inputDisabled: styles.pinCodeContainerStyleDisabled,
      },
      state,
    ),
  } as ViewStyle,
  focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle as ViewStyle,
  focusStickStyle: styles.focusStickStyle as ViewStyle,
  pinCodeTextStyle: styles.pinCodeTextStyle,
});
