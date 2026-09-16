import React from 'react';
import { TextInput as ReactNativeTextInput, TextInputProps as ReactNativeTextInputProps } from 'react-native';

export type TextInputElement = ReactNativeTextInput;

export type TextInputProps = Omit<ReactNativeTextInputProps, 'style'> & {
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  openModal?: boolean;
  modalSubmitLabel?: string;
  onModalSubmit?: () => void;
};
