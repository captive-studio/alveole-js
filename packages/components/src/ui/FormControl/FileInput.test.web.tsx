import { fireEvent, renderOnDesktop, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from '../../core/Alert';
import { FileInput } from './FileInput';
import { FormControl } from './FormControl';

jest.mock('expo-document-picker', () => ({ getDocumentAsync: jest.fn() }));

const choisir = (mimeType: string) =>
  jest.mocked(DocumentPicker.getDocumentAsync).mockResolvedValue({
    canceled: false,
    assets: [{ name: 'fichier', uri: 'file:///fichier', mimeType, lastModified: 0 }],
  });

test('refuse un fichier dont le type ne correspond pas à celui attendu', async () => {
  const alerte = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  const onChange = jest.fn();
  choisir('text/plain');
  renderOnDesktop(
    <FormControl label="Photo">
      <FileInput type="image/*" value={null} onChange={onChange} />
    </FormControl>,
  );

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => expect(alerte).toHaveBeenCalled());
  expect(onChange).not.toHaveBeenCalled();
});
