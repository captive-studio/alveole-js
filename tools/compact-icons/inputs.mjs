import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export async function inputsHash() {
  const hash = createHash('sha256');
  for (const file of ['package.json', 'package-lock.json', 'generate.mjs']) {
    hash.update(await readFile(new URL(file, import.meta.url)));
    hash.update('\0');
  }
  return hash.digest('hex');
}
