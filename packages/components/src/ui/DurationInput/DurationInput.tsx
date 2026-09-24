import React from 'react';
import { formaterHHMM, TextInputElement } from '../FormControl';
import { ChampHHMM, ChampHHMMProps } from '../FormControl/ChampHHMM';

export type DurationInputProps = ChampHHMMProps;

export const DurationInput = React.forwardRef<TextInputElement, DurationInputProps>(function DurationInput(props, ref) {
  return <ChampHHMM ref={ref} {...props} formater={formaterHHMM} clavier={{ inputMode: 'numeric' }} />;
});
