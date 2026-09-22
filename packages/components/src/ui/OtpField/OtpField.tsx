import React from 'react';
import type { TextInputProps } from 'react-native';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  FormControlOtpInput,
  FormControlOtpInputElement,
  FormControlOtpInputProps,
} from '../FormControl';
import { useStyles } from './OtpField.styles';
import { otpTheme } from './otpTheme';

export type OtpFieldProps = FormControlOtpInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: FormControlOtpInputProps['onTextChange'];
  };

export const OtpField = React.forwardRef<FormControlOtpInputElement, OtpFieldProps>(function OtpField(props, ref) {
  const { error, success, disabled, onChange } = props;

  const styles = useStyles();

  return (
    <FieldFrame {...props}>
      <FormControlOtpInput
        ref={ref}
        // La bibliotheque colore d'elle-meme la bordure de la cellule active et le curseur
        // clignotant avec `focusColor`, dont le defaut est un vert sans rapport avec le kit.
        focusColor={styles.focusedPinCodeContainerStyle.borderColor}
        theme={otpTheme(styles, { disabled, error, success })}
        onTextChange={onChange}
        // `outline` est une propriete du web que le `TextStyle` de react-native ne connait
        // pas : la conversion est explicite ici parce que c'est la frontiere, comme dans
        // `ButtonIcon`. Le style lui-meme se relit et s'eprouve dans la table.
        textInputProps={{ style: styles.hiddenInputStyle as TextInputProps['style'] }}
        {...props}
      />
    </FieldFrame>
  );
});
