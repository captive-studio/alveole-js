import React from 'react';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  TextInput,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { useStyles } from './TextField.styles';

export type TextFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    type?: 'text' | 'hidden';
    onChange?: TextInputProps['onChangeText'];
  };

export const TextField = React.forwardRef<TextInputElement, TextFieldProps>(function TextField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange } = props;

  const styles = useStyles();

  const keyboardType = 'default';
  const textContentType = 'none';
  const autoCapitalize = 'sentences';
  const autoComplete = 'off';
  const inputMode = 'text';

  return (
    <FormControl style={styles.textField}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

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

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
