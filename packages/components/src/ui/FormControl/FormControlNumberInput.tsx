import React from 'react';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';
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
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (value: number | null) => void;
};

export const FormControlNumberInput = React.forwardRef<FormControlNumberInputElement, FormControlNumberInputProps>(
  function DateInput(props, ref) {
    const { value, onChange, startAdornment, endAdornment, ...inputProps } = props;

    const styles = useStyles();
    const fieldId = useFieldId();
    const [focus, setFocus] = React.useState(false);

    const handleFocus = () => {
      if (!props.disabled && !props.readOnly) setFocus(true);
    };
    const handleBlur = () => {
      if (!props.disabled && !props.readOnly) setFocus(false);
    };

    return (
      <Box tag="form-control-number-input" style={styles.inputContainer}>
        <Box
          tag="form-control-number-input-inner"
          style={{
            ...styles.inputInner,
            ...(props.disabled ? styles.inputDisabled : {}),
            ...(focus ? styles.inputFocused : {}),
            ...(endAdornment ? { paddingRight: 0 } : {}),
            ...(startAdornment ? { paddingLeft: 0 } : {}),
          }}
        >
          {startAdornment}

          <input
            ref={ref}
            id={fieldId}
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
              ...(endAdornment ? { minWidth: 0 } : {}),
            }}
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {endAdornment}
        </Box>
      </Box>
    );
  },
);
