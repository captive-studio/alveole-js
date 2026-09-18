// Relie les paquets @alveole du workspace à leur source, comme le faisait pnpm 10.
//
// pnpm 10 (nodeLinker hoisted) symlinkait chaque paquet local dans node_modules vers son
// dossier source (`node_modules/@alveole/theme -> ../../packages/theme`). Tout consommateur
// voyait donc le dist fraîchement compilé et, côté Metro, le fichier était traité comme du
// code du projet : l'alias `@` de apps/docs s'y appliquait.
//
// pnpm 11 ne fait plus ce symlink : il copie le paquet et fige la copie à l'install. tsc
// compile alors @alveole/components contre un dist de theme périmé, et Metro n'applique plus
// l'alias `@` au fichier (il le voit comme un vrai node_module), d'où l'échec de résolution de
// `@/assets/images/icon.png` au bundling des docs.
//
// On rétablit donc explicitement le symlink après chaque install. Les tests et le typecheck
// résolvent déjà @alveole/* sur les sources (moduleNameMapper / paths tsconfig) ; ce relais sert
// à build:packages et au bundle Metro des docs.

import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packages = ['core', 'theme', 'components', 'storybook'];

for (const name of packages) {
  const source = join(root, 'packages', name);
  if (!existsSync(source)) continue;

  const linkPath = join(root, 'node_modules', '@alveole', name);
  mkdirSync(dirname(linkPath), { recursive: true });

  // Déjà le bon symlink : rien à faire.
  if (existsSync(linkPath) && lstatSync(linkPath).isSymbolicLink()) continue;

  rmSync(linkPath, { recursive: true, force: true });
  symlinkSync(relative(dirname(linkPath), source), linkPath, 'dir');
}
