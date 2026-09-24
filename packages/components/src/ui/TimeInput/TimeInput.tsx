import React from 'react';
import { formaterHHMM, TextInputElement } from '../FormControl';
import { ChampHHMM, ChampHHMMProps } from '../FormControl/ChampHHMM';

export type TimeInputProps = ChampHHMMProps;

const formaterHeure = (chiffres: string) => {
  // Premier chiffre ≥ 3 : les heures ne peuvent pas dépasser 23, donc on préfixe '0'
  if (chiffres.length === 1 && parseInt(chiffres) >= 3) return `0${chiffres}:`;
  return formaterHHMM(chiffres);
};

export const TimeInput = React.forwardRef<TextInputElement, TimeInputProps>(function TimeInput(props, ref) {
  return <ChampHHMM ref={ref} {...props} formater={formaterHeure} clavier={{ keyboardType: 'number-pad' }} />;
});
