import React from 'react';
import { TextInput, TextInputElement, TextInputProps } from '../FormControl';

export type EmailInputProps = TextInputProps & {
  onChange?: TextInputProps['onChangeText'];
};

export const EmailInput = React.forwardRef<TextInputElement, EmailInputProps>(function EmailInput(props, ref) {
  const { onChange } = props;

  const handleChange: TextInputProps['onChangeText'] = value => {
    onChange?.(value.toLowerCase());
  };

  return (
    <TextInput
      ref={ref}
      onChangeText={handleChange}
      keyboardType="email-address"
      textContentType="emailAddress"
      autoCapitalize="none"
      autoComplete="email"
      inputMode="email"
      {...props}
      autoCorrect={false}
    />
  );
});
