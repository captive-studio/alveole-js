import React from 'react';
import { OtpInput, OtpInputProps, OtpInputRef } from 'react-native-otp-entry';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';

export type FormControlOtpInputElement = OtpInputRef;
export type FormControlOtpInputProps = Omit<OtpInputProps, 'style'> & {
  readOnly?: boolean;
};

export const FormControlOtpInput = React.forwardRef<FormControlOtpInputElement, FormControlOtpInputProps>(
  function FormControlOtpInput(props, ref) {
    const { disabled, readOnly, textInputProps, ...inputProps } = props;

    const fieldId = useFieldId();

    return (
      <Box tag="form-control-otp-input">
        <OtpInput
          ref={ref}
          disabled={disabled || readOnly}
          textInputProps={{ id: fieldId, ...textInputProps }}
          {...inputProps}
        />
      </Box>
    );
  },
);
