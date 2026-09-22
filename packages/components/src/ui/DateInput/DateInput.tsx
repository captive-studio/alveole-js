import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getHours } from 'date-fns/getHours';
import { getMinutes } from 'date-fns/getMinutes';
import { fr } from 'date-fns/locale/fr';
import { setHours } from 'date-fns/setHours';
import { setMinutes } from 'date-fns/setMinutes';
import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { Box } from '../../core/Box';
import {
  FieldFrame,
  FormControlCaptionProps,
  FormControlHintProps,
  FormControlLabelProps,
  TextInput,
  TextInputElement,
  TextInputProps,
} from '../FormControl';

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

// Le selecteur natif ne sait demander qu'une chose a la fois : en mode `datetime`, il faut le
// rouvrir en mode heure apres la date, et chaque etape doit remettre les deux drapeaux dans le
// bon etat. Cette machine a etats occupait les deux tiers du composant et se lisait au milieu
// du rendu ; isolee, elle expose exactement ce dont le rendu a besoin.
const useSelecteurDate = ({
  value,
  type,
  disabled,
  onChange,
}: Pick<DateInputProps, 'value' | 'disabled' | 'onChange'> & { type: NonNullable<DateInputProps['type']> }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isHours, setIsHours] = useState(false);

  const selectedDate = useMemo(() => (value ? new Date(value) : new Date()), [value]);

  const mode = useMemo<'date' | 'time'>(() => {
    if (type === 'date') return type;
    if (isHours) return 'time';
    return 'date';
  }, [isHours, type]);

  const fermer = (heures: boolean) => {
    setIsHours(heures);
    setShowPicker(false);
  };

  const handleChange = (event: { type: string }, date?: Date) => {
    if (event.type === 'dismissed') return fermer(false);
    if (event.type !== 'set' || !isValidDate(date)) return;

    if (type === 'datetime' && !isHours) {
      const maintenant = new Date();

      onChange?.(
        displayDate(setMinutes(setHours(date, getHours(maintenant)), getMinutes(maintenant)), {
          format: DateFormats.DateTimeString,
        }),
      );

      setIsHours(true);
      setShowPicker(true);
      return;
    }

    if (type === 'datetime') {
      onChange?.(
        displayDate(setMinutes(setHours(selectedDate, getHours(date)), getMinutes(date)), {
          format: DateFormats.DateTimeString,
        }),
      );
    } else {
      onChange?.(displayDate(date, { format: DateFormats.DateString }));
    }

    fermer(false);
  };

  const handleOpen = useCallback(() => {
    if (!disabled) {
      Keyboard.dismiss();
      setShowPicker(true);
    }
  }, [disabled]);

  const displayValue = useCallback(() => {
    if (type === 'datetime') {
      if (value == null) return 'Sélectionnez une date';
      return displayDate(selectedDate, { format: DateFormats.Datetime, locale: fr });
    }

    if (value == null) return 'JJ/MM/AAAA';
    return displayDate(selectedDate, { format: DateFormats.DateSlash });
  }, [selectedDate, type, value]);

  return { showPicker, mode, selectedDate, handleChange, handleOpen, displayValue };
};

export const DateInput = React.forwardRef<TextInputElement, DateInputProps>(function DateInput(props, ref) {
  const {
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
    ...inputProps
  } = props;

  const { showPicker, mode, selectedDate, handleChange, handleOpen, displayValue } = useSelecteurDate({
    value,
    type,
    disabled,
    onChange,
  });

  return (
    <Box tag="date-input" onPress={handleOpen}>
      <FieldFrame {...props}>
        <TextInput
          ref={ref}
          placeholder="JJ/MM/AAAA"
          value={displayValue()}
          {...inputProps}
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
      </FieldFrame>
    </Box>
  );
});
