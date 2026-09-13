import React from 'react';
import { EmailInput } from '../EmailInput';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { InputHeading } from '../InputHeading';

export type EmailFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
  };

export const EmailField = React.forwardRef<TextInputElement, EmailFieldProps>(function EmailField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange } = props;

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <EmailInput ref={ref} onChangeText={onChange} {...props} />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
