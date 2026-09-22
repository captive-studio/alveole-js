import React from 'react';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { PhoneInput } from '../PhoneInput';

export type PhoneFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
  };

export const PhoneField = React.forwardRef<TextInputElement, PhoneFieldProps>(function PhoneField(props, ref) {
  const { onChange } = props;

  return (
    <FieldFrame {...props}>
      <PhoneInput ref={ref} onChangeText={onChange} {...props} />
    </FieldFrame>
  );
});
