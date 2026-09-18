import React from 'react';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';
import { inputFrameStyle } from './textInputStyles';
import { useFieldFocus } from './useFieldFocus';

export type FormControlDateInputElement = HTMLInputElement;
export type FormControlDateInputProps = {
  value?: string;
  type?: 'date' | 'time' | 'datetime' | 'month';
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  success?: string;
  onChange?: (value: string) => void;
};

function formatForInput(value: string, type?: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (type === 'datetime')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (type === 'time') return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (type === 'month') return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  return value;
}

export const FormControlDateInput = React.forwardRef<FormControlDateInputElement, FormControlDateInputProps>(
  function DateInput(props, ref) {
    const { value, type, error, success, onChange, ...inputProps } = props;

    const styles = useStyles();
    const fieldId = useFieldId();
    const champ = useFieldFocus({ disabled: props.disabled, readOnly: props.readOnly });

    const parsed = React.useMemo(() => {
      if (value == null) return value;
      if (type === 'datetime') {
        const d = new Date(value);
        if (isNaN(d.getTime())) return '';
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      }
      if (type === 'time') return formatForInput(value, 'time');
      if (type === 'month') return formatForInput(value, 'month');
      return value;
    }, [type, value]);

    return (
      <Box tag="form-control-date-input" style={styles.inputContainer}>
        <Box
          tag="form-control-date-input-inner"
          style={inputFrameStyle(styles, { disabled: props.disabled, focus: champ.focus, error, success })}
        >
          <input
            ref={ref}
            id={fieldId}
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
            onFocus={champ.handleFocus}
            onBlur={champ.handleBlur}
          />
        </Box>
      </Box>
    );
  },
);
