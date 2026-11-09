import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Fait pointer git sur `.githooks/`, versionné avec le dépôt : le hook pre-commit y vérifie le
 * formatage en quelques secondes, au lieu d'attendre le `check` complet ou la CI.
 */
export const installeLesHooks = git => git(['config', 'core.hooksPath', '.githooks']);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  installeLesHooks(args => execFileSync('git', args, { stdio: 'inherit' }));
}
