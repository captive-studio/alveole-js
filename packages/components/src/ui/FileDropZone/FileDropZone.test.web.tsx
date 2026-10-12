import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Alert } from '../../core/Alert';
import { FileDropZone, FileDropZoneProps } from './FileDropZone.web';

// jsdom n'implémente pas `URL.createObjectURL`/`revokeObjectURL`, utilisés pour l'aperçu des fichiers déposés.
beforeAll(() => {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
});

const png = (nom = 'a.png') => new File(['contenu'], nom, { type: 'image/png' });

const transfert = (...fichiers: File[]) => ({
  types: ['Files'],
  items: fichiers.map(fichier => ({ kind: 'file', getAsFile: () => fichier })),
});

const zone = (props: Partial<FileDropZoneProps> = {}) =>
  renderWeb(
    <FileDropZone value={null} onChange={jest.fn()} {...props}>
      <input aria-label="Titre" />
      <span>Enfant</span>
    </FileDropZone>,
  );

const laZone = () => screen.getAllByTestId('file-drop-zone')[0];
const surcouche = () => screen.queryByText('Déposez vos fichiers ici');

test('s allume quand un glissement de fichiers entre dans la zone', () => {
  zone();

  fireEvent.dragEnter(laZone(), { dataTransfer: transfert(png()) });

  expect(surcouche()).not.toBeNull();
});

test('reste eteinte pour un glissement de texte', () => {
  zone();

  fireEvent.dragEnter(laZone(), { dataTransfer: { types: ['text/plain'], items: [] } });

  expect(surcouche()).toBeNull();
});

test('ne s eteint pas en passant d un enfant a l autre', () => {
  zone();
  const dataTransfer = transfert(png());

  fireEvent.dragEnter(laZone(), { dataTransfer });
  fireEvent.dragEnter(screen.getByText('Enfant'), { dataTransfer });
  fireEvent.dragLeave(laZone(), { dataTransfer });
  expect(surcouche()).not.toBeNull();

  fireEvent.dragLeave(screen.getByText('Enfant'), { dataTransfer });
  expect(surcouche()).toBeNull();
});

test('un depot multiple s ajoute aux fichiers deja presents et eteint la zone', () => {
  const onChange = jest.fn();
  const present = { uri: 'file:///deja.pdf', name: 'deja.pdf', lastModified: 0 };
  zone({ value: [present], onChange, multiple: true });

  fireEvent.dragEnter(laZone(), { dataTransfer: transfert(png('a.png'), png('b.png')) });
  fireEvent.drop(laZone(), { dataTransfer: transfert(png('a.png'), png('b.png')) });

  expect(onChange).toHaveBeenCalledWith([
    present,
    expect.objectContaining({ name: 'a.png' }),
    expect.objectContaining({ name: 'b.png' }),
  ]);
  expect(surcouche()).toBeNull();
});

test('hors multiple, seul le premier fichier depose est retenu', () => {
  const onChange = jest.fn();
  zone({ onChange });

  fireEvent.drop(laZone(), { dataTransfer: transfert(png('a.png'), png('b.png')) });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'a.png' }));
});

test('un fichier depose garde sa date de derniere modification', () => {
  const onChange = jest.fn();
  zone({ onChange });

  const fichier = new File(['contenu'], 'a.png', { type: 'image/png', lastModified: 1700000000000 });
  fireEvent.drop(laZone(), { dataTransfer: transfert(fichier) });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ lastModified: 1700000000000 }));
});

test('refuse un fichier dont le type ne correspond pas', () => {
  const alerte = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  const onChange = jest.fn();
  zone({ onChange, type: 'image/*' });

  fireEvent.drop(laZone(), { dataTransfer: transfert(new File(['x'], 'a.txt', { type: 'text/plain' })) });

  expect(alerte).toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test('accepte un fichier du type attendu', () => {
  const onChange = jest.fn();
  zone({ onChange, type: 'image/*' });

  fireEvent.drop(laZone(), { dataTransfer: transfert(png('photo.png')) });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'photo.png' }));
});

test('ignore survol et depot quand le champ simple montre deja un fichier', () => {
  const onChange = jest.fn();
  zone({ onChange, value: { uri: 'file:///deja.pdf', name: 'deja.pdf', lastModified: 0 } });

  fireEvent.dragEnter(laZone(), { dataTransfer: transfert(png()) });
  fireEvent.drop(laZone(), { dataTransfer: transfert(png()) });

  expect(surcouche()).toBeNull();
  expect(onChange).not.toHaveBeenCalled();
});

test('ignore survol et depot quand la zone est desactivee', () => {
  const onChange = jest.fn();
  zone({ onChange, disabled: true });

  fireEvent.dragEnter(laZone(), { dataTransfer: transfert(png()) });
  fireEvent.drop(laZone(), { dataTransfer: transfert(png()) });

  expect(surcouche()).toBeNull();
  expect(onChange).not.toHaveBeenCalled();
});

test('entre zones imbriquees, seule la plus proche s allume et recoit le depot', () => {
  const exterieur = jest.fn();
  const interieur = jest.fn();
  renderWeb(
    <FileDropZone value={null} onChange={exterieur} message="Exterieur">
      <FileDropZone value={null} onChange={interieur} message="Interieur">
        <span>Cible</span>
      </FileDropZone>
    </FileDropZone>,
  );

  fireEvent.dragEnter(screen.getByText('Cible'), { dataTransfer: transfert(png()) });
  expect(screen.queryByText('Interieur')).not.toBeNull();
  expect(screen.queryByText('Exterieur')).toBeNull();

  fireEvent.drop(screen.getByText('Cible'), { dataTransfer: transfert(png()) });
  expect(interieur).toHaveBeenCalled();
  expect(exterieur).not.toHaveBeenCalled();
});

test('affiche le message personnalise', () => {
  zone({ message: 'Lâchez ici' });

  fireEvent.dragEnter(laZone(), { dataTransfer: transfert(png()) });

  expect(screen.queryByText('Lâchez ici')).not.toBeNull();
});

test('un depot apres un nouveau rendu appelle le gestionnaire courant', () => {
  const premier = jest.fn();
  const courant = jest.fn();
  const { rerender } = renderWeb(
    <FileDropZone value={null} onChange={premier}>
      <span>Enfant</span>
    </FileDropZone>,
  );

  rerender(
    <FileDropZone value={null} onChange={courant}>
      <span>Enfant</span>
    </FileDropZone>,
  );
  fireEvent.drop(laZone(), { dataTransfer: transfert(png()) });

  expect(courant).toHaveBeenCalled();
  expect(premier).not.toHaveBeenCalled();
});

test('seules les URL blob sorties de la valeur sont revoquees', () => {
  const blob = (nom: string) => ({ uri: `blob:${nom}`, name: nom, lastModified: 0 });
  const revoque = jest.mocked(URL.revokeObjectURL);
  const rendu = (value: ReturnType<typeof blob>[]) => (
    <FileDropZone multiple value={value} onChange={jest.fn()}>
      <span>Enfant</span>
    </FileDropZone>
  );
  const { rerender, unmount } = renderWeb(rendu([blob('a')]));
  revoque.mockClear();

  rerender(rendu([blob('a'), blob('b')]));
  expect(revoque).not.toHaveBeenCalled();

  rerender(rendu([blob('b')]));
  expect(revoque).toHaveBeenCalledWith('blob:a');
  expect(revoque).not.toHaveBeenCalledWith('blob:b');

  unmount();
  expect(revoque).toHaveBeenCalledWith('blob:b');
});
