import React from 'react';
import {
  FormControl,
  FormControlCaption,
  FormControlDateInput,
  FormControlDateInputElement,
  FormControlHint,
  FormControlLabel,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import type { TimeInputProps } from './TimeInput';
import { useStyles } from './TimeInput.styles';

export const TimeInput = React.forwardRef<FormControlDateInputElement, TimeInputProps>(function TimeInput(props, ref) {
  const { label, labelRight, hint, disabled, error, success } = props;

  const styles = useStyles();

  return (
    <FormControl style={styles.timeInput}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <FormControlDateInput ref={ref} {...props} type="time" />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
