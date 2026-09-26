import React from 'react';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { NumberInputProps, TextInputElement } from '../FormControl';
import { useFieldFocus } from '../FormControl/useFieldFocus';
import { useStyles } from './PriceInput.styles';

export type PriceInputProps = NumberInputProps & {
  autoFocus?: boolean;
  devise?: '€';
  onChange?: NumberInputProps['onChange'];
};

export const PriceInput = React.forwardRef<TextInputElement, PriceInputProps>(function PriceInput(props, ref) {
  const { value, devise, onChange, ...inputProps } = props;

  const styles = useStyles();
  const champ = useFieldFocus({ disabled: props.disabled, readOnly: props.readOnly });

  const numberLength = value ? String(value).length : 1;

  return (
    <Box tag="price-input" style={{ ...styles.container, ...(champ.focus ? styles.containerFocused : {}) }}>
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
          onFocus={champ.handleFocus}
          onBlur={champ.handleBlur}
          placeholder="0"
          placeholderTextColor={styles.inputPlaceholder.color}
          keyboardType={'number-pad'}
          inputMode={'numeric'}
          returnKeyType="done"
          maxLength={8}
        />

        <Typography style={styles.inputDevise}>{devise || '€'}</Typography>
      </Box>
    </Box>
  );
});
