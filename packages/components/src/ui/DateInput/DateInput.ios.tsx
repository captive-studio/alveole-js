import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { fr } from 'date-fns/locale/fr';
import { toDate } from 'date-fns/toDate';
import React, { useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Box } from '../../core/Box';
import { FieldFrame, FormControlModal, TextInput, TextInputElement } from '../FormControl';

import type { DateInputProps } from './DateInput';

const toDateString = (date: Date, datetime?: boolean) =>
  displayDate(date, { format: datetime ? DateFormats.DateTimeString : DateFormats.DateString });

// Sur iOS le selecteur vit dans une modale : la date y est choisie sans etre remontee, et
// seule la validation la publie. Ce brouillon, son ouverture et son formatage d'affichage
// sont la seule logique du composant ; les garder dans le corps de rendu melait la conduite
// de la modale a la description du champ.
const useBrouillonDate = ({
  value,
  type,
  disabled,
  onChange,
}: Pick<DateInputProps, 'value' | 'disabled' | 'onChange'> & { type: NonNullable<DateInputProps['type']> }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value ?? toDateString(new Date(), type === 'datetime'));

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

  const displayValue = useCallback(() => {
    if (!value) return '';

    return type === 'datetime'
      ? displayDate(toDate(value), { format: DateFormats.Datetime, locale: fr })
      : displayDate(toDate(value), { format: DateFormats.DateSlash });
  }, [type, value]);

  return {
    open,
    date,
    fermer: () => setOpen(false),
    handleOpen,
    handleValidate,
    displayValue,
    handleChange: (_event: DateTimePickerEvent, newDate?: Date) => {
      if (!isValidDate(newDate)) return;
      if (type === 'date') setDate(toDateString(newDate));
      else if (type === 'datetime') setDate(displayDate(newDate, { format: DateFormats.DateTimeString }));
    },
  };
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
    type = 'date',
    maximumDate,
    minimumDate,
    minuteInterval = 1,
    onChange,
    is24Hour,
    ...inputProps
  } = props;

  const { open, date, fermer, handleOpen, handleValidate, displayValue, handleChange } = useBrouillonDate({
    value,
    type,
    disabled,
    onChange,
  });

  return (
    <Box tag="date-input" onPress={handleOpen}>
      <FormControlModal open={open} onClose={fermer} submitLabel="Valider" onSubmit={handleValidate}>
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

      <FieldFrame {...props}>
        <TextInput
          ref={ref}
          placeholder="JJ/MM/AAAA"
          value={displayValue()}
          {...inputProps}
          caretHidden={true}
          inputMode="none"
          onPress={handleOpen}
          readOnly
        />
      </FieldFrame>
    </Box>
  );
});
