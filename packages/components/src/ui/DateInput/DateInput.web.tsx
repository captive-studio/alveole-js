import React from 'react';
import { FormControlDateInput, FormControlDateInputElement } from '../FormControl';
import { DateInputProps } from './DateInput';
import { useStyles } from './DateInput.styles';
import { DateInputFrame } from './DateInputFrame';

export const DateInput = React.forwardRef<FormControlDateInputElement, DateInputProps>(function DateInput(props, ref) {
  const styles = useStyles();

  return (
    <DateInputFrame {...props} style={styles.dateInput}>
      <FormControlDateInput ref={ref} {...props} />
    </DateInputFrame>
  );
});
