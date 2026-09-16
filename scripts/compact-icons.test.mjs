import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { inputsHash } from '../tools/compact-icons/inputs.mjs';

test('la distribution des icônes correspond aux versions et au générateur épinglés', async () => {
  const hash = await inputsHash();
  for (const name of ['lucide', 'lab']) {
    const artifact = await readFile(
      new URL(`../packages/components/src/ui/LucideIcon/vendor/${name}.js`, import.meta.url),
      'utf8',
    );
    assert.ok(
      artifact.includes(`// Inputs SHA256: ${hash}\n`),
      'Régénérer les icônes : npm ci --prefix tools/compact-icons && npm run generate --prefix tools/compact-icons',
    );
  }
});
