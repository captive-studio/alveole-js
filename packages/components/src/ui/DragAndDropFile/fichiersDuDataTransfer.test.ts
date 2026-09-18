import { fichiersDuDataTransfer } from './fichiersDuDataTransfer';

describe('fichiersDuDataTransfer', () => {
  it('retourne un tableau vide quand le DataTransfer est absent', () => {
    expect(fichiersDuDataTransfer(undefined)).toEqual([]);
  });

  it('retourne le fichier d_un item dont le kind est "file"', () => {
    const fichier = new File(['contenu'], 'a.png');
    const items = [{ kind: 'file', getAsFile: () => fichier }];

    expect(fichiersDuDataTransfer({ items })).toEqual([fichier]);
  });

  it('ignore un item dont le kind n_est pas "file"', () => {
    const getAsFile = jest.fn();
    const items = [{ kind: 'string', getAsFile }];

    expect(fichiersDuDataTransfer({ items })).toEqual([]);
    expect(getAsFile).not.toHaveBeenCalled();
  });

  it('ignore un item de kind "file" dont getAsFile ne retourne rien', () => {
    const items = [{ kind: 'file', getAsFile: () => null }];

    expect(fichiersDuDataTransfer({ items })).toEqual([]);
  });

  it('se replie sur dt.files quand dt.items est absent', () => {
    const fichier = new File(['contenu'], 'a.png');

    expect(fichiersDuDataTransfer({ files: [fichier] })).toEqual([fichier]);
  });

  it('retourne un tableau vide quand items et files sont tous deux vides', () => {
    expect(fichiersDuDataTransfer({ items: [], files: [] })).toEqual([]);
  });
});
