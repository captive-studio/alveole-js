import React from 'react';
import { FormControlCaptionProps } from './FormControlCaption';
import { TextInput, TextInputElement, TextInputProps } from './TextInput';
import { useSaisieHHMM } from './useSaisieHHMM';

export type ChampHHMMProps = FormControlCaptionProps & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
};

type ChampHHMMConfig = {
  formater: (chiffres: string) => string;
  clavier: Pick<TextInputProps, 'inputMode' | 'keyboardType'>;
};

/** Un champ HH:MM saisi au clavier. Seuls la mise en forme et le clavier changent d'un usage a l'autre. */
export const ChampHHMM = React.forwardRef<TextInputElement, ChampHHMMProps & ChampHHMMConfig>(function ChampHHMM(
  { error, success, value, onChange, onBlur, disabled, formater, clavier },
  ref,
) {
  const { localValue, handleChangeText, handleBlur } = useSaisieHHMM({ value, onChange, onBlur, formater });

  return (
    <TextInput
      ref={ref}
      placeholder="HH:MM"
      value={localValue}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      disabled={disabled}
      error={error}
      success={success}
      maxLength={5}
      {...clavier}
    />
  );
});
