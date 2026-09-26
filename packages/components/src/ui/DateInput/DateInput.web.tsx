import React from 'react';
import { FormControlDateInput, FormControlDateInputElement } from '../FormControl';
import { DateInputProps } from './DateInput';

export const DateInput = React.forwardRef<FormControlDateInputElement, DateInputProps>(function DateInput(props, ref) {
  return <FormControlDateInput ref={ref} {...props} />;
});
