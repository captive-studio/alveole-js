const estUneImage = (mimeType: string): boolean => mimeType.startsWith('image/');

const estUnPdf = (mimeType: string): boolean => mimeType === 'application/pdf' || mimeType.endsWith('/pdf');

const estUnCsv = (mimeType: string, fileName: string | undefined): boolean =>
  mimeType === 'text/csv' || mimeType === 'application/csv' || (fileName?.endsWith('.csv') ?? false);

/**
 * Vrai si le fichier (reconnu a son type MIME, avec repli sur l'extension du nom pour le CSV)
 * fait partie des types autorises. Sans type exige, tout fichier passe. Un seul type peut etre
 * fourni sous forme de chaine plutot que de tableau. Semantique stricte : `image/…`, pdf propre.
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
    (liste.includes('csv') && estUnCsv(mimeType, fileName))
  );
};
