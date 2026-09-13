import React from 'react';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  FormControlNumberInputProps,
  TextInput,
  TextInputElement,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { useStyles } from './NumberField.styles';
import { NumberFieldControlButton } from './NumberFieldControlButton';

export type NumberFieldProps = FormControlNumberInputProps &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    autoFocus?: boolean;
    onChange?: FormControlNumberInputProps['onChange'];
  } & (
    | {
        startAdornment?: React.ReactNode;
        endAdornment?: React.ReactNode;
        controlButton?: false;
      }
    | { controlButton?: true }
  );

export const NumberField = React.forwardRef<TextInputElement, NumberFieldProps>(function NumberField(props, ref) {
  const { value, label, labelRight, hint, error, success, disabled, onChange } = props;
  const { value: _v, onChange: _e, ...inputProps } = props;

  const styles = useStyles();

  return (
    <FormControl style={styles.textInput}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <TextInput
        ref={ref}
        {...inputProps}
        startAdornment={
          props.controlButton ? (
            <NumberFieldControlButton
              action="moins"
              step={props.step}
              disabled={value === 0 || (props.min != null && props.min === value)}
              onPress={add => onChange?.((value ?? 0) + add)}
            />
          ) : (
            props.startAdornment
          )
        }
        endAdornment={
          props.controlButton ? (
            <NumberFieldControlButton action="plus" step={props.step} onPress={add => onChange?.((value ?? 0) + add)} />
          ) : (
            props.endAdornment
          )
        }
        value={value ? String(value) : '0'}
        onChangeText={e => {
          onChange?.(e === '' ? 0 : Number(e));
        }}
        keyboardType={'number-pad'}
        inputMode={'numeric'}
      />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
