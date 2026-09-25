import React from 'react';
import { adornmentsDePas } from './adornmentsDePas';
import { TextInput, TextInputElement } from './TextInput';

export type NumberInputElement = HTMLInputElement;

export type NumberInputProps = {
  value?: number | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  success?: string;
  min?: number;
  max?: number;
  step?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (value: number | null) => void;
  controlButton?: boolean;
};

/** Le natif n'a pas de champ nombre : c'est un champ texte au pave numerique, qui rend un nombre. */
export const NumberInput = React.forwardRef<TextInputElement, NumberInputProps>(function NumberInput(props, ref) {
  const { value, onChange, onKeyDown: _k, min: _min, max: _max, step: _s, controlButton: _c, ...inputProps } = props;

  return (
    <TextInput
      ref={ref}
      {...inputProps}
      {...adornmentsDePas(props)}
      value={value ? String(value) : '0'}
      onChangeText={e => onChange?.(e === '' ? 0 : Number(e))}
      keyboardType="number-pad"
      inputMode="numeric"
    />
  );
});
