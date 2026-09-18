// Build ordonné des paquets publiables, avec resynchronisation du dist dans node_modules.
//
// Sous pnpm 10, chaque paquet du workspace était symlinké dans le node_modules de ses
// dépendants (`components/node_modules/@alveole/theme -> ../../../theme`), donc le dist
// fraîchement compilé était vu immédiatement. pnpm 11 ne fait plus ce symlink : il copie le
// paquet à la racine de node_modules et fige cette copie à l'install. Résultat, quand tsc
// compile @alveole/components il lit un dist de @alveole/theme périmé (ou absent en CI, où
// aucun dist n'existe au checkout) et échoue sur des exports « manquants ».
//
// On reproduit donc à la main ce que pnpm 10 donnait : builder par niveau de dépendance et,
// après chaque niveau, recopier le dist frais dans node_modules avant de builder le niveau
// suivant. La résolution des tests et du typecheck passe déjà par les sources (moduleNameMapper
// et paths tsconfig), c'est uniquement l'émission des paquets publiés qui a besoin de ce relais.

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Niveaux dans l'ordre topologique : chaque niveau ne dépend que des précédents.
const levels = [['core', 'theme'], ['components'], ['storybook']];

const run = args => execFileSync('pnpm', args, { cwd: root, stdio: 'inherit' });

const syncDist = name => {
  const from = resolve(root, 'packages', name, 'dist');
  const to = resolve(root, 'node_modules', '@alveole', name, 'dist');
  if (!existsSync(from)) return;
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
};

for (const level of levels) {
  const filters = level.flatMap(name => ['--filter', `@alveole/${name}`]);
  run([...filters, 'run', 'build']);
  for (const name of level) syncDist(name);
}
