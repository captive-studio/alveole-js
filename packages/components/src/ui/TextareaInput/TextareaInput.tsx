import React from 'react';
import { TextInput } from '../FormControl';
import { TextField, TextFieldProps } from '../TextField';

export type TextareaInputProps = TextFieldProps & {
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
