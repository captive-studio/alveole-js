import React from 'react';
import {
  FieldFrame,
  formaterHHMM,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInput,
  TextInputElement,
  useSaisieHHMM,
} from '../FormControl';

export type DurationInputProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
  };

export const DurationInput = React.forwardRef<TextInputElement, DurationInputProps>(function DurationInput(
  { label, labelRight, hint, error, success, value, onChange, onBlur, disabled },
  ref,
) {
  const { localValue, handleChangeText, handleBlur } = useSaisieHHMM({
    value,
    onChange,
    onBlur,
    formater: formaterHHMM,
  });

  return (
    <FieldFrame label={label} labelRight={labelRight} hint={hint} error={error} success={success} disabled={disabled}>
      <TextInput
        ref={ref}
        placeholder="HH:MM"
        value={localValue}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        disabled={disabled}
        inputMode="numeric"
        maxLength={5}
      />
    </FieldFrame>
  );
});
