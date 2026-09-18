import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FormControl, FormControlNumberInputElement } from '../FormControl';
import { useFieldFocus } from '../FormControl/useFieldFocus';
import type { PriceInputProps } from './PriceInput';
import './PriceInput.css';
import { useStyles } from './PriceInput.styles';

const MAX_VALUE = 99_999_999;

export const PriceInput = React.forwardRef<FormControlNumberInputElement, PriceInputProps>(
  function PriceInput(props, ref) {
    const { devise, autoFocus, value, disabled, readOnly, onChange } = props;

    const styles = useStyles();
    const champ = useFieldFocus({ disabled, readOnly });

    const numberLength = value ? String(value).length : 1;

    return (
      <FormControl style={{ ...styles.container, ...(champ.focus ? styles.containerFocused : {}) }}>
        <Box tag="price-input-container" style={styles.priceInputContainer}>
          <input
            ref={ref}
            autoFocus={autoFocus}
            className="alveole-price-input"
            style={{
              ...styles.input,
              fontVariantNumeric: 'tabular-nums',
              width: numberLength * 36,
              lineHeight: 'inherit',
              maxWidth: '100%',
            }}
            value={value ?? ''}
            placeholder="0"
            onChange={e => {
              const newValue = e.target.value;
              onChange?.(newValue === '' ? null : Number(newValue));
            }}
            onFocus={champ.handleFocus}
            onBlur={champ.handleBlur}
            type="number"
            max={MAX_VALUE}
          />

          <Typography style={styles.inputDevise}>{devise || '€'}</Typography>
        </Box>
      </FormControl>
    );
  },
);
