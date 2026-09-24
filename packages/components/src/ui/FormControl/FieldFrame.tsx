import { ReactNode } from 'react';
import { FormControl, FormControlProps } from './FormControl';

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
 * Le pont des champs `*Field` vers FormControl, le temps qu'ils disparaissent (ADR 0026).
 */
export const FieldFrame = ({ label, labelRight, hint, error, success, disabled, style, children }: FieldFrameProps) => (
  <FormControl
    label={label}
    labelRight={labelRight}
    hint={hint}
    error={error}
    success={success}
    disabled={disabled}
    style={style}
  >
    {children}
  </FormControl>
);
