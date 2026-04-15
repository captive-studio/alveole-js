import { Box, Typography } from '@alveole/components';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Pressable } from 'react-native';
import { useStyles } from './FormControlFileInput.styles';

export type FormControlFileInputValue =
  | DocumentPicker.DocumentPickerAsset
  | DocumentPicker.DocumentPickerAsset[]
  | null;

export type FormControlFileInputProps = {
  value: FormControlFileInputValue;
  previewURL?: string;
  placeholder?: string;
  forcePlaceholder?: boolean;
  hideButton?: boolean;
  hideFilename?: boolean;
  canChange?: boolean;
  disabled?: boolean;
  type?: DocumentPicker.DocumentPickerOptions['type'];
  multiple?: boolean;
  onChange: (value: FormControlFileInputValue) => void;
  reopen?: boolean;
  onPickStart?: () => void;
};

export const FormControlFileInput = (props: FormControlFileInputProps) => {
  const {
    value,
    disabled,
    onChange,
    onPickStart,
    previewURL,
    placeholder = 'Aucun fichier choisi.',
    type,
    forcePlaceholder,
    canChange = true,
    reopen = false,
    multiple = false,
    hideButton = false,
    hideFilename = false,
  } = props;

  const styles = useStyles();

  const displayValue = React.useMemo(() => {
    if (value == null || forcePlaceholder) return placeholder;
    if (Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) return value[0].name ?? '1 fichier';
      return `${value.length} fichiers`;
    }
    if (value.name) return value.name;
    return '1 fichier';
  }, [placeholder, value, forcePlaceholder]);

  const handlePickFile = React.useCallback(async () => {
    onPickStart?.();
    if (disabled) return;
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: multiple ?? false,
      type: type,
    });
    if (multiple) {
      const newValue = result.assets && result.assets.length > 0 ? result.assets : null;
      onChange?.(newValue);
    } else {
      const newValue = result.assets?.[0] ?? null;
      onChange?.(newValue);
    }
  }, [onPickStart, disabled, multiple, type, onChange]);

  const handleClear = () => {
    if (disabled) return;
    onChange(null);
  };

  const handlePreview = () => {
    globalThis.window.open(previewURL, 'blank');
  };

  React.useEffect(() => {
    if (reopen) handlePickFile();
  }, [reopen, handlePickFile]);

  if (hideButton) return null;

  return (
    <Pressable onPress={handlePickFile}>
      <Box
        tag="form-control-file-input-inner"
        style={{
          ...styles.fileInputContainer,
        }}
      >
        <Box
          tag="file-input-button"
          hoverStyle={{ ...(!disabled && styles.fileInputButtonHovered) }}
          style={{
            ...styles.fileInputButton,
            ...(disabled && styles.fileInputButtonDisabled),
          }}
        >
          <Typography style={styles.inputFileText}>Choisir un fichier</Typography>
        </Box>

        <Box tag="file-input-text">
          <Typography mt={'auto'} mb={'auto'} style={styles.placeholderText}>
            {displayValue}
          </Typography>
        </Box>
      </Box>
    </Pressable>
  );
};
