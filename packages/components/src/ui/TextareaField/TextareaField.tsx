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
import { TextareaInput } from '../TextareaInput';

export type TextareaFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
    numberOfLines?: number;
  };

export const TextareaField = React.forwardRef<TextInputElement, TextareaFieldProps>(function TextareaField(props, ref) {
  const { label, labelRight, hint, error, success, disabled, onChange, onModalSubmit, onFocus } = props;

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <TextareaInput ref={ref} onChangeText={onChange} onModalSubmit={onModalSubmit} onFocus={onFocus} {...props} />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
