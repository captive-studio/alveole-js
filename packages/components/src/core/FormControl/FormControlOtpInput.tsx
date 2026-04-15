import { Box } from '@alveole/components';
import React from 'react';
import { OtpInput, OtpInputProps, OtpInputRef } from 'react-native-otp-entry';

export type FormControlOtpInputElement = OtpInputRef;
export type FormControlOtpInputProps = Omit<OtpInputProps, 'style'> & {
  readOnly?: boolean;
};

export const FormControlOtpInput = React.forwardRef<FormControlOtpInputElement, FormControlOtpInputProps>(
  function FormControlOtpInput(props, ref) {
    const { disabled, readOnly, ...inputProps } = props;

    return (
      <Box tag="form-control-otp-input">
        <OtpInput ref={ref} disabled={disabled || readOnly} {...inputProps} />
      </Box>
    );
  },
);
