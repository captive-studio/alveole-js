import { Box } from '@alveole/components';
import React from 'react';
import { useStyles } from './FormControl.styles';

export type FormControlNumberInputElement = HTMLInputElement;
export type FormControlNumberInputProps = {
  value?: number | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (value: number | null) => void;
};

export const FormControlNumberInput = React.forwardRef<FormControlNumberInputElement, FormControlNumberInputProps>(
  function DateInput(props, ref) {
    const { value, onChange, startAdornment, endAdornment, ...inputProps } = props;

    const styles = useStyles();

    return (
      <Box tag="form-control-text-input" style={styles.inputContainer}>
        <Box
          tag="form-control-text-input-inner"
          style={{
            ...styles.inputInner,
            ...(props.disabled ? styles.inputDisabled : {}),
            ...(endAdornment ? { paddingRight: 0 } : {}),
            ...(startAdornment ? { paddingLeft: 0 } : {}),
          }}
        >
          {startAdornment}

          <input
            ref={ref}
            value={value ?? ''}
            onChange={e => {
              const newValue = e.target.value;
              onChange?.(newValue === '' ? null : Number(newValue));
            }}
            type="number"
            style={{
              ...styles.input,
              ...styles.inputWeb,
              ...(endAdornment && startAdornment ? { textAlign: 'center' } : {}),
            }}
            {...inputProps}
          />

          {endAdornment}
        </Box>
      </Box>
    );
  },
);
