import type * as DocumentPicker from 'expo-document-picker';
import { choisis, nomAffiche } from './FileInput';

const fichier = (name: string): DocumentPicker.DocumentPickerAsset => ({
  name,
  uri: `file:///${name}`,
  size: 1,
  mimeType: 'text/plain',
  lastModified: 0,
});

const PLACEHOLDER = 'Aucun fichier choisi.';

describe('nomAffiche', () => {
  it('annonce le champ vide par son texte d’attente', () => {
    expect(nomAffiche(null, PLACEHOLDER)).toBe(PLACEHOLDER);
  });

  it('nomme le fichier unique', () => {
    expect(nomAffiche(fichier('contrat.pdf'), PLACEHOLDER)).toBe('contrat.pdf');
  });

  // Certains selecteurs rendent un fichier sans nom : le champ doit quand meme dire qu'il y a
  // quelque chose, sinon il se lit comme un champ vide.
  it('signale un fichier anonyme plutôt que de paraître vide', () => {
    expect(nomAffiche(fichier(''), PLACEHOLDER)).toBe('1 fichier');
  });

  it('nomme le fichier unique d’une sélection multiple', () => {
    expect(nomAffiche([fichier('contrat.pdf')], PLACEHOLDER)).toBe('contrat.pdf');
  });

  it('résume une sélection multiple par son compte', () => {
    expect(nomAffiche([fichier('a.pdf'), fichier('b.pdf')], PLACEHOLDER)).toBe('2 fichiers');
  });

  it('traite une sélection multiple vide comme une absence de choix', () => {
    expect(nomAffiche([], PLACEHOLDER)).toBe(PLACEHOLDER);
  });

  // L'appelant force le texte d'attente quand il affiche lui-meme la valeur ailleurs, par
  // exemple sous l'apercu d'une image.
  it('laisse l’appelant imposer le texte d’attente', () => {
    expect(nomAffiche(fichier('contrat.pdf'), PLACEHOLDER, true)).toBe(PLACEHOLDER);
  });
});

describe('choisis', () => {
  it('ne retient que le premier fichier hors sélection multiple', () => {
    expect(choisis([fichier('a.pdf'), fichier('b.pdf')], false)).toEqual(fichier('a.pdf'));
  });

  it('retient toute la sélection multiple', () => {
    expect(choisis([fichier('a.pdf'), fichier('b.pdf')], true)).toHaveLength(2);
  });

  // Un selecteur annule rend soit `null`, soit une liste vide : les deux valent un abandon.
  it('traite un choix annulé comme une absence de valeur', () => {
    expect(choisis(null, false)).toBeNull();
    expect(choisis(null, true)).toBeNull();
    expect(choisis([], false)).toBeNull();
    expect(choisis([], true)).toBeNull();
  });
});
