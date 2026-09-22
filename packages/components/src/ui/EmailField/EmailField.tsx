import React from 'react';
import { EmailInput } from '../EmailInput';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInputElement,
  TextInputProps,
} from '../FormControl';

export type EmailFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
  };

export const EmailField = React.forwardRef<TextInputElement, EmailFieldProps>(function EmailField(props, ref) {
  const { onChange } = props;

  return (
    <FieldFrame {...props}>
      <EmailInput ref={ref} onChangeText={onChange} {...props} />
    </FieldFrame>
  );
});
