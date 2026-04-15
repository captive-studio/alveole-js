import { Box, Button, ButtonIcon } from '@alveole/components';
import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from './FormControl.styles';

export type FormControlModalProps = {
  open: boolean;
  onClose: () => void;
  onShow?: () => void;
  onDismiss?: () => void;
  submitLabel?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
};

export const FormControlModal = (props: FormControlModalProps) => {
  const { open, onClose, onShow, onDismiss, submitLabel, onSubmit, children } = props;

  const styles = useStyles();
  const { top } = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={open}
      onRequestClose={onClose}
      onShow={onShow}
      onDismiss={onDismiss}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -8 : 0}
          style={{ ...styles.modalSheet, paddingTop: top }}
        >
          <Pressable style={styles.modalContent as StyleProp<ViewStyle>} onPress={() => null}>
            <Box style={styles.modalHeader}>
              <Box style={styles.modalHeaderLeft}></Box>
              <Box style={styles.modalHeaderRight}>
                <ButtonIcon icon="Check" variant="primary" onPress={onClose} />
              </Box>
            </Box>

            {children}

            {submitLabel && onSubmit && (
              <Box style={styles.modalFooter}>
                <Button size="lg" variant="primary" title={submitLabel} onPress={onSubmit} />
              </Box>
            )}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};
