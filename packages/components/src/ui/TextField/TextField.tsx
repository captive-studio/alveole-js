import React from 'react';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInput,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { useStyles } from './TextField.styles';

export type TextFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    type?: 'text' | 'hidden';
    onChange?: TextInputProps['onChangeText'];
  };

export const TextField = React.forwardRef<TextInputElement, TextFieldProps>(function TextField(props, ref) {
  const { onChange } = props;

  const styles = useStyles();

  const keyboardType = 'default';
  const textContentType = 'none';
  const autoCapitalize = 'sentences';
  const autoComplete = 'off';
  const inputMode = 'text';

  return (
    <FieldFrame {...props} style={styles.textField}>
      <TextInput
        ref={ref}
        keyboardType={keyboardType}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChangeText={onChange}
        {...props}
      />
    </FieldFrame>
  );
});
