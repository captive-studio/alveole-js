import React from 'react';
import { FocusEvent, Keyboard, TextInput as ReactNativeTextInput } from 'react-native';

type Options = {
  disabled?: boolean | null;
  readOnly?: boolean | null;
  onFocus?: (e: FocusEvent) => void;
  onModalSubmit?: () => void;
};

/**
 * La machine a etats de la saisie en modale. Deux etats distincts, et pas un seul : la
 * modale est demandee (`isOpen`) bien avant d'etre affichee (`isReady`), et c'est la
 * couche native qui signale le passage de l'un a l'autre. Agir entre les deux viserait
 * un champ qui n'existe pas encore, d'ou le report de l'evenement de focus.
 */
export const useTextInputModal = ({ disabled, readOnly, onFocus, onModalSubmit }: Options) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const inputRef = React.useRef<ReactNativeTextInput>(null);
  const modalInputRef = React.useRef<ReactNativeTextInput>(null);
  const pendingFocusEventRef = React.useRef<FocusEvent | null>(null);

  React.useEffect(() => {
    if (!isReady || !pendingFocusEventRef.current) return;

    const event = pendingFocusEventRef.current;
    pendingFocusEventRef.current = null;
    requestAnimationFrame(() => onFocus?.(event));
  }, [isReady, onFocus]);

  const open = () => {
    if (disabled || readOnly || isOpen) return;
    setIsOpen(true);
  };

  const close = () => {
    if (!isReady) return;
    Keyboard.dismiss();
    modalInputRef.current?.blur();
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const submit = () => {
    if (!isReady) return;
    onModalSubmit?.();
    close();
  };

  const handleShow = () => {
    setIsReady(true);
    requestAnimationFrame(() => modalInputRef.current?.focus());
  };

  const handleDismiss = () => {
    setIsReady(false);
    pendingFocusEventRef.current = null;
    Keyboard.dismiss();
  };

  const handleModalFocus = (e: FocusEvent) => {
    if (!isReady) {
      pendingFocusEventRef.current = e;
      return;
    }
    onFocus?.(e);
  };

  return { isOpen, inputRef, modalInputRef, open, close, submit, handleShow, handleDismiss, handleModalFocus };
};
