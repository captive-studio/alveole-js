import { fichierCorrespondAuType } from './fichierCorrespondAuType';

describe('fichierCorrespondAuType', () => {
  it('accepte une image quand le type image est autorise', () => {
    expect(fichierCorrespondAuType('image/png', undefined, ['image'])).toBe(true);
  });

  it('accepte un pdf via son type MIME application/pdf', () => {
    expect(fichierCorrespondAuType('application/pdf', undefined, ['pdf'])).toBe(true);
  });

  it('accepte un pdf via un type MIME suffixe en /pdf', () => {
    expect(fichierCorrespondAuType('application/x-bzpdf', undefined, ['pdf'])).toBe(false);
    expect(fichierCorrespondAuType('image/pdf', undefined, ['pdf'])).toBe(true);
  });

  it('accepte un csv via son type MIME text/csv', () => {
    expect(fichierCorrespondAuType('text/csv', undefined, ['csv'])).toBe(true);
  });

  it('accepte un csv via son type MIME application/csv', () => {
    expect(fichierCorrespondAuType('application/csv', undefined, ['csv'])).toBe(true);
  });

  it('accepte un csv reconnu par son extension .csv malgre un MIME generique', () => {
    expect(fichierCorrespondAuType('application/octet-stream', 'donnees.csv', ['csv'])).toBe(true);
  });

  it('accepte n_importe quel fichier quand aucun type n_est exige', () => {
    expect(fichierCorrespondAuType('application/zip', 'archive.zip', [])).toBe(true);
    expect(fichierCorrespondAuType('application/zip', 'archive.zip', undefined)).toBe(true);
  });

  it('rejette un fichier dont le MIME ne correspond a aucun type autorise', () => {
    expect(fichierCorrespondAuType('text/plain', 'notes.txt', ['image', 'pdf', 'csv'])).toBe(false);
  });

  it('rejette un csv a MIME generique quand le nom de fichier est absent', () => {
    expect(fichierCorrespondAuType('application/octet-stream', undefined, ['csv'])).toBe(false);
  });

  it('accepte un type passe comme chaine unique et non comme tableau', () => {
    expect(fichierCorrespondAuType('image/png', undefined, 'image')).toBe(true);
    expect(fichierCorrespondAuType('application/pdf', undefined, 'image')).toBe(false);
  });
});
