import React from 'react';
import { TextInput as ReactNativeTextInput, TextInputProps as ReactNativeTextInputProps } from 'react-native';

export type TextInputElement = ReactNativeTextInput;

export type TextInputProps = Omit<ReactNativeTextInputProps, 'style'> & {
  // ADR 0026 : la nature de la valeur, a la maniere de l'attribut HTML `type`.
  type?: 'text' | 'email' | 'tel' | 'password';
  disabled?: boolean;
  // Le cadre porte la couleur de validation, pas seulement la legende sous le champ : les
  // composants de la famille passaient deja `error` et `success` a leur champ, ou ils
  // finissaient en attribut inerte.
  error?: string;
  success?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  openModal?: boolean;
  modalSubmitLabel?: string;
  onModalSubmit?: () => void;
};
