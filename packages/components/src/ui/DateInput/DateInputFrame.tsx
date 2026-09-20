import { ReactNode } from 'react';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel, FormControlProps } from '../FormControl';
import { InputHeading } from '../InputHeading';

import type { DateInputProps } from './DateInput';

// L'habillage se contente d'un sous-ensemble des props de DateInput, mais les recopier une par
// une au point d'appel rallongeait les trois variantes d'autant : elles lui passent leurs props
// telles quelles, et le cadre n'y lit que ce qui le concerne.
export type DateInputFrameProps = Omit<Partial<DateInputProps>, 'style' | 'children'> & {
  style?: FormControlProps['style'];
  children: ReactNode;
};

// Les trois variantes de DateInput (generique, iOS, web) n'ont de propre que le selecteur de
// date : l'entete (libelle, indice) et la legende d'erreur ou de succes y etaient recopiees a
// l'identique. Trois copies d'un meme echafaudage, qu'une correction d'accessibilite ou de
// mise en page devait penser a corriger trois fois.
export const DateInputFrame = ({
  label,
  labelRight,
  hint,
  error,
  success,
  disabled,
  style,
  children,
}: DateInputFrameProps) => (
  <FormControl style={style}>
    <InputHeading>
      {!!label && (
        <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
      )}
      {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
    </InputHeading>

    {children}

    {(error || success) && <FormControlCaption error={error} success={success} />}
  </FormControl>
);
