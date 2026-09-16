import { useTheme } from '@alveole/theme';
import React from 'react';
import { TextInput as ReactNativeTextInput, StyleProp, TextStyle } from 'react-native';
import { Box } from '../../core/Box';
import { useStyles } from './FormControl.styles';
import { FormControlModal } from './FormControlModal';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { TextInputMirror } from './TextInputMirror';
import { useTextInputModal } from './useTextInputModal';

/**
 * La saisie deportee en modale, hors web : le champ du formulaire n'est plus qu'un miroir
 * qu'on presse, et la vraie saisie vit dans la modale. Un champ multiligne tient mal dans
 * un formulaire mobile ; l'agrandir sur place repousserait le reste hors de l'ecran, la
 * modale lui donne la hauteur sans deranger la page.
 */
export const TextInputModal = React.forwardRef<TextInputElement, TextInputProps>(function TextInputModal(props, ref) {
  const { disabled, readOnly, onFocus, onBlur, modalSubmitLabel, onModalSubmit, ...rest } = props;

  const { color } = useTheme();
  const styles = useStyles();
  const modal = useTextInputModal({ disabled, readOnly, onFocus, onModalSubmit });

  React.useImperativeHandle(ref, () => modal.inputRef.current as ReactNativeTextInput);

  return (
    <>
      <TextInputMirror ref={modal.inputRef} disabled={disabled} isOpen={modal.isOpen} onOpen={modal.open} {...rest} />

      <FormControlModal
        open={modal.isOpen}
        onClose={modal.close}
        onShow={modal.handleShow}
        onDismiss={modal.handleDismiss}
        submitLabel={modalSubmitLabel}
        onSubmit={onModalSubmit ? modal.submit : undefined}
      >
        <Box style={styles.modalInputContainer}>
          <ReactNativeTextInput
            ref={modal.modalInputRef}
            style={styles.modalInput as StyleProp<TextStyle>}
            readOnly={disabled === true || readOnly === true}
            onFocus={modal.handleModalFocus}
            onBlur={onBlur}
            placeholderTextColor={color.text.inverse.muted}
            {...rest}
            multiline
            textAlignVertical="top"
            autoFocus
            showSoftInputOnFocus
          />
        </Box>
      </FormControlModal>
    </>
  );
});
