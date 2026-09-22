import React from 'react';
import { FieldFrame, FormControlNumberInput, FormControlNumberInputElement } from '../FormControl';
import { NumberFieldProps } from './NumberField';
import { useStyles } from './NumberField.styles';
import { NumberFieldControlButton } from './NumberFieldControlButton';

export const NumberField = React.forwardRef<FormControlNumberInputElement, NumberFieldProps>(
  function NumberField(props, ref) {
    const { onChange } = props;

    const styles = useStyles();

    return (
      <FieldFrame {...props} style={styles.textInput}>
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
      </FieldFrame>
    );
  },
);
