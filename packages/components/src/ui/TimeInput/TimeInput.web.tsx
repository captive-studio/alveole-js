import React from 'react';
import { FormControlDateInput, FormControlDateInputElement } from '../FormControl';
import type { TimeInputProps } from './TimeInput';

export const TimeInput = React.forwardRef<FormControlDateInputElement, TimeInputProps>(function TimeInput(props, ref) {
  return <FormControlDateInput ref={ref} {...props} type="time" />;
});
