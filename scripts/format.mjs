import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { globSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);

// Prettier invalide son cache selon le contenu, ses options et sa version, mais
// pas selon les versions des plugins ni les tsconfig lus par organize-imports.
const inputs = [
  'package-lock.json',
  ...globSync(['tsconfig*.json', '{packages,apps}/*/tsconfig*.json'], { cwd: root }),
];
const hash = createHash('sha256');
for (const file of inputs.sort()) {
  hash
    .update(file)
    .update('\0')
    .update(readFileSync(resolve(root, file)))
    .update('\0');
}

const result = spawnSync(
  process.execPath,
  [
    require.resolve('prettier/bin/prettier.cjs'),
    '.',
    '--cache',
    '--cache-strategy',
    'content',
    '--cache-location',
    resolve(root, 'node_modules/.cache/prettier', hash.digest('hex')),
    ...process.argv.slice(2),
  ],
  { cwd: root, stdio: 'inherit' },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
