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

export type DurationInputProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    disabled?: boolean;
  };

export const DurationInput = React.forwardRef<any, DurationInputProps>(function DurationInput(
  { label, labelRight, hint, error, success, value, onChange, onBlur, disabled },
  ref,
) {
  const [localValue, setLocalValue] = React.useState(value ?? '');

  React.useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  const handleChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length <= 2 ? digits : `${digits.slice(0, 2)}:${digits.slice(2)}`;
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
        inputMode="numeric"
        maxLength={5}
      />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
