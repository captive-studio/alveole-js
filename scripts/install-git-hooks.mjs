import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Fait pointer git sur `.githooks/`, versionné avec le dépôt : le hook pre-commit y vérifie le
 * formatage en quelques secondes, au lieu d'attendre le `check` complet ou la CI.
 */
export const installeLesHooks = git => {
  if (!estUnDepot(git)) return;

  git(['config', 'core.hooksPath', '.githooks']);
};

/** Le conteneur de la CI installe sans dépôt git : pas de commit, donc pas de hook à poser. */
const estUnDepot = git => {
  try {
    git(['rev-parse', '--is-inside-work-tree']);
    return true;
  } catch {
    return false;
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  installeLesHooks(args => execFileSync('git', args, { stdio: 'ignore' }));
}
