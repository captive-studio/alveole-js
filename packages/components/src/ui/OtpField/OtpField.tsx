import React from 'react';
import { ViewStyle } from 'react-native';
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
        theme={{
          containerStyle: styles.containerStyle,
          pinCodeContainerStyle: {
            ...styles.pinCodeContainerStyle,
            ...(disabled ? styles.pinCodeContainerStyleDisabled : {}),
          },
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
          focusStickStyle: styles.focusStickStyle as ViewStyle,
          pinCodeTextStyle: styles.pinCodeTextStyle,
        }}
        onTextChange={onChange}
        {...props}
      />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
