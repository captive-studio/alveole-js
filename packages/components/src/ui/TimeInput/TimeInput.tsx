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
} from '../FormControl';
import { InputHeading } from '../InputHeading';

export type TimeInputProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
  };

export const TimeInput = React.forwardRef<any, TimeInputProps>(function TimeInput(
  { label, labelRight, hint, error, success, value, onChange, onBlur, disabled },
  ref,
) {
  const [localValue, setLocalValue] = React.useState(value ?? '');

  React.useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);

    let formatted: string;
    if (digits.length === 1 && parseInt(digits) >= 3) {
      // Premier chiffre ≥ 3 : les heures ne peuvent pas dépasser 23, donc on préfixe '0'
      formatted = `0${digits}:`;
    } else if (digits.length <= 2) {
      formatted = digits;
    } else {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }

    setLocalValue(formatted);
    if (digits.length === 0 || digits.length === 4) {
      onChange?.(formatted);
    }
  };

  const handleBlur = () => {
    onChange?.(localValue);
    onBlur?.();
  };

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

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

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
