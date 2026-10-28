import React from 'react';
import { TextInputProps as ReactNativeTextInputProps, TextInputInstance } from 'react-native';

// Une interface, pas un alias : la declaration publiee la nomme au lieu de deplier le type
// d'instance, que React Native 0.88 ne publie que sous un chemin prive.
export interface TextInputElement extends TextInputInstance {}

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
  /** Poignee de redimensionnement du champ multiligne, web uniquement : ignoree sur natif. */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};
