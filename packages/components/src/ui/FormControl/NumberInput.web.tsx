import React from 'react';
import { Box } from '../../core/Box';
import { useFieldId } from './FieldId';
import { useStyles } from './FormControl.styles';
import type { NumberInputProps } from './NumberInput';
import { adornmentsDePas } from './adornmentsDePas';
import { inputFrameStyle } from './textInputStyles';
import { useFieldFocus } from './useFieldFocus';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
  const {
    value,
    error,
    success,
    onChange,
    controlButton: _c,
    startAdornment: _d,
    endAdornment: _f,
    ...inputProps
  } = props;
  const { startAdornment, endAdornment } = adornmentsDePas(props);

  const styles = useStyles();
  const fieldId = useFieldId();
  const champ = useFieldFocus({ disabled: props.disabled, readOnly: props.readOnly });

  return (
    <Box tag="form-control-number-input" style={styles.inputContainer}>
      <Box
        tag="form-control-number-input-inner"
        style={inputFrameStyle(styles, {
          disabled: props.disabled,
          focus: champ.focus,
          error,
          success,
          startAdornment,
          endAdornment,
        })}
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
          onFocus={champ.handleFocus}
          onBlur={champ.handleBlur}
        />

        {endAdornment}
      </Box>
    </Box>
  );
});
