import { useTheme } from '@alveole/theme';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Platform } from 'react-native';
import { Alert } from '../../core/Alert';
import type { FileInputProps } from './FileInput';
import {
  ajoute,
  FileInputFile,
  FileInputLabels,
  imagesSeulement,
  libelleDeLaSource,
  Source,
  sourcesProposees,
} from './fichiersDuChamp';
import { valideLeType } from './valideLeType';

const enFichier = (asset: ImagePicker.ImagePickerAsset): FileInputFile => ({
  uri: asset.uri,
  name: asset.fileName ?? 'image.jpg',
  size: asset.fileSize ?? 0,
  mimeType: asset.mimeType ?? 'image/jpeg',
  lastModified: Date.now(),
});

/** Demande l'autorisation, puis ouvre la galerie ou l'appareil photo. Rend les fichiers choisis, ou aucun. */
const prendreUneImage = async (
  source: 'gallery' | 'camera',
  { labels, cameraQuality, multiple }: { labels: FileInputLabels; cameraQuality: number; multiple: boolean },
): Promise<FileInputFile[]> => {
  const camera = source === 'camera';
  const demande = camera ? ImagePicker.requestCameraPermissionsAsync : ImagePicker.requestMediaLibraryPermissionsAsync;
  const { status } = await demande();
  if (status !== 'granted') {
    const message = camera ? labels.cameraPermissionMessage : labels.galleryPermissionMessage;
    Alert.alert({ title: labels.permissionRequired, message });
    return [];
  }

  const result = camera
    ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: cameraQuality })
    : await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsMultipleSelection: multiple,
      });
  return result.canceled ? [] : result.assets.map(enFichier);
};

type Options = Pick<FileInputProps, 'value' | 'onChange' | 'type' | 'disabled' | 'onPickStart'> & {
  multiple: boolean;
  cameraQuality: number;
  labels: FileInputLabels;
};

/**
 * Tout ce que le bouton du champ declenche : le selecteur de documents sur le web ; sur natif, une
 * feuille d'actions galerie / appareil photo / document, avec les demandes d'autorisation. Les
 * fichiers recus passent le controle de type, puis s'ajoutent a la valeur.
 */
export const useChoixDeFichier = (options: Options) => {
  const { value, onChange, type, disabled, onPickStart, multiple, cameraQuality, labels } = options;
  const { isVariant } = useTheme();
  const grandEcran = isVariant('desktop');
  const isPickingRef = React.useRef(false);

  const recevoir = React.useCallback(
    (nouveaux: FileInputFile[]) => {
      if (nouveaux.length === 0) return;
      const transmettre = () => onChange(ajoute(value, nouveaux, multiple));
      valideLeType({ type, onChange: transmettre })(multiple ? nouveaux : nouveaux[0]);
    },
    [onChange, value, multiple, type],
  );

  const choisirUnDocument = React.useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple, type });
    recevoir(result.assets ?? []);
  }, [multiple, type, recevoir]);

  const choisirUneImage = React.useCallback(
    async (source: 'gallery' | 'camera') =>
      recevoir(await prendreUneImage(source, { labels, cameraQuality, multiple })),
    [labels, cameraQuality, multiple, recevoir],
  );

  const ouvrirLaFeuille = React.useCallback(() => {
    const lancer = (source: Source) => (source === 'document' ? choisirUnDocument() : choisirUneImage(source));
    const images = imagesSeulement(type);
    Alert.alert({
      title: images ? labels.chooseImageTitle : labels.chooseDocumentTitle,
      message: images ? labels.chooseImageMessage : undefined,
      buttons: [
        ...sourcesProposees(type, grandEcran).map(source => ({
          text: libelleDeLaSource(source, labels, { type, grandEcran }),
          onPress: () => lancer(source),
        })),
        { text: labels.cancel, style: 'cancel' },
      ],
    });
  }, [type, labels, grandEcran, choisirUnDocument, choisirUneImage]);

  return React.useCallback(async () => {
    if (isPickingRef.current) return;
    onPickStart?.();
    if (disabled) return;
    if (Platform.OS !== 'web') return ouvrirLaFeuille();

    isPickingRef.current = true;
    try {
      await choisirUnDocument();
    } finally {
      isPickingRef.current = false;
    }
  }, [onPickStart, disabled, ouvrirLaFeuille, choisirUnDocument]);
};
