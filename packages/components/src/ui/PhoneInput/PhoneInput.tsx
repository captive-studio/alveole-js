import React from 'react';
import { TextInput, TextInputElement, TextInputProps } from '../FormControl';

export type PhoneInputProps = TextInputProps & {
  onChange?: TextInputProps['onChangeText'];
};

export const PhoneInput = React.forwardRef<TextInputElement, PhoneInputProps>(function PhoneInput(props, ref) {
  const { onChange } = props;

  return (
    <TextInput
      ref={ref}
      onChangeText={onChange}
      keyboardType="phone-pad"
      textContentType="telephoneNumber"
      autoCapitalize="none"
      autoComplete="tel"
      inputMode="tel"
      {...props}
      autoCorrect={false}
    />
  );
});
