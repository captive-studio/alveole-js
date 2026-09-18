import React from 'react';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  FormControlOtpInput,
  FormControlOtpInputElement,
  FormControlOtpInputProps,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { useStyles } from './OtpField.styles';
import { otpTheme } from './otpTheme';

export type OtpFieldProps = FormControlOtpInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: FormControlOtpInputProps['onTextChange'];
  };

export const OtpField = React.forwardRef<FormControlOtpInputElement, OtpFieldProps>(function OtpField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange } = props;

  const styles = useStyles();

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <FormControlOtpInput
        ref={ref}
        // La bibliotheque colore d'elle-meme la bordure de la cellule active et le curseur
        // clignotant avec `focusColor`, dont le defaut est un vert sans rapport avec le kit.
        focusColor={styles.focusedPinCodeContainerStyle.borderColor}
        theme={otpTheme(styles, { disabled, error, success })}
        onTextChange={onChange}
        {...props}
      />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
