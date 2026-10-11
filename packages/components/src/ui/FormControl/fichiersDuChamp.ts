import * as DocumentPicker from 'expo-document-picker';

/**
 * Un fichier du champ. `persisted` signale un fichier enregistré (deja cote serveur, reconnu a
 * son `id`) ; `removed` marque un fichier enregistre que l'utilisateur a retire.
 */
export type FileInputFile = DocumentPicker.DocumentPickerAsset & {
  id?: string;
  persisted?: boolean;
  removed?: boolean;
};

export type FileInputValue = FileInputFile | FileInputFile[] | null;

export type FileInputLabels = {
  addFile: string;
  selectFile: string;
  gallery: string;
  camera: string;
  document: string;
  cancel: string;
  chooseImageTitle: string;
  chooseDocumentTitle: string;
  chooseImageMessage: string;
  permissionRequired: string;
  cameraPermissionMessage: string;
  galleryPermissionMessage: string;
  unnamed: string;
  remove: string;
};

export const libellesParDefaut: FileInputLabels = {
  addFile: 'Ajouter un fichier',
  selectFile: 'Sélectionner un fichier',
  gallery: 'Galerie',
  camera: 'Appareil photo',
  document: 'Document',
  cancel: 'Annuler',
  chooseImageTitle: 'Choisir une image',
  chooseDocumentTitle: 'Choisir un fichier',
  chooseImageMessage: 'Prendre une photo ou en choisir une dans la galerie.',
  permissionRequired: 'Autorisation requise',
  cameraPermissionMessage: "Autorisez l'accès à l'appareil photo dans les réglages pour prendre une photo.",
  galleryPermissionMessage: "Autorisez l'accès à la galerie dans les réglages pour choisir une image.",
  unnamed: 'Fichier sans nom',
  remove: 'Retirer',
};

type TypesAcceptes = DocumentPicker.DocumentPickerOptions['type'];

export type Source = 'document' | 'gallery' | 'camera';

const listeDe = (value: FileInputValue): FileInputFile[] =>
  value == null ? [] : Array.isArray(value) ? value : [value];

export const fichiersVisibles = (value: FileInputValue) => listeDe(value).filter(fichier => !fichier.removed);

// Le champ multiple accumule ; le champ simple ne recoit un fichier que s'il n'en montre aucun.
export const ajoute = (value: FileInputValue, nouveaux: FileInputFile[], multiple: boolean): FileInputValue => {
  if (!multiple) return nouveaux[0] ?? value;
  return [...listeDe(value), ...nouveaux];
};

const memeFichier = (a: FileInputFile, b: FileInputFile) =>
  a.id != null && b.id != null ? a.id === b.id : a.uri === b.uri;

// Un fichier enregistre reste dans la valeur, marque `removed`, pour que l'appelant sache quoi
// supprimer cote serveur ; un fichier ajoute disparait simplement.
export const retire = (value: FileInputValue, cible: FileInputFile): FileInputValue => {
  const retirer = (fichier: FileInputFile): FileInputFile[] => {
    if (!memeFichier(fichier, cible)) return [fichier];
    return fichier.persisted ? [{ ...fichier, removed: true }] : [];
  };

  if (!Array.isArray(value)) return value == null ? null : (retirer(value)[0] ?? null);

  const suivants = value.flatMap(retirer);
  return suivants.length === 0 ? null : suivants;
};

const typesDe = (type: TypesAcceptes) => (type == null ? [] : Array.isArray(type) ? type : [type]);

const estUnTypeImage = (t: string) => t === 'image' || t.startsWith('image/');

export const imagesSeulement = (type: TypesAcceptes) => {
  const types = typesDe(type);
  return types.length > 0 && types.every(estUnTypeImage);
};

const accepteLesImages = (type: TypesAcceptes) => {
  const types = typesDe(type);
  return types.length === 0 || types.some(t => t === '*/*' || estUnTypeImage(t));
};

/** Les sources que la feuille d'actions propose sur natif, dans l'ordre. Sur grand ecran, le document passe en tete. */
export const sourcesProposees = (type: TypesAcceptes, grandEcran: boolean): Source[] => {
  const images: Source[] = accepteLesImages(type) ? ['gallery', 'camera'] : [];
  if (imagesSeulement(type)) return images;
  return grandEcran ? ['document', ...images] : [...images, 'document'];
};

/** Sur grand ecran, l'option qui ouvre l'explorateur de fichiers s'annonce comme telle. */
export const libelleDeLaSource = (
  source: Source,
  labels: FileInputLabels,
  { type, grandEcran }: { type: TypesAcceptes; grandEcran: boolean },
) => {
  if (source === 'document') return grandEcran ? labels.selectFile : labels.document;
  if (source === 'gallery') return grandEcran && imagesSeulement(type) ? labels.selectFile : labels.gallery;
  return labels.camera;
};
