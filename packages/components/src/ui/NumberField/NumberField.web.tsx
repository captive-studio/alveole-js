import React from 'react';
import {
  FormControl,
  FormControlCaption,
  FormControlHint,
  FormControlLabel,
  FormControlNumberInput,
  FormControlNumberInputElement,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { NumberFieldProps } from './NumberField';
import { useStyles } from './NumberField.styles';
import { NumberFieldControlButton } from './NumberFieldControlButton';

export const NumberField = React.forwardRef<FormControlNumberInputElement, NumberFieldProps>(
  function NumberField(props, ref) {
    const { label, labelRight, hint, error, success, disabled, onChange } = props;

    const styles = useStyles();

    return (
      <FormControl style={styles.textInput}>
        <InputHeading>
          {!!label && (
            <FormControlLabel
              labelRight={labelRight}
              label={label}
              disabled={disabled}
              error={error}
              success={success}
            />
          )}
          {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
        </InputHeading>

        <FormControlNumberInput
          ref={ref}
          onChange={onChange}
          {...props}
          startAdornment={
            props.controlButton ? (
              <NumberFieldControlButton
                action="moins"
                step={props.step}
                disabled={props.value === 0 || (props.min != null && props.min === props.value)}
                onPress={add => onChange?.((props.value ?? 0) + add)}
              />
            ) : (
              props.startAdornment
            )
          }
          endAdornment={
            props.controlButton ? (
              <NumberFieldControlButton
                action="plus"
                step={props.step}
                onPress={add => onChange?.((props.value ?? 0) + add)}
              />
            ) : (
              props.endAdornment
            )
          }
        />

        {(error || success) && <FormControlCaption error={error} success={success} />}
      </FormControl>
    );
  },
);
