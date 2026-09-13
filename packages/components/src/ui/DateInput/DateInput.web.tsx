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
import { DateInputProps } from './DateInput';
import { useStyles } from './DateInput.styles';

export const DateInput = React.forwardRef<FormControlDateInputElement, DateInputProps>(function DateInput(props, ref) {
  const { label, hint, disabled, error, success } = props;

  const styles = useStyles();

  return (
    <FormControl style={styles.dateInput}>
      <InputHeading>
        {!!label && <FormControlLabel label={label} disabled={disabled} error={error} success={success} />}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <FormControlDateInput ref={ref} {...props} />

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
