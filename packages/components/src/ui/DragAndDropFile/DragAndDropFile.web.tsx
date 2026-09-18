import React from 'react';
import { Alert } from '../../core/Alert';
import { Box } from '../../core/Box';
import {
  FormControlCaption,
  FormControlFileInput,
  FormControlFileInputValue,
  FormControlHint,
  FormControlLabel,
} from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import { DragAndDropFileProps } from './DragAndDropFile';
import { useStyles } from './DragAndDropFile.styles';
import { fichierCorrespondAuType } from './fichierCorrespondAuType';

function fileToDocumentPickerAsset(file: File): FormControlFileInputValue {
  const uri = URL.createObjectURL(file);
  return {
    uri,
    name: file.name,
    size: file.size,
    mimeType: file.type || 'application/octet-stream',
    file,
  } as any;
}

function filesToDocumentPickerAssets(files: File[]): FormControlFileInputValue {
  return files.map(file => fileToDocumentPickerAsset(file)) as any;
}

export const DragAndDropFile = (props: DragAndDropFileProps) => {
  const { value, label, hint, icon, type, error, success, onChange, multiple } = props;

  const styles = useStyles();
  const [isOver, setIsOver] = React.useState(false);
  const [isMouthOver, setIsMouthOver] = React.useState(false);
  const [forceOpen, setForceOpen] = React.useState(false);

  const onValueChange: typeof onChange = v => {
    if (type == null) return onChange(v);

    if (multiple && Array.isArray(v)) {
      const invalidFiles = v.filter(file => {
        const mimeType = (file as any)?.mimeType;
        return mimeType == null || !fichierCorrespondAuType(mimeType, (file as any)?.name, type);
      });

      if (invalidFiles.length > 0) {
        Alert.alert({ title: 'Type de fichier incorrect', message: `Certains fichiers ne sont pas pris en charge` });
        return;
      }
      return onChange(v);
    }

    const mimeType = (v as any)?.mimeType;
    if (mimeType == null) return onChange(v);

    if (fichierCorrespondAuType(mimeType, (v as any)?.name, type)) return onChange(v);
    Alert.alert({ title: 'Type de fichier incorrect', message: `Le format du fichier n'est pas pris en charge` });
  };

  const emitFile = React.useCallback(
    (file: File) => {
      if (!fichierCorrespondAuType(file.type || '', file.name, type)) {
        Alert.alert({ title: 'Type de fichier incorrect', message: `Le format du fichier n'est pas pris en charge` });
        return;
      }
      const asset = fileToDocumentPickerAsset(file);
      onValueChange?.(asset);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type],
  );

  const emitFiles = React.useCallback(
    (files: File[]) => {
      const validFiles = files.filter(file => fichierCorrespondAuType(file.type || '', file.name, type));
      const invalidFiles = files.filter(file => !fichierCorrespondAuType(file.type || '', file.name, type));

      if (invalidFiles.length > 0) {
        Alert.alert({ title: 'Type de fichier incorrect', message: `Certains fichiers ne sont pas pris en charge` });
      }

      if (validFiles.length > 0) {
        const assets = filesToDocumentPickerAssets(validFiles);
        onValueChange?.(assets);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type],
  );

  const onDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);

      const dt = e.dataTransfer;
      const files: File[] = [];

      if (dt?.items?.length) {
        for (let i = 0; i < dt.items.length; i++) {
          const it = dt.items[i];
          if (it.kind === 'file') {
            const f = it.getAsFile();
            if (f) files.push(f);
          }
        }
      } else if (dt?.files?.length) {
        for (let i = 0; i < dt.files.length; i++) {
          const f = dt.files[i];
          if (f) files.push(f);
        }
      }

      if (files.length > 0) {
        if (multiple) emitFiles(files);
        else emitFile(files[0]);
      }
    },
    [emitFile, emitFiles, multiple],
  );

  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isOver) setIsOver(true);
    },
    [isOver],
  );

  const onDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isOver) setIsOver(false);
    },
    [isOver],
  );

  const onMouseOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isMouthOver) setIsMouthOver(true);
    },
    [isMouthOver],
  );

  const onMouseLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isMouthOver) setIsMouthOver(false);
    },
    [isMouthOver],
  );

  React.useEffect(() => {
    return () => {
      if (Array.isArray(value)) {
        value.forEach(file => {
          const uri = (file as any)?.uri as string | undefined;
          if (uri?.startsWith('blob:'))
            try {
              URL.revokeObjectURL(uri);
            } catch {}
        });
      } else {
        const uri = (value as any)?.uri as string | undefined;
        if (uri?.startsWith('blob:'))
          try {
            URL.revokeObjectURL(uri);
          } catch {}
      }
    };
  }, [value]);

  const styleContainer = React.useMemo(
    () => ({
      ...styles.container,
      ...(isMouthOver ? styles.containerMouseHover : {}),
      ...(isOver ? styles.containerHover : {}),
      ...(error ? styles.containerError : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error, isMouthOver, isOver],
  );

  return (
    <div
      tabIndex={0}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={() => setForceOpen(true)}
      style={styleContainer}
    >
      <Box tag="drag-and-drop-file-icon" display="flex" flexDirection="row" justify="center">
        <LucideIcon size="xl" name={icon ?? 'Upload'} style={styles.icon} />
      </Box>

      <Box tag="drag-and-drop-file-label" display="flex" flexDirection="row" justify="center">
        <FormControlLabel label={label} />
      </Box>

      <Box tag="drag-and-drop-file-hint" display="flex" flexDirection="row" justify="center">
        {hint && <FormControlHint hint={hint} />}
      </Box>

      <Box tag="drag-and-drop-file-input" display="flex" flexDirection="row" justify="center">
        <Box pt={16}>
          <FormControlFileInput
            {...props}
            canChange={false}
            onChange={onValueChange}
            reopen={forceOpen}
            onPickStart={() => setForceOpen(false)}
            multiple={multiple}
            type={type}
          />
        </Box>
      </Box>

      {(error || success) && (
        <Box tag="drag-and-drop-file-error" style={styles.webError}>
          <FormControlCaption {...props} />
        </Box>
      )}
    </div>
  );
};
