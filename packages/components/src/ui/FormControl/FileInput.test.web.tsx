import { fireEvent, renderOnDesktop, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from '../../core/Alert';
import { FileInput, FileInputFile } from './FileInput';
import { FormControl } from './FormControl';

jest.mock('expo-document-picker', () => ({ getDocumentAsync: jest.fn() }));

const choisir = (...noms: string[]) =>
  jest.mocked(DocumentPicker.getDocumentAsync).mockResolvedValue({
    canceled: false,
    assets: noms.map(name => ({ name, uri: `file:///${name}`, mimeType: 'application/pdf', lastModified: 0 })),
  });

const ajoute: FileInputFile = { uri: 'file:///a.pdf', name: 'a.pdf', lastModified: 0 };
const enregistre: FileInputFile = { uri: 'https://x/c.pdf', name: 'c.pdf', lastModified: 0, id: '7', persisted: true };

test('refuse un fichier dont le type ne correspond pas à celui attendu', async () => {
  const alerte = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  const onChange = jest.fn();
  jest.mocked(DocumentPicker.getDocumentAsync).mockResolvedValue({
    canceled: false,
    assets: [{ name: 'fichier', uri: 'file:///fichier', mimeType: 'text/plain', lastModified: 0 }],
  });
  renderOnDesktop(
    <FormControl label="Photo">
      <FileInput type="image/*" value={null} onChange={onChange} />
    </FormControl>,
  );

  fireEvent.click(screen.getByText('Ajouter un fichier'));

  await waitFor(() => expect(alerte).toHaveBeenCalled());
  expect(onChange).not.toHaveBeenCalled();
});

test('accepte une image quand le champ attend image/*', async () => {
  const onChange = jest.fn();
  jest.mocked(DocumentPicker.getDocumentAsync).mockResolvedValue({
    canceled: false,
    assets: [{ name: 'photo.png', uri: 'file:///photo.png', mimeType: 'image/png', lastModified: 0 }],
  });
  renderOnDesktop(<FileInput type="image/*" value={null} onChange={onChange} />);

  fireEvent.click(screen.getByText('Ajouter un fichier'));

  await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'photo.png' })));
});

test('ajoute la nouvelle sélection aux fichiers déjà choisis en mode multiple', async () => {
  const onChange = jest.fn();
  choisir('b.pdf');
  renderOnDesktop(<FileInput multiple value={[ajoute]} onChange={onChange} />);

  fireEvent.click(screen.getByText('Ajouter un fichier'));

  await waitFor(() => expect(onChange).toHaveBeenCalledWith([ajoute, expect.objectContaining({ name: 'b.pdf' })]));
});

test('n’appelle pas onChange quand la sélection est annulée', async () => {
  const onChange = jest.fn();
  jest.mocked(DocumentPicker.getDocumentAsync).mockResolvedValue({ canceled: true, assets: null });
  renderOnDesktop(<FileInput value={null} onChange={onChange} />);

  fireEvent.click(screen.getByText('Ajouter un fichier'));

  await waitFor(() => expect(DocumentPicker.getDocumentAsync).toHaveBeenCalled());
  expect(onChange).not.toHaveBeenCalled();
});

test('verrouille le champ simple tant qu’il montre un fichier', () => {
  jest.mocked(DocumentPicker.getDocumentAsync).mockClear();
  renderOnDesktop(<FileInput value={ajoute} onChange={jest.fn()} />);

  fireEvent.click(screen.getByText('Ajouter un fichier'));

  expect(DocumentPicker.getDocumentAsync).not.toHaveBeenCalled();
});

test('affiche les fichiers et masque ceux retirés', () => {
  renderOnDesktop(<FileInput multiple value={[ajoute, { ...enregistre, removed: true }]} onChange={jest.fn()} />);

  expect(screen.getByText('a.pdf')).toBeTruthy();
  expect(screen.queryByText('c.pdf')).toBeNull();
});

test('retirer un fichier ajouté l’enlève de la valeur', () => {
  const onChange = jest.fn();
  renderOnDesktop(<FileInput multiple value={[ajoute, enregistre]} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer a.pdf'));

  expect(onChange).toHaveBeenCalledWith([enregistre]);
});

test('retirer un fichier enregistré le marque comme retiré', () => {
  const onChange = jest.fn();
  renderOnDesktop(<FileInput value={enregistre} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer c.pdf'));

  expect(onChange).toHaveBeenCalledWith({ ...enregistre, removed: true });
});

test('removable={false} empêche le retrait', () => {
  const onChange = jest.fn();
  renderOnDesktop(<FileInput value={ajoute} removable={false} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer a.pdf'));

  expect(onChange).not.toHaveBeenCalled();
});

test('les libellés se personnalisent', () => {
  renderOnDesktop(
    <FileInput value={ajoute} labels={{ addFile: 'Joindre', remove: 'Supprimer' }} onChange={jest.fn()} />,
  );

  expect(screen.getByText('Joindre')).toBeTruthy();
  expect(screen.getByLabelText('Supprimer a.pdf')).toBeTruthy();
});
