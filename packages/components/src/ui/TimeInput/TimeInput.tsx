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

export type TimeInputProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
  };

const formaterHeure = (chiffres: string) => {
  // Premier chiffre ≥ 3 : les heures ne peuvent pas dépasser 23, donc on préfixe '0'
  if (chiffres.length === 1 && parseInt(chiffres) >= 3) return `0${chiffres}:`;
  return formaterHHMM(chiffres);
};

export const TimeInput = React.forwardRef<TextInputElement, TimeInputProps>(function TimeInput(
  { label, labelRight, hint, error, success, value, onChange, onBlur, disabled },
  ref,
) {
  const { localValue, handleChangeText, handleBlur } = useSaisieHHMM({
    value,
    onChange,
    onBlur,
    formater: formaterHeure,
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
        keyboardType="number-pad"
        maxLength={5}
      />
    </FieldFrame>
  );
});
