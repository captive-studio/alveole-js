import React from 'react';
import { FieldFrame, FormControlDateInput, FormControlDateInputElement } from '../FormControl';
import { DateInputProps } from './DateInput';
import { useStyles } from './DateInput.styles';

export const DateInput = React.forwardRef<FormControlDateInputElement, DateInputProps>(function DateInput(props, ref) {
  const styles = useStyles();

  return (
    <FieldFrame {...props} style={styles.dateInput}>
      <FormControlDateInput ref={ref} {...props} />
    </FieldFrame>
  );
});
