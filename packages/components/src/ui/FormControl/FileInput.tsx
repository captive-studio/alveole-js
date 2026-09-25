import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './FileInput.styles';
import { valideLeType } from './valideLeType';

export type FileInputValue = DocumentPicker.DocumentPickerAsset | DocumentPicker.DocumentPickerAsset[] | null;

export type FileInputProps = {
  value: FileInputValue;
  previewURL?: string;
  placeholder?: string;
  forcePlaceholder?: boolean;
  hideButton?: boolean;
  hideFilename?: boolean;
  canChange?: boolean;
  disabled?: boolean;
  type?: DocumentPicker.DocumentPickerOptions['type'];
  multiple?: boolean;
  onChange: (value: FileInputValue) => void;
  reopen?: boolean;
  onPickStart?: () => void;
};

// Le champ n'affiche jamais le detail d'une selection multiple : un fichier porte son nom, une
// liste porte son compte. Cette table de cas se lisait au milieu du composant alors qu'elle ne
// depend que de la valeur.
export const nomAffiche = (value: FileInputValue, placeholder: string, forcePlaceholder?: boolean) => {
  if (value == null || forcePlaceholder) return placeholder;

  if (!Array.isArray(value)) return value.name || '1 fichier';
  if (value.length === 0) return placeholder;
  if (value.length === 1) return value[0].name ?? '1 fichier';

  return `${value.length} fichiers`;
};

// Le selecteur rend toujours une liste ; le champ simple n'en veut que le premier element, et
// une liste vide vaut une absence de choix dans les deux cas.
export const choisis = (assets: DocumentPicker.DocumentPickerAsset[] | null, multiple: boolean) => {
  if (!multiple) return assets?.[0] ?? null;

  return assets && assets.length > 0 ? assets : null;
};

export const FileInput = (props: FileInputProps) => {
  const {
    value,
    disabled,
    onChange,
    onPickStart,
    placeholder = 'Aucun fichier choisi.',
    type,
    forcePlaceholder,
    reopen = false,
    multiple = false,
    hideButton = false,
  } = props;

  const styles = useStyles();

  const displayValue = nomAffiche(value, placeholder, forcePlaceholder);

  const isPickingRef = React.useRef(false);

  const handlePickFile = React.useCallback(async () => {
    if (isPickingRef.current) return;
    onPickStart?.();
    if (disabled) return;

    isPickingRef.current = true;
    try {
      const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple, type });
      valideLeType({ type, onChange })(choisis(result.assets, multiple));
    } finally {
      isPickingRef.current = false;
    }
  }, [onPickStart, disabled, multiple, type, onChange]);

  React.useEffect(() => {
    if (reopen) handlePickFile();
  }, [reopen, handlePickFile]);

  if (hideButton) return null;

  return (
    <Pressable accessibilityRole="button" onPress={handlePickFile}>
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
