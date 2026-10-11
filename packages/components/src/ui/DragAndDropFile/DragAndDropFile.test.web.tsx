import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { DragAndDropFile } from './DragAndDropFile.web';

jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn(async () => ({ canceled: true, assets: null })),
}));

// jsdom n'implémente pas `URL.createObjectURL`/`revokeObjectURL`, utilisés par le composant
// pour construire l'aperçu du fichier déposé.
beforeAll(() => {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
});

const deposer = (container: HTMLElement, dataTransfer: unknown) => {
  const zone = elementDuType(container.querySelector('[tabindex="0"]'), Element);
  fireEvent.drop(zone, { dataTransfer });
};

test('un depot avec un seul fichier transmet ce fichier', () => {
  const onChange = jest.fn();
  const fichier = new File(['contenu'], 'a.png', { type: 'image/png' });
  const { container } = renderWeb(<DragAndDropFile label="Piece jointe" value={null} onChange={onChange} />);

  deposer(container, { items: [{ kind: 'file', getAsFile: () => fichier }] });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'a.png' }));
});

test('un depot avec plusieurs fichiers et multiple transmet tous les fichiers', () => {
  const onChange = jest.fn();
  const fichierA = new File(['contenu'], 'a.png', { type: 'image/png' });
  const fichierB = new File(['contenu'], 'b.png', { type: 'image/png' });
  const { container } = renderWeb(<DragAndDropFile label="Piece jointe" value={null} onChange={onChange} multiple />);

  deposer(container, {
    items: [
      { kind: 'file', getAsFile: () => fichierA },
      { kind: 'file', getAsFile: () => fichierB },
    ],
  });

  expect(onChange).toHaveBeenCalledWith([
    expect.objectContaining({ name: 'a.png' }),
    expect.objectContaining({ name: 'b.png' }),
  ]);
});

test('un item non-fichier depose parmi des fichiers est ignore', () => {
  const onChange = jest.fn();
  const fichier = new File(['contenu'], 'a.png', { type: 'image/png' });
  const { container } = renderWeb(<DragAndDropFile label="Piece jointe" value={null} onChange={onChange} multiple />);

  deposer(container, {
    items: [
      { kind: 'string', getAsFile: () => null },
      { kind: 'file', getAsFile: () => fichier },
    ],
  });

  expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: 'a.png' })]);
});

// `deposer` est memoise, et sa liste de dependances omettait volontairement le gestionnaire de
// changement pour ne pas recreer les gestionnaires de glisser-deposer a chaque frappe. Un
// formulaire controle passe pourtant un `onChange` neuf a chaque rendu : la memoisation figeait
// celui du premier rendu, et le depot appelait un gestionnaire perime.
test('un depot apres un nouveau rendu appelle le gestionnaire courant, pas celui du premier rendu', () => {
  const premier = jest.fn();
  const courant = jest.fn();
  const fichier = new File(['contenu'], 'a.png', { type: 'image/png' });
  const { container, rerender } = renderWeb(<DragAndDropFile label="Piece jointe" value={null} onChange={premier} />);

  rerender(<DragAndDropFile label="Piece jointe" value={null} onChange={courant} />);
  deposer(container, { items: [{ kind: 'file', getAsFile: () => fichier }] });

  expect(courant).toHaveBeenCalledWith(expect.objectContaining({ name: 'a.png' }));
  expect(premier).not.toHaveBeenCalled();
});

test('un fichier depose garde sa date de derniere modification', () => {
  const onChange = jest.fn();
  const fichier = new File(['contenu'], 'a.png', { type: 'image/png', lastModified: 1700000000000 });
  const { container } = renderWeb(<DragAndDropFile label="Piece jointe" value={null} onChange={onChange} />);

  deposer(container, { items: [{ kind: 'file', getAsFile: () => fichier }] });

  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ lastModified: 1700000000000 }));
});

test('un depot multiple s ajoute aux fichiers deja presents', () => {
  const onChange = jest.fn();
  const present = { uri: 'file:///deja.pdf', name: 'deja.pdf', lastModified: 0 };
  const fichier = new File(['contenu'], 'a.png', { type: 'image/png' });
  const { container } = renderWeb(
    <DragAndDropFile label="Piece jointe" value={[present]} onChange={onChange} multiple />,
  );

  deposer(container, { items: [{ kind: 'file', getAsFile: () => fichier }] });

  expect(onChange).toHaveBeenCalledWith([present, expect.objectContaining({ name: 'a.png' })]);
});

test('seules les URL blob sorties de la valeur sont revoquees', () => {
  const blob = (nom: string) => ({ uri: `blob:${nom}`, name: nom, lastModified: 0 });
  const revoque = jest.mocked(URL.revokeObjectURL);
  const { rerender, unmount } = renderWeb(
    <DragAndDropFile label="Piece jointe" multiple value={[blob('a')]} onChange={jest.fn()} />,
  );
  revoque.mockClear();

  rerender(<DragAndDropFile label="Piece jointe" multiple value={[blob('a'), blob('b')]} onChange={jest.fn()} />);
  expect(revoque).not.toHaveBeenCalled();

  rerender(<DragAndDropFile label="Piece jointe" multiple value={[blob('b')]} onChange={jest.fn()} />);
  expect(revoque).toHaveBeenCalledWith('blob:a');
  expect(revoque).not.toHaveBeenCalledWith('blob:b');

  unmount();
  expect(revoque).toHaveBeenCalledWith('blob:b');
});

test('retirer un fichier de la zone n ouvre pas le selecteur', async () => {
  const DocumentPicker = jest.requireMock<typeof import('expo-document-picker')>('expo-document-picker');
  const onChange = jest.fn();
  const present = { uri: 'file:///deja.pdf', name: 'deja.pdf', lastModified: 0 };
  renderWeb(<DragAndDropFile label="Piece jointe" multiple value={[present]} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer deja.pdf'));

  expect(onChange).toHaveBeenCalledWith(null);
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(DocumentPicker.getDocumentAsync).not.toHaveBeenCalled();
});
