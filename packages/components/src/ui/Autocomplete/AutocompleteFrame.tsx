import { StyleValue } from '@alveole/theme';
import { ReactNode } from 'react';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { AutocompleteProps } from './Autocomplete.types';

type Props = Pick<AutocompleteProps, 'label' | 'labelRight' | 'hint' | 'error' | 'success' | 'disabled'> & {
  style?: StyleValue;
  children: ReactNode;
};

/**
 * L'etiquette, l'aide et le message d'etat qui entourent le champ.
 *
 * Les deux plateformes le composaient a l'identique, jusqu'aux memes conditions : c'est la
 * partie du composant qui ne depend pas du tout de la facon de choisir, et qui n'avait donc
 * aucune raison d'etre ecrite deux fois.
 */
export const AutocompleteFrame = ({ label, labelRight, hint, error, success, disabled, style, children }: Props) => (
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
