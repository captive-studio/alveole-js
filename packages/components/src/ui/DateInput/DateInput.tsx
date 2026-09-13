import DateTimePicker from '@react-native-community/datetimepicker';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { Box } from '../../core/Box';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  TextInput,
  TextInputProps,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { DateFormats, displayDate, isValidDate } from './dateUtils';

type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;

export type DateInputProps = TextInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    type?: 'date' | 'datetime' | 'month';
    display?: 'default' | 'spinner';
    value?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    onChange?: (date: string) => void;
    is24Hour?: boolean;
    minuteInterval?: MinuteInterval;
  };

export const DateInput = React.forwardRef<any, DateInputProps>(function DateInput(
  {
    label,
    labelRight,
    hint,
    error,
    success,
    placeholder,
    disabled,
    value,
    maximumDate,
    minimumDate,
    minuteInterval = 1,
    is24Hour,
    display,
    type = 'date',
    onChange,
    ...props
  },
  ref,
) {
  const [showPicker, setShowPicker] = useState(false);
  const [isHours, setIsHours] = useState(false);

  const selectedDate = React.useMemo(() => (value ? new Date(value) : new Date()), [value]);

  const mode = useMemo(() => {
    if (type === 'date') return type;
    if (isHours) return 'time';
    return 'date';
  }, [isHours, type]);

  const handleChange = (event: { type: string }, date?: Date) => {
    if (event.type === 'dismissed') {
      setIsHours(false);
      setShowPicker(false);
      return;
    }

    if (event.type === 'set' && isValidDate(date)) {
      setShowPicker(false);

      if (type === 'datetime' && !isHours) {
        const currentHours = getHours(new Date());
        const currentMinutes = getMinutes(new Date());

        const newDate = displayDate(setMinutes(setHours(date, currentHours), currentMinutes), {
          format: DateFormats.DateTimeString,
        });
        onChange?.(newDate);

        setIsHours(true);
        setShowPicker(true);
        return;
      } else if (type === 'datetime') {
        const newDate = displayDate(setMinutes(setHours(selectedDate, getHours(date)), getMinutes(date)), {
          format: DateFormats.DateTimeString,
        });
        onChange?.(newDate);
        setIsHours(false);
        setShowPicker(false);
        return;
      }

      const newDate = displayDate(date, { format: DateFormats.DateString });
      onChange?.(newDate);
      setIsHours(false);
      setShowPicker(false);
    }
  };

  const handleOpen = React.useCallback(() => {
    if (!disabled) {
      Keyboard.dismiss();
      setShowPicker(true);
    }
  }, [disabled]);

  const displayValue = useCallback(
    (value: string | undefined) => {
      if (type === 'datetime') {
        if (value == null) return 'Sélectionnez une date';
        return displayDate(selectedDate, { format: DateFormats.Datetime });
      }

      if (value == null) return 'JJ/MM/AAAA';
      return displayDate(selectedDate, { format: DateFormats.DateSlash });
    },
    [selectedDate, type],
  );

  return (
    <Box tag="date-input" onPress={handleOpen}>
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
          {...props}
          readOnly
          onPress={handleOpen}
          caretHidden={true}
          inputMode="none"
        />

        {!!showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode={mode}
            locale={'fr'}
            display={display ?? 'default'}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            onChange={handleChange}
            is24Hour={is24Hour}
            minuteInterval={minuteInterval}
          />
        )}

        {(error || success) && <FormControlCaption error={error} success={success} />}
      </FormControl>
    </Box>
  );
});
