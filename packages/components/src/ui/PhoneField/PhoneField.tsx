import React from 'react';
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
import { PhoneInput } from '../PhoneInput';

export type PhoneFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
  };

export const PhoneField = React.forwardRef<TextInputElement, PhoneFieldProps>(function PhoneField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange } = props;

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <PhoneInput ref={ref} onChangeText={onChange} {...props} />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
