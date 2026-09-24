import React from 'react';
import { FieldFrame } from './FieldFrame';
import { FormControlCaptionProps } from './FormControlCaption';
import { FormControlHintProps } from './FormControlHint';
import { FormControlLabelProps } from './FormControlLabel';
import { TextInput, TextInputElement, TextInputProps } from './TextInput';
import { useSaisieHHMM } from './useSaisieHHMM';

export type ChampHHMMProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
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
  { label, labelRight, hint, error, success, value, onChange, onBlur, disabled, formater, clavier },
  ref,
) {
  const { localValue, handleChangeText, handleBlur } = useSaisieHHMM({ value, onChange, onBlur, formater });

  return (
    <FieldFrame label={label} labelRight={labelRight} hint={hint} error={error} success={success} disabled={disabled}>
      <TextInput
        ref={ref}
        placeholder="HH:MM"
        value={localValue}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        disabled={disabled}
        maxLength={5}
        {...clavier}
      />
    </FieldFrame>
  );
});
