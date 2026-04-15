import { Box } from '@alveole/components';
import { dateFormats, displayDate } from '@alveole/core';
import React from 'react';
import { useStyles } from './FormControl.styles';

export type FormControlDateInputElement = HTMLInputElement;
export type FormControlDateInputProps = {
  value?: string;
  type?: 'date' | 'time' | 'datetime' | 'month';
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

export const FormControlDateInput = React.forwardRef<FormControlDateInputElement, FormControlDateInputProps>(
  function DateInput(props, ref) {
    const { value, type, onChange, ...inputProps } = props;

    const styles = useStyles();

    const parsed = React.useMemo(() => {
      if (type === 'datetime' && value != null) return displayDate(value, { format: dateFormats.DateTimeString });
      if (type === 'time' && value != null) return displayDate(value, { format: dateFormats.Time, fallback: value });
      if (type === 'month' && value != null)
        return displayDate(value, { format: dateFormats.MonthString, fallback: value });
      return value;
    }, [type, value]);

    return (
      <Box tag="form-control-text-input" style={styles.inputContainer}>
        <Box
          tag="form-control-text-input-inner"
          style={{
            ...styles.inputInner,
            ...(props.disabled ? styles.inputDisabled : {}),
          }}
        >
          <input
            ref={ref}
            onChange={e => {
              const newDate = e.target.value;
              if (type === 'month') return onChange?.(newDate + '-01');
              return onChange?.(newDate);
            }}
            autoComplete={undefined}
            style={{ ...styles.input, ...styles.inputWeb }}
            type={type === 'datetime' ? 'datetime-local' : (type ?? 'date')}
            {...inputProps}
            value={parsed}
          />
        </Box>
      </Box>
    );
  },
);
