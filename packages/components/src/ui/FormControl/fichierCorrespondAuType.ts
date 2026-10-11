const estUneImage = (mimeType: string): boolean => mimeType.startsWith('image/');

const estUnPdf = (mimeType: string): boolean => mimeType === 'application/pdf' || mimeType.endsWith('/pdf');

// Un type MIME exact (`image/png`) ou generique (`image/*`, `*/*`), comme ceux du selecteur.
const correspondAuMime = (mimeType: string, type: string): boolean =>
  type === mimeType || type === '*/*' || (type.endsWith('/*') && mimeType.startsWith(type.slice(0, -1)));

const estUnCsv = (mimeType: string, fileName: string | undefined): boolean =>
  mimeType === 'text/csv' || mimeType === 'application/csv' || (fileName?.endsWith('.csv') ?? false);

/**
 * Vrai si le fichier (reconnu a son type MIME, avec repli sur l'extension du nom pour le CSV)
 * fait partie des types autorises. Sans type exige, tout fichier passe. Un seul type peut etre
 * fourni sous forme de chaine plutot que de tableau. Semantique stricte : `image/…`, pdf propre.
 * Les types MIME du selecteur (`image/*`, `application/pdf`) sont aussi reconnus.
 */
export const fichierCorrespondAuType = (
  mimeType: string,
  fileName: string | undefined,
  types: string | readonly string[] | undefined,
): boolean => {
  const liste = typeof types === 'string' ? [types] : types;
  if (!liste || liste.length === 0) return true;
  return (
    (liste.includes('image') && estUneImage(mimeType)) ||
    (liste.includes('pdf') && estUnPdf(mimeType)) ||
    (liste.includes('csv') && estUnCsv(mimeType, fileName)) ||
    liste.some(type => correspondAuMime(mimeType, type))
  );
};
