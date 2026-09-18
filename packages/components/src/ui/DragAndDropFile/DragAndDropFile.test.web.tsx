import { fireEvent, renderWeb } from '@/__tests__/helpers/renderWeb';
import { DragAndDropFile } from './DragAndDropFile.web';

// jsdom n'implémente pas `URL.createObjectURL`/`revokeObjectURL`, utilisés par le composant
// pour construire l'aperçu du fichier déposé.
beforeAll(() => {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
});

const deposer = (container: HTMLElement, dataTransfer: unknown) => {
  const zone = container.querySelector('[tabindex="0"]') as Element;
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
