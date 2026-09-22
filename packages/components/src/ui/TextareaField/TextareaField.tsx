import React from 'react';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInputElement,
  TextInputProps,
} from '../FormControl';
import { TextareaInput } from '../TextareaInput';

export type TextareaFieldProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    onChange?: TextInputProps['onChangeText'];
    numberOfLines?: number;
  };

export const TextareaField = React.forwardRef<TextInputElement, TextareaFieldProps>(function TextareaField(props, ref) {
  const { onChange, onModalSubmit, onFocus } = props;

  return (
    <FieldFrame {...props}>
      <TextareaInput ref={ref} onChangeText={onChange} onModalSubmit={onModalSubmit} onFocus={onFocus} {...props} />
    </FieldFrame>
  );
});
