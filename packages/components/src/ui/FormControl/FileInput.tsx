import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Platform } from 'react-native';
import { Box } from '../../core/Box';
import { Button } from '../Button';
import { FileInputLabels, FileInputValue, fichiersVisibles, libellesParDefaut, retire } from './fichiersDuChamp';
import { useStyles } from './FileInput.styles';
import { FileInputListe } from './FileInputListe';
import { useChoixDeFichier } from './useChoixDeFichier';

export * from './fichiersDuChamp';

export type FileInputProps = {
  value: FileInputValue;
  onChange: (value: FileInputValue) => void;
  type?: DocumentPicker.DocumentPickerOptions['type'];
  multiple?: boolean;
  disabled?: boolean;
  removable?: boolean;
  hideButton?: boolean;
  labels?: Partial<FileInputLabels>;
  /** Qualite des photos prises avec l'appareil photo, de 0 a 1. */
  cameraQuality?: number;
  reopen?: boolean;
  onPickStart?: () => void;
};

export const FileInput = (props: FileInputProps) => {
  const { value, disabled, onChange, reopen = false, multiple = false, hideButton = false, removable = true } = props;

  const styles = useStyles();
  const labels = React.useMemo(() => ({ ...libellesParDefaut, ...props.labels }), [props.labels]);
  const choisir = useChoixDeFichier({ ...props, multiple, cameraQuality: props.cameraQuality ?? 0.8, labels });

  // Le champ simple ne remplace pas un fichier en silence : il faut d'abord retirer celui qu'il montre.
  const visibles = fichiersVisibles(value);
  const boutonDesactive = disabled || (!multiple && visibles.length > 0);

  React.useEffect(() => {
    if (reopen) choisir();
  }, [reopen, choisir]);

  return (
    <Box tag="file-input" style={styles.container}>
      {!hideButton && (
        <Button
          fullWidth={Platform.OS !== 'web'}
          onPress={choisir}
          disabled={boutonDesactive}
          variant="secondary"
          title={labels.addFile}
          leading="Paperclip"
        />
      )}
      <FileInputListe
        fichiers={visibles}
        labels={labels}
        retirable={!disabled && removable}
        onRetirer={fichier => onChange(retire(value, fichier))}
      />
    </Box>
  );
};
