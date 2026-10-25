import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const DOSSIERS_IGNORES = new Set(['node_modules', 'dist', 'build', '.expo', 'coverage']);

// Parcourt `dossier` recursivement, sans les dossiers generes, et garde les fichiers dont le nom
// passe `garder`.
export const fichiersSource = (dossier, garder) =>
  readdirSync(dossier, { withFileTypes: true }).flatMap(entree => {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) return DOSSIERS_IGNORES.has(entree.name) ? [] : fichiersSource(chemin, garder);
    return garder(entree.name) ? [chemin] : [];
  });
