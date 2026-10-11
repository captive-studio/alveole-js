import { ajoute, fichiersVisibles, FileInputFile, retire, sourcesProposees } from './FileInput';

const ajouteA: FileInputFile = { uri: 'file:///a', name: 'a.pdf', lastModified: 0 };
const ajouteB: FileInputFile = { uri: 'file:///b', name: 'b.pdf', lastModified: 0 };
const enregistre: FileInputFile = { uri: 'https://x/c.pdf', name: 'c.pdf', lastModified: 0, id: '7', persisted: true };

describe('ajoute', () => {
  it('accumule la sélection multiple', () => {
    expect(ajoute([ajouteA], [ajouteB], true)).toEqual([ajouteA, ajouteB]);
  });

  it('ne retient que le premier fichier hors sélection multiple', () => {
    expect(ajoute(null, [ajouteA, ajouteB], false)).toBe(ajouteA);
  });
});

describe('retire', () => {
  it('enlève un fichier ajouté de la valeur', () => {
    expect(retire([ajouteA, ajouteB], ajouteA)).toEqual([ajouteB]);
  });

  it('marque un fichier enregistré comme retiré sans l’enlever', () => {
    expect(retire([enregistre], enregistre)).toEqual([{ ...enregistre, removed: true }]);
  });

  it('reconnaît un fichier enregistré à son id plutôt qu’à son uri', () => {
    expect(retire(enregistre, { ...enregistre, uri: 'autre' })).toEqual({ ...enregistre, removed: true });
  });

  it('vide la valeur quand le dernier fichier ajouté est retiré', () => {
    expect(retire([ajouteA], ajouteA)).toBeNull();
    expect(retire(ajouteA, ajouteA)).toBeNull();
  });
});

test('fichiersVisibles cache les fichiers retirés', () => {
  expect(fichiersVisibles([ajouteA, { ...enregistre, removed: true }])).toEqual([ajouteA]);
});

describe('sourcesProposees', () => {
  it('propose les images avant le document sur petit écran', () => {
    expect(sourcesProposees(undefined, false)).toEqual(['gallery', 'camera', 'document']);
  });

  it('met le document en tête sur grand écran', () => {
    expect(sourcesProposees(undefined, true)).toEqual(['document', 'gallery', 'camera']);
  });

  it('retire le document quand seules les images sont acceptées', () => {
    expect(sourcesProposees('image/*', true)).toEqual(['gallery', 'camera']);
  });

  it('retire galerie et appareil photo quand les images sont exclues', () => {
    expect(sourcesProposees('application/pdf', false)).toEqual(['document']);
  });
});
