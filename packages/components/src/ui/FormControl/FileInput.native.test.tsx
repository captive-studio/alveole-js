import { fireEvent, renderNative, screen, waitFor } from '@/__tests__/helpers/renderNative';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheetIOS } from 'react-native';
import { Alert } from '../../core/Alert';
import { FileInput } from './FileInput';

jest.mock('expo-document-picker', () => ({ getDocumentAsync: jest.fn() }));
jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  PermissionStatus: { GRANTED: 'granted', DENIED: 'denied' },
}));

const permission = (status: ImagePicker.PermissionStatus) => ({
  status,
  granted: status === 'granted',
  expires: 'never' as const,
  canAskAgain: true,
});

const feuilleOuverte = async (props: Partial<React.ComponentProps<typeof FileInput>> = {}) => {
  const actionSheet = jest
    .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
    .mockImplementation((_opts, _cb) => {});
  const alerte = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await renderNative(<FileInput value={null} onChange={jest.fn()} {...props} />);
  fireEvent.press(screen.getByText('Ajouter un fichier'));
  const [sheetOptions, callback] = actionSheet.mock.calls[0];
  actionSheet.mockClear();
  return {
    title: sheetOptions.title,
    buttons: sheetOptions.options?.map(text => ({ text })),
    alerte,
    bouton: (texte: string) => ({
      onPress: () => {
        const index = sheetOptions.options!.indexOf(texte);
        if (index !== -1) callback(index);
      },
    }),
  };
};

afterEach(() => jest.restoreAllMocks());

// Le rendu de test tombe sur la variante desktop (tablette) : le document y passe en tête.
test('propose le document en tête, puis galerie et appareil photo, sur tablette', async () => {
  const { buttons } = await feuilleOuverte();

  expect(buttons!.map(b => b.text)).toEqual(['Sélectionner un fichier', 'Galerie', 'Appareil photo', 'Annuler']);
});

test('ne propose pas le document quand seules les images sont acceptées', async () => {
  const { buttons, title } = await feuilleOuverte({ type: 'image/*' });

  expect(title).toBe('Choisir une image');
  expect(buttons!.map(b => b.text)).toEqual(['Sélectionner un fichier', 'Appareil photo', 'Annuler']);
});

test('transmet la photo prise', async () => {
  const onChange = jest.fn();
  jest
    .mocked(ImagePicker.requestCameraPermissionsAsync)
    .mockResolvedValue(permission(ImagePicker.PermissionStatus.GRANTED));
  jest.mocked(ImagePicker.launchCameraAsync).mockResolvedValue({
    canceled: false,
    assets: [{ uri: 'file:///photo.jpg', fileName: 'photo.jpg', mimeType: 'image/jpeg', width: 1, height: 1 }],
  });
  const { bouton } = await feuilleOuverte({ onChange });

  bouton('Appareil photo').onPress();

  await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'photo.jpg' })));
});

test("prévient quand l'accès à la galerie est refusé", async () => {
  const onChange = jest.fn();
  jest
    .mocked(ImagePicker.requestMediaLibraryPermissionsAsync)
    .mockResolvedValue(permission(ImagePicker.PermissionStatus.DENIED));
  const { bouton, alerte } = await feuilleOuverte({
    onChange,
    type: 'image/*',
    labels: { permissionRequired: 'Accès refusé' },
  });

  bouton('Sélectionner un fichier').onPress();

  await waitFor(() => expect(alerte).toHaveBeenCalledWith(expect.objectContaining({ title: 'Accès refusé' })));
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});
