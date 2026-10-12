type ItemDepose = { kind: string; getAsFile(): File | null };

/**
 * Sous-ensemble de `DataTransfer` utilise par ce module. Un vrai `DataTransfer` du
 * navigateur le satisfait deja structurellement : le typer ainsi, plutot que sur
 * `DataTransfer` en entier, permet de le simuler dans les tests avec de simples objets
 * litteraux, sans double assertion de type.
 */
type DepotDeFichiers = { items?: ArrayLike<ItemDepose>; files?: ArrayLike<File> } | null | undefined;

const fichiersDepuisItems = (items: ArrayLike<ItemDepose>): File[] =>
  Array.from(items)
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter((fichier): fichier is File => fichier !== null);

/**
 * Fichiers deposes (drag-and-drop) portes par un DataTransfer, lus via l'API moderne
 * `items` (qui permet d'ignorer les items non-fichiers), avec repli sur l'API historique
 * `files` quand `items` est absent ou vide.
 */
export const fichiersDuDataTransfer = (dt: DepotDeFichiers): File[] => {
  if (dt?.items?.length) return fichiersDepuisItems(dt.items);
  if (dt?.files?.length) return Array.from(dt.files);
  return [];
};
