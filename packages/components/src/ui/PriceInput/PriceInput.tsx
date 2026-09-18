import React from 'react';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FormControl, FormControlNumberInputProps, TextInputElement } from '../FormControl';
import { useStyles } from './PriceInput.styles';

export type PriceInputProps = FormControlNumberInputProps & {
  autoFocus?: boolean;
  devise?: '€';
  onChange?: FormControlNumberInputProps['onChange'];
};

export const PriceInput = React.forwardRef<TextInputElement, PriceInputProps>(function PriceInput(props, ref) {
  const { value, devise, onChange, ...inputProps } = props;

  const styles = useStyles();
  const [focus, setFocus] = React.useState(false);

  const numberLength = value ? String(value).length : 1;

  return (
    <FormControl style={{ ...styles.container, ...(focus ? styles.containerFocused : {}) }}>
      <Box tag="price-input-container" style={styles.priceInputContainer}>
        <ReactNativeTextInput
          ref={ref}
          style={{
            ...styles.input,
            minWidth: numberLength * 36,
          }}
          {...inputProps}
          value={Number.isNaN(value) || value == null ? '' : String(value)}
          onChangeText={e => {
            onChange?.(e === '' ? null : Number(e));
          }}
          onFocus={() => {
            if (!props.disabled && !props.readOnly) setFocus(true);
          }}
          onBlur={() => {
            if (!props.disabled && !props.readOnly) setFocus(false);
          }}
          placeholder="0"
          placeholderTextColor={styles.inputPlaceholder.color}
          keyboardType={'number-pad'}
          inputMode={'numeric'}
          returnKeyType="done"
          maxLength={8}
        />

        <Typography style={styles.inputDevise}>{devise || '€'}</Typography>
      </Box>
    </FormControl>
  );
});
