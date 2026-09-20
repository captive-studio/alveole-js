import { ReactNode } from 'react';
import { InputHeading } from '../InputHeading';
import { FormControl, FormControlProps } from './FormControl';
import { FormControlCaption } from './FormControlCaption';
import { FormControlHint } from './FormControlHint';
import { FormControlLabel } from './FormControlLabel';

// Le cadre se contente d'un sous-ensemble des props du champ, mais les recopier une par une au
// point d'appel rallongerait chaque variante d'autant : elles lui passent leurs props telles
// quelles, et il n'y lit que ce qui le concerne.
export type FieldFrameProps = {
  label?: string;
  labelRight?: ReactNode;
  hint?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  style?: FormControlProps['style'];
  children: ReactNode;
};

/**
 * L'entete (libelle, indice) et la legende d'erreur ou de succes qui entourent tout champ de
 * formulaire. Chaque variante de chaque champ les recopiait a l'identique : trois fois pour
 * DateInput, trois fois pour les selecteurs, soit six copies d'un meme echafaudage qu'une
 * correction d'accessibilite ou de mise en page devait penser a corriger partout.
 */
export const FieldFrame = ({ label, labelRight, hint, error, success, disabled, style, children }: FieldFrameProps) => (
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
