import { Box, Button, ButtonIcon, ListItem, LucideIconProps, ResourceList } from '@alveole/components';
import { Alert } from '@alveole/core';
import { useTheme } from '@alveole/theme';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Linking } from 'react-native';
import { useStyles } from './FormControlFileInput.styles';

/** Retourne true si le type DocumentPicker ne demande que des images (image/* ou types image uniquement). */
function isImagesOnlyType(type: DocumentPicker.DocumentPickerOptions['type']): boolean {
  if (type == null) return false;
  const types = Array.isArray(type) ? type : [type];
  if (types.length === 0) return false;
  return types.every(t => t === 'image/*' || (typeof t === 'string' && t.startsWith('image/')));
}

function allowsImageType(type: DocumentPicker.DocumentPickerOptions['type']): boolean {
  if (type == null) return true;
  const types = Array.isArray(type) ? type : [type];
  if (types.length === 0) return true;
  return types.some(
    t => t === '*/*' || t === 'image' || t === 'image/*' || (typeof t === 'string' && t.startsWith('image/')),
  );
}

/** Convertit un asset ImagePicker en forme DocumentPickerAsset pour compatibilité. */
function imagePickerAssetToDocumentPickerAsset(
  asset: ImagePicker.ImagePickerAsset,
): DocumentPicker.DocumentPickerAsset {
  return {
    uri: asset.uri,
    name: asset.fileName ?? 'image.jpg',
    size: asset.fileSize ?? 0,
    mimeType: asset.mimeType ?? 'image/jpeg',
    lastModified: Date.now(),
  };
}

type FileInputValue = DocumentPicker.DocumentPickerAsset & { _persisted?: boolean; _remove?: boolean; _id?: string };

export type FormControlFileInputValue = FileInputValue | FileInputValue[] | null;

export type FormControlFileInputTranslations = {
  selectFile: string;
  gallery: string;
  camera: string;
  document: string;
  cancel: string;
  unnamed: string;
  addFile: string;
  permissionRequired: string;
  cameraPermissionMessage: string;
  galleryPermissionMessage: string;
  chooseImageTitle: string;
  chooseDocumentTitle: string;
  chooseImageMessage: string;
};

const defaultTranslations: FormControlFileInputTranslations = {
  permissionRequired: 'Autorisation requise',
  cameraPermissionMessage: "L'accès à la caméra est nécessaire pour prendre une photo.",
  galleryPermissionMessage: "L'accès à la galerie est nécessaire pour choisir une image.",
  chooseDocumentTitle: 'Choisir un document',
  chooseImageTitle: 'Choisir une image',
  chooseImageMessage: 'Prendre une photo ou choisir depuis la galerie.',
  gallery: 'Galerie',
  selectFile: 'Sélectionner un fichier',
  camera: 'Appareil photo',
  document: 'Document',
  cancel: 'Annuler',
  addFile: 'Ajouter un fichier',
  unnamed: 'Sans nom',
};

export type FormControlFileInputProps = {
  value: FormControlFileInputValue;
  previewURL?: string;
  placeholder?: string;
  forcePlaceholder?: boolean;
  hideButton?: boolean;
  hideFilename?: boolean;
  canChange?: boolean;
  removable?: boolean;
  disabled?: boolean;
  type?: DocumentPicker.DocumentPickerOptions['type'];
  multiple?: boolean;
  cameraQuality?: number;
  onChange: (value: FormControlFileInputValue) => void;
  reopen?: boolean;
  onPickStart?: () => void;
  translations?: Partial<FormControlFileInputTranslations>;
};

export const FormControlFileInput = (props: FormControlFileInputProps) => {
  const {
    value,
    disabled,
    placeholder,
    onChange,
    onPickStart,
    cameraQuality = 0.8,
    previewURL,
    type,
    reopen = false,
    multiple = false,
    hideButton = false,
    removable = true,
    translations: translationsProp,
  } = props;

  const t: FormControlFileInputTranslations = { ...defaultTranslations, ...translationsProp };

  const styles = useStyles();
  const { isVariant } = useTheme();
  const isDesktop = isVariant('desktop');

  const galleryLabel = isVariant('desktop') ? t.selectFile : t.gallery;

  const currentAssetsArray = React.useMemo((): DocumentPicker.DocumentPickerAsset[] => {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const pickWithImagePicker = React.useCallback(
    async (source: 'library' | 'camera') => {
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert({
            title: t.permissionRequired,
            message: t.cameraPermissionMessage,
          });
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          quality: cameraQuality,
          allowsEditing: false,
        });
        if (!result.canceled && result.assets[0]) {
          const asset = imagePickerAssetToDocumentPickerAsset(result.assets[0]);
          if (multiple) {
            onChange([...currentAssetsArray, asset]);
          } else {
            onChange(asset);
          }
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert({
            title: t.permissionRequired,
            message: t.galleryPermissionMessage,
          });
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1,
          allowsMultipleSelection: multiple ?? false,
          allowsEditing: false,
        });
        if (!result.canceled && result.assets.length > 0) {
          const assets = result.assets.map(imagePickerAssetToDocumentPickerAsset);
          if (multiple) {
            onChange([...currentAssetsArray, ...assets]);
          } else {
            onChange(assets[0]);
          }
        }
      }
    },
    [cameraQuality, currentAssetsArray, multiple, onChange, t],
  );

  const pickWithDocumentPicker = React.useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: multiple ?? false,
      type: type,
    });

    if (multiple) {
      const newAssets = result.assets && result.assets.length > 0 ? result.assets : [];
      const merged = [...currentAssetsArray, ...newAssets];
      onChange?.(merged.length === 0 ? null : merged);
    } else {
      const newValue = result.assets?.[0] ?? null;
      onChange?.(newValue);
    }
  }, [multiple, type, currentAssetsArray, onChange]);

  const handlePickFile = React.useCallback(async () => {
    onPickStart?.();
    if (disabled) return;

    const imagesOnly = isImagesOnlyType(type);
    const canPickImages = allowsImageType(type);
    const buttons = [];

    if (!imagesOnly && isDesktop) {
      buttons.push({ text: galleryLabel, onPress: () => pickWithDocumentPicker() });
      if (canPickImages) {
        buttons.push({ text: t.gallery, onPress: () => pickWithImagePicker('library') });
        buttons.push({ text: t.camera, onPress: () => pickWithImagePicker('camera') });
      }
    } else {
      if (canPickImages) {
        buttons.push({ text: galleryLabel, onPress: () => pickWithImagePicker('library') });
        buttons.push({ text: t.camera, onPress: () => pickWithImagePicker('camera') });
      }
      if (!imagesOnly) {
        buttons.push({ text: t.document, onPress: () => pickWithDocumentPicker() });
      }
    }

    buttons.push({ text: t.cancel, onPress: () => Promise.resolve() });

    const title = imagesOnly ? t.chooseImageTitle : t.chooseDocumentTitle;
    const message = imagesOnly ? t.chooseImageMessage : undefined;
    Alert.alert({
      title: title,
      message: message,
      buttons: buttons,
    });
    return;
  }, [onPickStart, disabled, type, isDesktop, galleryLabel, pickWithImagePicker, pickWithDocumentPicker, t]);

  const _handlePreview = () => {
    globalThis.window.open(previewURL, 'blank');
  };

  const isImageAsset = React.useCallback((asset: DocumentPicker.DocumentPickerAsset) => {
    if (asset.mimeType?.startsWith('image/')) return true;
    const name = asset.name ?? '';
    return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(name);
  }, []);

  const mimeTypeToIcon = (
    mimeType: string | undefined,
    name?: string,
    persisted?: boolean,
  ): LucideIconProps['name'] => {
    if (persisted) return 'FileCheckCorner';
    if (mimeType?.includes('pdf') || name?.includes('pdf')) return 'FileText';
    if (mimeType?.includes('image') || name?.includes('image')) return 'FileImage';
    return 'File';
  };

  const fileListData = React.useMemo(() => {
    if (value == null) return [];
    const assets = Array.isArray(value) ? value : [value];
    return assets.map(asset => ({
      id: asset.uri,
      name: asset.name ?? t.unnamed,
      preview_url: isImageAsset(asset) ? asset.uri : undefined,
      icon: mimeTypeToIcon(asset.mimeType, asset.name, asset._persisted),
      _id: asset._id,
      _persisted: asset._persisted ?? false,
      _removed: asset._remove ?? false,
    }));
  }, [value, isImageAsset, t]);

  const isSameFile = React.useCallback((asset: FileInputValue, item: (typeof fileListData)[number]) => {
    if (item._id != null && asset._id != null) return asset._id === item._id;
    return asset.uri === item.id;
  }, []);

  const removeFile = React.useCallback(
    (item: (typeof fileListData)[number]) => {
      if (disabled) return;
      if (value == null) return;
      if (Array.isArray(value)) {
        const next = value.flatMap(asset => {
          if (!isSameFile(asset, item)) return [asset];

          if (asset._persisted) return [{ ...asset, _remove: true }];
          return [];
        });

        onChange(next.length === 0 ? null : next);
      } else {
        if (isSameFile(value, item)) {
          if (item._persisted) onChange({ ...value, _remove: true });
          else onChange(null);
        }
      }
    },
    [disabled, isSameFile, onChange, value],
  );

  React.useEffect(() => {
    if (reopen) handlePickFile();
  }, [reopen, handlePickFile]);

  const hasFile = (() => {
    // Considère qu'il y a déjà un fichier si :
    // - une valeur est présente (asset ou tableau d'assets)
    // - ou un previewURL est fourni (fichier déjà uploadé côté backend)
    if (previewURL) return true;
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  })();

  const isButtonDisabled = disabled || (!multiple && hasFile);

  const handlePressItem = (uri: string) => {
    if (uri) {
      Linking.openURL(uri).catch(err => {
        console.error('Failed to open URL: ', err);
      });
    }
  };

  return (
    <Box tag="form-control-file-input-container" style={styles.fileInputContainer}>
      {hideButton !== true && (
        <Button
          onPress={handlePickFile}
          disabled={isButtonDisabled}
          variant="secondary"
          title={placeholder ?? t.addFile}
          startIcon="Paperclip"
        />
      )}
      <ResourceList
        noBorder
        withWhiteBackground
        data={fileListData.filter(file => file._removed !== true)}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.name}
            preview_url={item.preview_url}
            IconProps={item.icon ? { name: item.icon } : undefined}
            trailing={() => (
              <ButtonIcon
                disabled={removable === false}
                variant="tertiary"
                icon="CircleX"
                onPress={() => removeFile(item)}
              />
            )}
            showSeparateur={index !== 0}
            onPress={() => handlePressItem(item.id)}
          />
        )}
        renderNoContent={() => <></>}
      />
    </Box>
  );
};
