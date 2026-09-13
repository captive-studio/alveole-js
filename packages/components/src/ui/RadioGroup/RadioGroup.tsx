import React from 'react';
import { TamaguiElement, RadioGroup as TamaguiRadioGroup, RadioGroupProps as TamaguiRadioGroupProps } from 'tamagui';
import { Box } from '../../core/Box';
import {
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
} from '../FormControl';
import { useStyles } from './RadioGroup.styles';
import { RadioGroupContext } from './RadioGroupContext';

export type RadioGroupElement = TamaguiElement;

export type RadioGroupProps = Omit<TamaguiRadioGroupProps, 'value' | 'onValueChange' | 'direction'> &
  FormControlCaptionProps &
  FormControlLabelProps &
  FormControlHintProps & {
    label?: string;
    value?: TamaguiRadioGroupProps['value'];
    onChange?: TamaguiRadioGroupProps['onValueChange'];
    variant?: 'default' | 'card';
  };

export const RadioGroup = React.forwardRef<RadioGroupElement, RadioGroupProps>(function RadioGroup(props, ref) {
  const {
    children,
    value,
    label,
    labelRight,
    hint,
    error,
    success,
    disabled,
    onChange,
    variant = 'default',
    ...groupProps
  } = props;

  const styles = useStyles();

  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <Box tag="radio-group" style={styles.container}>
        <Box tag="radio-group-heading">
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
        </Box>

        <Box width={'100%'}>
          <TamaguiRadioGroup
            orientation="vertical"
            ref={ref}
            value={value}
            onValueChange={onChange}
            style={[styles.group, variant === 'card' ? styles.groupCard : styles.groupItem]}
            width="100%"
            {...groupProps}
            minWidth={'100%'}
          >
            {children}
          </TamaguiRadioGroup>
        </Box>

        {(error || success) && <FormControlCaption error={error} success={success} />}
      </Box>
    </RadioGroupContext.Provider>
  );
});
