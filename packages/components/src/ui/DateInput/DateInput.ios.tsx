import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { toDate } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Box } from '../../core/Box';
import {
  FormControl,
  FormControlCaption,
  FormControlHint,
  FormControlLabel,
  FormControlModal,
  TextInput,
} from '../FormControl';
import { InputHeading } from '../InputHeading';

import type { DateInputProps } from './DateInput';

const toDateString = (date: Date, datetime?: boolean) =>
  displayDate(date, { format: datetime ? DateFormats.DateTimeString : DateFormats.DateString });

export const DateInput = React.forwardRef<any, DateInputProps>(function DateInput(props, ref) {
  const {
    label,
    labelRight,
    hint,
    error,
    success,
    placeholder,
    disabled,
    value,
    type = 'date',
    maximumDate,
    minimumDate,
    minuteInterval = 1,
    onChange,
    is24Hour,
    ...inputProps
  } = props;

  const [open, setOpen] = React.useState(false);

  const now = new Date();
  const defaultDateString = value ?? toDateString(now, type === 'datetime');

  const [date, setDate] = React.useState(defaultDateString);

  const handleChange = (_event: any, newDate?: Date) => {
    if (isValidDate(newDate)) {
      if (type === 'date') setDate(toDateString(newDate));
      else if (type === 'datetime') setDate(displayDate(newDate, { format: DateFormats.DateTimeString }));
    }
  };

  const handleOpen = useCallback(() => {
    if (!disabled) {
      Keyboard.dismiss();
      setOpen(true);
    }
  }, [disabled]);

  const handleValidate = useCallback(() => {
    if (isValidDate(date)) onChange?.(date);
    setOpen(false);
  }, [date, onChange]);

  const displayValue = useCallback(
    (currentValue: string | undefined) => {
      if (currentValue) {
        if (type === 'datetime') return displayDate(toDate(currentValue), { format: DateFormats.Datetime, locale: fr });
        else return displayDate(toDate(currentValue), { format: DateFormats.DateSlash });
      }
      return '';
    },
    [type],
  );

  return (
    <Box tag="date-input" onPress={handleOpen}>
      <FormControlModal open={open} onClose={() => setOpen(false)} submitLabel="Valider" onSubmit={handleValidate}>
        <Box style={{ marginTop: 'auto' }}>
          <DateTimePicker
            value={toDate(date)}
            mode={type === 'month' ? 'date' : type}
            locale={'fr'}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            is24Hour={is24Hour}
            minuteInterval={minuteInterval}
            themeVariant="light"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
        </Box>
      </FormControlModal>

      <FormControl>
        <InputHeading>
          {!!label && (
            <FormControlLabel
              labelRight={labelRight}
              label={label}
              disabled={disabled}
              error={error}
              success={success}
            />
          )}
          {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
        </InputHeading>

        <TextInput
          ref={ref}
          placeholder="JJ/MM/AAAA"
          value={displayValue(value)}
          {...inputProps}
          caretHidden={true}
          inputMode="none"
          onPress={handleOpen}
          readOnly
        />
        {(error || success) && <FormControlCaption error={error} success={success} />}
      </FormControl>
    </Box>
  );
});
