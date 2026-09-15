import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, utimes, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./generate-stories-sources.mjs', import.meta.url));

test('génère les exemples des sources sans parcourir les caches ni réécrire les fichiers identiques', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'alveole-story-sources-'));
  try {
    await mkdir(path.join(root, 'src'));
    await mkdir(path.join(root, '.jest-cache'));
    const input = path.join(root, 'src', 'Button.stories.tsx');
    const output = path.join(root, 'src', 'Button.stories.sources.ts');
    await writeFile(input, 'export const Default = () => <button>Avant</button>;\n');
    await writeFile(path.join(root, '.jest-cache', 'Cached.stories.tsx'), 'export const Cached = () => null;\n');
    const run = () => execFileSync(process.execPath, [script], { cwd: root, encoding: 'utf8' });

    run();
    assert.match(await readFile(output, 'utf8'), /Avant/);
    assert.match(await readFile(input, 'utf8'), /export \* as Sources/);
    await assert.rejects(stat(path.join(root, '.jest-cache', 'Cached.stories.sources.ts')), { code: 'ENOENT' });

    const oldTime = new Date('2000-01-01T00:00:00Z');
    await utimes(input, oldTime, oldTime);
    await utimes(output, oldTime, oldTime);
    run();
    assert.equal((await stat(input)).mtimeMs, oldTime.getTime());
    assert.equal((await stat(output)).mtimeMs, oldTime.getTime());

    await writeFile(input, (await readFile(input, 'utf8')).replace('Avant', 'Après'));
    run();
    assert.match(await readFile(output, 'utf8'), /Après/);
    assert.doesNotMatch(await readFile(output, 'utf8'), /Avant/);

    await rm(output);
    run();
    assert.match(await readFile(output, 'utf8'), /Après/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
