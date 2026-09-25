import React from 'react';
import { Platform } from 'react-native';
import { Box } from '../../core/Box';
import { useStyles } from './FormControl.styles';
import { TextInputElement, TextInputProps } from './TextInput.types';
import { TextInputInline } from './TextInputInline';
import { TextInputModal } from './TextInputModal';
import { TextInputPassword } from './TextInputPassword';

export type { TextInputElement, TextInputProps };

/**
 * Aiguillage entre les deux facons de saisir. Le web sait deja agrandir une zone de texte,
 * la modale n'y aurait rien a apporter : `openModal` n'y est pas suivi.
 */
export const TextInput = React.forwardRef<TextInputElement, TextInputProps>(function TextInput(props, ref) {
  const styles = useStyles();
  const shouldUseModal = Boolean(props.openModal && props.multiline && Platform.OS !== 'web');
  const Saisie = shouldUseModal ? TextInputModal : props.type === 'password' ? TextInputPassword : TextInputInline;

  return (
    <Box
      tag="form-control-text-input"
      style={{
        ...styles.inputContainer,
        ...(props.multiline ? { height: 'auto' } : {}),
      }}
    >
      <Saisie {...props} ref={ref} />
    </Box>
  );
});
