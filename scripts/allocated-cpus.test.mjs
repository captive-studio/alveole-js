import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { allocatedCpus } from './allocated-cpus.mjs';

test('déduit les cœurs alloués du quota cgroup', () => {
  assert.equal(
    allocatedCpus(() => '400000 100000', 16),
    4,
  );
});

test('retombe sur les cœurs de l’hôte quand le conteneur n’a aucun quota', () => {
  assert.equal(
    allocatedCpus(() => 'max 100000', 16),
    16,
  );
});

test('retombe sur les cœurs de l’hôte hors cgroup v2', () => {
  assert.equal(
    allocatedCpus(() => {
      throw new Error('ENOENT');
    }, 10),
    10,
  );
});

test('arrondit un quota fractionnaire vers le bas', () => {
  assert.equal(
    allocatedCpus(() => '150000 100000', 16),
    1,
  );
});

test('garde un cœur quand le quota est inférieur à un cœur', () => {
  assert.equal(
    allocatedCpus(() => '50000 100000', 16),
    1,
  );
});

test('imprime le compte alloué, pour les outils qui ne se dimensionnent qu’en ligne de commande', () => {
  const { stdout } = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('print-allocated-cpus.mjs', import.meta.url))],
    {
      encoding: 'utf8',
    },
  );

  assert.match(stdout.trim(), /^[1-9][0-9]*$/);
});
