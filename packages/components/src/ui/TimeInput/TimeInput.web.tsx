import React from 'react';
import { FieldFrame, FormControlDateInput, FormControlDateInputElement } from '../FormControl';
import type { TimeInputProps } from './TimeInput';
import { useStyles } from './TimeInput.styles';

export const TimeInput = React.forwardRef<FormControlDateInputElement, TimeInputProps>(function TimeInput(props, ref) {
  const styles = useStyles();

  return (
    <FieldFrame {...props} style={styles.timeInput}>
      <FormControlDateInput ref={ref} {...props} type="time" />
    </FieldFrame>
  );
});
