import { Box } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import {
  BlurEvent,
  FocusEvent,
  Keyboard,
  Platform,
  Pressable,
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeTextInputProps,
} from 'react-native';
import { FormControlModal } from '../../core/FormControl/FormControlModal';
import { useStyles } from './TextInput.style';

export type TextInputElement = ReactNativeTextInput;
export type TextInputProps = Omit<ReactNativeTextInputProps, 'style'> & {
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  openModal?: boolean;
  modalSubmitLabel?: string;
  onModalSubmit?: () => void;
};

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>(function TextInput(props, ref) {
  const {
    disabled,
    readOnly,
    startAdornment,
    endAdornment,
    onFocus,
    onBlur,
    onPressIn,
    openModal,
    modalSubmitLabel,
    onModalSubmit,
    ...inputProps
  } = props;

  const { color } = useTheme();
  const styles = useStyles();

  const shouldUseModal = Boolean(openModal && inputProps.multiline && Platform.OS !== 'web');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalReady, setIsModalReady] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef<ReactNativeTextInput>(null);
  const modalInputRef = React.useRef<ReactNativeTextInput>(null);
  const pendingFocusEventRef = React.useRef<FocusEvent | null>(null);

  React.useImperativeHandle(ref, () => inputRef.current as ReactNativeTextInput);

  React.useEffect(() => {
    if (!shouldUseModal) return;
    setFocus(isModalOpen);
  }, [isModalOpen, shouldUseModal]);

  // Appeler onFocus une fois que la modale est prête
  React.useEffect(() => {
    if (isModalReady && pendingFocusEventRef.current) {
      const event = pendingFocusEventRef.current;
      pendingFocusEventRef.current = null;
      // Attendre un peu pour que la modale soit complètement montée
      requestAnimationFrame(() => {
        onFocus?.(event);
      });
    }
  }, [isModalReady, onFocus]);

  const focusModalInput = React.useCallback(() => {
    if (!shouldUseModal) return;
    requestAnimationFrame(() => {
      modalInputRef.current?.focus();
    });
  }, [shouldUseModal]);

  const handleFocus = (e: FocusEvent) => {
    if (shouldUseModal) {
      inputRef.current?.blur();
      onFocus?.(e);
      return;
    }
    if (!disabled && !readOnly) setFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvent) => {
    if (shouldUseModal) {
      onBlur?.(e);
      return;
    }
    if (!disabled && !readOnly) setFocus(false);
    onBlur?.(e);
  };

  const handleOpenModal = () => {
    if (!shouldUseModal || disabled || readOnly || isModalOpen) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isModalReady) return;
    Keyboard.dismiss();
    modalInputRef.current?.blur();
    setIsModalOpen(false);
    inputRef.current?.blur();
  };

  const handleModalSubmit = () => {
    if (!isModalReady) return;
    onModalSubmit?.();
    closeModal();
  };

  return (
    <Box
      tag="form-control-text-input"
      style={{
        ...styles.inputContainer,
        ...(inputProps.multiline ? { height: 'auto' } : {}),
      }}
    >
      {shouldUseModal ? (
        <Pressable
          style={{
            ...styles.inputInner,
            ...(disabled ? styles.inputDisabled : {}),
            ...(focus ? styles.inputFocused : {}),
            ...(endAdornment ? { paddingRight: 0 } : {}),
            ...(startAdornment ? { paddingLeft: 0 } : {}),
            ...(inputProps.multiline ? { paddingTop: 8 } : {}),
          }}
          onPress={handleOpenModal}
        >
          {startAdornment}

          <ReactNativeTextInput
            ref={inputRef}
            style={{
              ...styles.input,
              ...(startAdornment && endAdornment ? { textAlign: 'center' } : {}),
            }}
            readOnly
            editable={false}
            focusable={false}
            pointerEvents="none"
            showSoftInputOnFocus={false}
            caretHidden
            selectTextOnFocus={false}
            contextMenuHidden
            selectionColor="transparent"
            placeholderTextColor={color.text.inverse.muted}
            {...inputProps}
          />

          {endAdornment}
        </Pressable>
      ) : (
        <Box
          tag="form-control-text-input-inner"
          style={{
            ...styles.inputInner,
            ...(disabled ? styles.inputDisabled : {}),
            ...(focus ? styles.inputFocused : {}),
            ...(endAdornment ? { paddingRight: 0 } : {}),
            ...(startAdornment ? { paddingLeft: 0 } : {}),
            ...(inputProps.multiline ? { paddingTop: 8 } : {}),
          }}
        >
          {startAdornment}

          <ReactNativeTextInput
            ref={inputRef}
            style={{
              ...styles.input,
              ...(startAdornment && endAdornment ? { textAlign: 'center' } : {}),
            }}
            readOnly={disabled === true || readOnly === true}
            editable={inputProps.editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPressIn={onPressIn}
            showSoftInputOnFocus={inputProps.showSoftInputOnFocus}
            caretHidden={inputProps.caretHidden}
            selectTextOnFocus={inputProps.selectTextOnFocus}
            contextMenuHidden={inputProps.contextMenuHidden}
            selectionColor={inputProps.selectionColor}
            placeholderTextColor={color.text.inverse.muted}
            {...inputProps}
          />

          {endAdornment}
        </Box>
      )}

      {shouldUseModal && (
        <FormControlModal
          open={isModalOpen}
          onClose={closeModal}
          onShow={() => {
            setIsModalReady(true);
            focusModalInput();
          }}
          onDismiss={() => {
            setIsModalReady(false);
            pendingFocusEventRef.current = null;
            Keyboard.dismiss();
          }}
          submitLabel={modalSubmitLabel}
          onSubmit={onModalSubmit ? handleModalSubmit : undefined}
        >
          <Box style={styles.modalInputContainer}>
            <ReactNativeTextInput
              ref={modalInputRef}
              style={styles.modalInput}
              readOnly={disabled === true || readOnly === true}
              onFocus={e => {
                // Stocker l'événement pour l'appeler une fois que la modale est prête
                if (!isModalReady) {
                  pendingFocusEventRef.current = e;
                } else {
                  onFocus?.(e);
                }
              }}
              onBlur={onBlur}
              placeholderTextColor={color.text.inverse.muted}
              {...inputProps}
              multiline
              textAlignVertical="top"
              autoFocus
              showSoftInputOnFocus
            />
          </Box>
        </FormControlModal>
      )}
    </Box>
  );
});
