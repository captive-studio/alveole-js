import React from 'react';
import { TextInput, TextInputProps } from '../FormControl';
import { TextField } from '../TextField';

// Champ nu, sans libellé : c'est FormControl qui porte le libellé et le relie au champ,
// et TextareaField qui fait cette composition. Hériter de TextFieldProps exposait ici un
// `label` que rien ne rendait, et qui finissait en attribut DOM inerte.
export type TextareaInputProps = TextInputProps & {
  numberOfLines?: number;
  onModalSubmit?: () => void;
};

export const TextareaInput = React.forwardRef<React.ElementRef<typeof TextField>, TextareaInputProps>(
  function TextareaInput(props, ref) {
    const { numberOfLines = 5, multiline = true, onModalSubmit, onFocus, openModal, modalSubmitLabel, ...rest } = props;

    return (
      <TextInput
        ref={ref}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...rest}
        openModal={openModal ?? true}
        modalSubmitLabel={modalSubmitLabel ?? 'Valider'}
        onModalSubmit={onModalSubmit}
        onFocus={onFocus}
      />
    );
  },
);
